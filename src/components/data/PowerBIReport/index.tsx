import { useEffect, useCallback, useState, useRef, useLayoutEffect, FC } from 'react';
import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { Spinner, ErrorMessage, AppSettingsManager } from '@equinor/fusion-components';
import {
    useTelemetryLogger,
    FusionApiHttpErrorResponse,
    useCurrentContext,
    useApiClients,
    FusionApiErrorMessage,
} from '@equinor/fusion';
import { ICustomEvent } from 'service';
import {
    Report,
    AccessToken,
    ResourceType,
    EmbedInfo,
    EmbedConfig,
} from '@equinor/fusion/lib/http/apiClients/models/report/';
import {
    ReportLevelFilters,
    IBasicFilter,
    IBasicFilterWithKeys,
    IAdvancedFilter,
    IRelativeDateFuilter,
    ITupleFilter,
} from './models/ReportLevelFilters';

import * as styles from './styles.less';
import { ButtonClickEvent } from './models/EventHandlerTypes';

import ReportErrorMessage from './components/ReportErrorMessage';
import { ErrorTypes } from '../../general/ErrorMessage';

type PowerBIProps = {
    reportId: string;
    filters?: pbi.models.ReportLevelFilters[] | null;
    hasContext?: boolean;
};

const getReportOrDashboardId = (embedConfig: EmbedConfig, type: ResourceType) => {
    switch (type) {
        case 'Report':
            return embedConfig.reportId;
        case 'Dashboard':
            return embedConfig.dashboardId;
    }
};

const getTokenType = (embedConfig: EmbedConfig) => {
    switch (embedConfig.tokenType) {
        case 'AAD':
            return pbi.models.TokenType.Aad;
        case 'Embed':
            return pbi.models.TokenType.Embed;
    }
};

const powerbi = new pbi.service.Service(
    pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory
);

const utcNow = () => {
    const date = new Date();

    const utc = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
    );

    return new Date(utc);
};

let timeout: NodeJS.Timeout;

type PowerBIReportErrorDetail = {
    type: 'pbi' | 'fusion';
    message: string;
    code: number;
    title?: string;
    url?: string;
    inner?: FusionApiErrorMessage | ICustomEvent<IError>;
};

/**
 * TODO: use native react component from Microsoft
 */
const PowerBIReport: FC<PowerBIProps> = ({ reportId, filters, hasContext }) => {
    const reportApiClient = useApiClients().report;
    const currentContext = useCurrentContext();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<PowerBIReportErrorDetail | null>(null);

    const [report, setReport] = useState<Report>();
    const [embedInfo, setEmbedInfo] = useState<EmbedInfo>();
    const [accessToken, setAccessToken] = useState<AccessToken>();
    const [timeLoadStart] = useState<Date>(new Date());
    const telemetryLogger = useTelemetryLogger();
    const [reApplyFilter, setReapplyFilter] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>('Loading Report');
    const embedRef = useRef<HTMLDivElement>(null);
    const embeddedRef = useRef<pbi.Embed | null>(null);
    const [awaitableBookmark, setAwaitableBookmark] = useState<string | null>(null);

    const getReportInfo = async () => {
        try {
            try {
                setLoadingText('Loading Report');
                const fetchedReport = await reportApiClient.getReportAsync(reportId);
                setReport(fetchedReport.data);
            } catch (error) {
                const title = 'Sorry we could not show the report';
                if (error.StatusCode == 403) {
                    throw { error, title, message: 'You do not have access to VIEW the report' };
                } else if (error.statusCode === 404) {
                    throw { error, title, message: 'Could not find requested report' };
                }
                throw { error, title, message: 'Could not load general report info' };
            }

            try {
                setLoadingText('Loading Report, fetching report info');
                const fetchedEmbedInfo = await reportApiClient.getEmbedInfo(reportId);
                setEmbedInfo(fetchedEmbedInfo.data);
            } catch (error) {
                const title = 'Sorry we could not show the report';
                if (error.statusCode === 404) {
                    throw { error, title, message: 'Could not load general report info' };
                }
                throw { error, title, message: 'Could not load general report info' };
            }

            try {
                setLoadingText('Loading Report, fetching access token');
                const fetchedAccessToken = await reportApiClient.getAccessToken(reportId);
                setAccessToken(fetchedAccessToken.data);
            } catch (error) {
                const title = 'Sorry we could not show the report';
                throw { error, title, message: 'Could not acquire access token' };
            }
        } catch (error) {
            const {
                title,
                message,
                error: { statusCode, response, url },
            } = error;
            setError({
                type: 'fusion',
                code: statusCode,
                title,
                url,
                message,
                inner: (response as FusionApiHttpErrorResponse)?.error,
            });
            setIsLoading(false);
        } finally {
            setIsFetching(false);
        }
    };

    const checkContextAccess = useCallback(async () => {
        if (!currentContext?.externalId || !embedInfo?.embedConfig.rlsConfiguration) return;
        try {
            await reportApiClient.checkContextAccess(
                reportId,
                currentContext.externalId,
                currentContext.type.id
            );
        } catch (error) {
            const { statusCode, response } = error;
            setError({
                type: 'fusion',
                code: statusCode,
                message: 'Context access check failed',
                inner: (response as FusionApiHttpErrorResponse)?.error,
            });
        }
    }, [currentContext?.id, embedInfo?.embedConfig.rlsConfiguration]);

    useEffect(() => {
        checkContextAccess();
    }, [currentContext?.id, embedInfo?.embedConfig.rlsConfiguration]);

    useEffect(() => {
        if (!embeddedRef.current) return;

        setIsLoading(true);

        embeddedRef.current.reload();
    }, [currentContext?.id]);

    const applyBookmark = async (bookmark: string, awaitForContextSwitch: boolean) => {
        const currentReport =
            embedRef && embedRef.current ? (powerbi.get(embedRef.current) as pbi.Report) : null;
        if (awaitForContextSwitch) {
            setAwaitableBookmark(bookmark);
            return;
        }
        if (!currentReport) {
            return;
        }
        return currentReport.bookmarksManager.applyState(bookmark);
    };

    const captureBookmark = async () => {
        const currentReport =
            embedRef && embedRef.current ? (powerbi.get(embedRef.current) as pbi.Report) : null;
        if (!currentReport) {
            return;
        }
        const bookmark = await currentReport.bookmarksManager.capture();
        return bookmark.state;
    };

    const setFilter = async () => {
        if (!embedRef.current) return;

        const report = powerbi.get(embedRef.current) as pbi.Report;
        if (!report) return;

        filters ? await report.setFilters(filters) : await report.removeFilters();
        if (awaitableBookmark) {
            applyBookmark(awaitableBookmark, false);
            setAwaitableBookmark(null);
        }
    };

    useEffect(() => {
        if (!isLoading) setFilter();
    }, [isLoading]);

    useEffect(() => {
        getReportInfo();
    }, []);

    const getConfig = useCallback(
        (type: ResourceType) => {
            if (!embedInfo) return;
            const embedConfig = embedInfo.embedConfig;
            const token = accessToken ? accessToken.token : undefined;
            const config: pbi.IEmbedConfiguration = {
                type: type.toLowerCase(),
                id: getReportOrDashboardId(embedConfig, type),
                embedUrl: embedConfig.embedUrl,
                tokenType: getTokenType(embedConfig),
                accessToken: token,
            };

            if (type === 'Report') {
                const settings = {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false,
                    localeSettings: {
                        formatLocale: 'en',
                        language: 'en',
                    },
                };

                config.settings = settings;
                config.permissions = pbi.models.Permissions.All;
            } else {
                config.pageView = 'fitToWidth';
            }

            return config;
        },
        [embedInfo, accessToken]
    );

    const embed = useCallback(
        (node: HTMLDivElement) => {
            if (embedInfo) {
                const config = getConfig(embedInfo.embedConfig.embedType);
                embeddedRef.current = powerbi.embed(node, config);
                embeddedRef.current.off('loaded');
                embeddedRef.current.off('error');
                embeddedRef.current.off('rendered');
                embeddedRef.current.off('buttonClicked');
                embeddedRef.current.on('loaded', () => {
                    telemetryLogger.trackMetric({
                        name: `pbi.report.load`,
                        properties: {
                            reportName: embedInfo.embedConfig.name,
                            reportId: config.id,
                            reportWorkspace: embedInfo.embedConfig.groupId,
                        },
                        // name: `${useCurrentApp.name}-EmbedLoadedTime`,
                        average: (new Date().getTime() - timeLoadStart.getTime()) / 1000,
                        sampleCount: 1,
                    });

                    setIsLoading(false);
                });
                embeddedRef.current.on('rendered', () => {
                    telemetryLogger.trackMetric({
                        name: `pbi.report.render`,
                        properties: {
                            reportName: embedInfo.embedConfig.name,
                            reportId: config.id,
                            reportWorkspace: embedInfo.embedConfig.groupId,
                        },
                        average: (new Date().getTime() - timeLoadStart.getTime()) / 1000,
                        sampleCount: 1,
                    });
                });
                embeddedRef.current.on('error', (error: ICustomEvent<IError>) => {
                    if (error && error.detail) {
                        telemetryLogger.trackException({
                            error: new Error('Power BI: ' + error.detail.message),
                        });
                    }
                    setError({
                        type: 'pbi',
                        code: Number(error.detail.errorCode),
                        message: error.detail?.message,
                        title: 'An error has occurred inside Power BI',
                    });
                    setIsLoading(false);
                });
                embeddedRef.current.on(
                    'buttonClicked',
                    (button: ICustomEvent<ButtonClickEvent>) => {
                        if (button?.detail?.title?.toLowerCase() === 'reset filter') {
                            setReapplyFilter(true);
                        }
                    }
                );
            }
        },
        [embedInfo, accessToken, reportId]
    );

    /** TODO: add filters for dashboard if needed? */
    useLayoutEffect(() => {
        const embedType = embedInfo?.embedConfig?.embedType;
        if (!embeddedRef.current || !embedType) return;
        switch (embedType) {
            case 'Report':
                embeddedRef.current.on('pageChanged', setFilter);
                return () =>
                    embeddedRef?.current ? embeddedRef.current.off('pageChanged') : undefined;
        }
    }, [filters, embeddedRef.current, embedInfo, awaitableBookmark]);

    useEffect(() => {
        if (!embeddedRef.current) return;

        embeddedRef.current.off('rendered');
        embeddedRef.current.on('rendered', () => {
            if (reApplyFilter) setFilter();
            setReapplyFilter(false);
        });
    }, [reApplyFilter]);

    useEffect(() => {
        if (accessToken) {
            const now = utcNow();
            const expiration = accessToken.expirationUtc;

            const expires = expiration.getTime() - now.getTime();

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(async () => {
                const access = await reportApiClient.getAccessToken(reportId);
                setAccessToken(access.data);
            }, expires - 2 * 1000);
        }
    }, [accessToken, reportId]);

    useEffect(() => {
        if (!isFetching && embedRef.current !== null) {
            embed(embedRef.current);
        }
    }, [embedRef, isFetching, reportId]);

    useEffect(() => {
        if (!isFetching && embedRef.current !== null) {
            const embededReport = powerbi.get(embedRef.current);

            if (embededReport && accessToken) {
                embededReport.setAccessToken(accessToken.token);
            }
        }
    }, [embedRef, accessToken, isFetching]);

    useEffect(() => {
        if (!error) return;
        const { message, code, type, url } = error;
        const name = ['pbi.report.error', type, code].join('.');
        telemetryLogger.trackException({
            exception: { name, message },
            properties: { code, url },
        });
    }, [error]);

    // only display fusion errors
    if (error && error.type === 'fusion') {
        const { title, message, code, inner } = error;
        const renderStandardError = (type: ErrorTypes = 'error') => (
            <ErrorMessage hasError={true} title={title} message={message} errorType={type} />
        );
        switch (Number(code)) {
            case 403: {
                if (report) {
                    // TODO: is there not a better way to check this?
                    const hasContext = (inner as FusionApiErrorMessage)?.code !== 'NotAuthorized';
                    return <ReportErrorMessage report={report} contextError={hasContext} />;
                }
                return renderStandardError('accessDenied');
            }

            case 404: {
                return renderStandardError('notFound');
            }

            // power bi down
            case 424: {
                return (
                    <ErrorMessage
                        hasError={true}
                        errorType={'failedDependency'}
                        resourceName={'PowerBI'}
                        message={'We had problems communicate with Microsoft Power BI services'}
                    />
                );
            }

            // throttle
            case 429:
                return (
                    <ErrorMessage
                        hasError={true}
                        errorType={'throttle'}
                        resourceName={'PowerBI'}
                        message={
                            'We recorded too many requests from your client, please try again in one minute'
                        }
                    />
                );

            default: {
                // internal server error
                if (code >= 500) {
                    return (
                        <ErrorMessage
                            hasError={true}
                            errorType={'error'}
                            resourceName={'PowerBI'}
                            message={
                                'An error occurred while communicating with the fusion services... Please try again in a few minutes. If the problem persists, please raise an incident...'
                            }
                        />
                    );
                }
                return renderStandardError();
            }
        }
    }

    return (
        <>
            {isFetching && <Spinner title={loadingText} floating centered />}
            {!isFetching && <div className={styles.powerbiContent} ref={embedRef}></div>}
            <AppSettingsManager
                captureAppSetting={captureBookmark}
                applyAppSetting={applyBookmark}
                hasContext={hasContext}
                anchorId="pbi-bookmarks-btn"
                name="Power BI bookmarks"
            />
        </>
    );
};

export default PowerBIReport;
export {
    ReportLevelFilters,
    IBasicFilter,
    IBasicFilterWithKeys,
    IAdvancedFilter,
    IRelativeDateFuilter,
    ITupleFilter,
};
