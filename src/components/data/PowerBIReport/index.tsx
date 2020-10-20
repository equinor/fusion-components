import * as React from 'react';
import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { Spinner, ErrorMessage } from '@equinor/fusion-components';
import {
    useTelemetryLogger,
    FusionApiHttpErrorResponse,
    useCurrentApp,
    useCurrentContext,
    useApiClients,
    useAppContextSettings,
} from '@equinor/fusion';
import { ICustomEvent } from 'service';
import FusionError from './models/FusionError';
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

type PowerBIProps = {
    reportId: string;
    filters?: pbi.models.ReportLevelFilters[] | null;
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

type PBIBookmark = {
    bookMark: string | null;
};

/**
 * TODO: use native react component from Microsoft
 */
const PowerBIReport: React.FC<PowerBIProps> = ({ reportId, filters }) => {
    const reportApiClient = useApiClients().report;
    const currentContext = useCurrentContext();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [powerBIError, setPowerBIError] = React.useState<ICustomEvent<IError>>();
    const [fusionError, setFusionError] = React.useState<FusionError>();

    const [report, setReport] = React.useState<Report>();
    const [embedInfo, setEmbedInfo] = React.useState<EmbedInfo>();
    const [accessToken, setAccessToken] = React.useState<AccessToken>();
    const [timeLoadStart, SetTimeLoadStart] = React.useState<Date>(new Date());
    const telemetryLogger = useTelemetryLogger();
    const [reApplyFilter, setReapplyFilter] = React.useState<boolean>(false);
    const [loadingText, setLoadingText] = React.useState<string>('Loading Report');
    const embedRef = React.useRef<HTMLDivElement>(null);
    const embeddedRef = React.useRef<pbi.Embed | null>(null);

    const [appSettings, setAppSettings] = useAppContextSettings<PBIBookmark>(
        currentContext?.id || 'global'
    );

    const getReportInfo = async () => {
        try {
            setLoadingText('Loading Report');
            const fetchedReport = await reportApiClient.getReportAsync(reportId);
            setReport(fetchedReport.data);

            setLoadingText('Loading Report, fetching report info');
            const fetchedEmbedInfo = await reportApiClient.getEmbedInfo(reportId);
            setEmbedInfo(fetchedEmbedInfo.data);

            setLoadingText('Loading Report, fetching access token');
            const fetchedAccessToken = await reportApiClient.getAccessToken(reportId);
            setAccessToken(fetchedAccessToken.data);

            setIsFetching(false);
        } catch (error) {
            setFusionError({
                statusCode: error.statusCode,
                fusionError: error.response as FusionApiHttpErrorResponse,
            });
            setIsFetching(false);
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (!embeddedRef.current) return;
        setIsLoading(true);

        embeddedRef.current.reload();
    }, [currentContext?.id]);

    const setFilter = async () => {
        if (!embedRef.current) return;

        const report = powerbi.get(embedRef.current) as pbi.Report;
        if (!report) return;

        filters ? await report.setFilters(filters) : await report.removeFilters();
        if (!reApplyFilter) return;

        const currentReport =
            embedRef && embedRef.current ? (powerbi.get(embedRef.current) as pbi.Report) : null;
        if (!currentReport) return;

        captureBookmark(currentReport);
    };

    React.useEffect(() => {
        if (!isLoading) setFilter();
    }, [isLoading]);

    React.useEffect(() => {
        getReportInfo();
    }, []);

    const getConfig = React.useCallback(
        (type: ResourceType) => {
            if (!embedInfo) return;
            const embedConfig = embedInfo.embedConfig;
            const token = accessToken ? accessToken.token : undefined;
            let config: pbi.IEmbedConfiguration = {
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

    const captureBookmark = async (currentReport: pbi.Report | null) => {
        if (!currentReport || appSettings === null) {
            return;
        }
        currentReport.bookmarksManager.capture().then((capturedBookmark) => {
            if (appSettings.bookMark !== capturedBookmark.state) {
                setAppSettings({ bookMark: capturedBookmark.state });
            }
        });
    };

    const embed = React.useCallback(
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
                        name: `${useCurrentApp.name}-EmbedLoadedTime`,
                        average: (new Date().getTime() - timeLoadStart.getTime()) / 1000,
                        sampleCount: 1,
                    });

                    setIsLoading(false);
                });
                embeddedRef.current.on('rendered', () => {
                    telemetryLogger.trackMetric({
                        name: `${useCurrentApp.name}-EmbedRenderedTime`,
                        average: (new Date().getTime() - timeLoadStart.getTime()) / 1000,
                        sampleCount: 1,
                    });
                });
                embeddedRef.current.on('error', (err: ICustomEvent<IError>) => {
                    if (err && err.detail) {
                        telemetryLogger.trackException({
                            error: new Error('Power BI: ' + err.detail.message),
                        });
                    }
                    setPowerBIError(err);
                    setIsLoading(false);
                });
            }
        },
        [embedInfo, accessToken, reportId]
    );

    /** TODO: add filters for dashboard if needed? */
    React.useLayoutEffect(() => {
        const embedType = embedInfo.embedConfig?.embedType;
        if (!embeddedRef.current || !embedType) return;
        switch(embedType){
            case 'Report':
                embeddedRef.current.on('pageChanged', setFilter);
                return () => embeddedRef.current.off('pageChanged');
        }
    }, [filters, embeddedRef.current, embedInfo]);

    React.useEffect(() => {
        if (!embeddedRef.current) return;

        embeddedRef.current.off('rendered');
        embeddedRef.current.on('rendered', () => {
            if (reApplyFilter) setFilter();
            setReapplyFilter(false);
        });
    }, [reApplyFilter]);

    React.useEffect(() => {
        if (embeddedRef.current && !isLoading) {
            const currentReport =
                embedRef && embedRef.current ? (powerbi.get(embedRef.current) as pbi.Report) : null;
            if (currentReport && appSettings?.bookMark) {
                currentReport.bookmarksManager.applyState(appSettings?.bookMark);
            }
            embeddedRef.current.off('dataSelected');
            embeddedRef.current.off('buttonClicked');
            embeddedRef.current.on('dataSelected', () => {
                if (!currentReport) {
                    return;
                }
                captureBookmark(currentReport);
            });
            embeddedRef.current.on('buttonClicked', (button: ICustomEvent<ButtonClickEvent>) => {
                if (button?.detail?.title?.toLowerCase() === 'reset filter') {
                    setReapplyFilter(true);
                }
            });
        }
    }, [isLoading]);

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (!isFetching && embedRef.current !== null) {
            embed(embedRef.current);
        }
    }, [embedRef, isFetching, reportId]);

    React.useEffect(() => {
        if (!isFetching && embedRef.current !== null) {
            const embededReport = powerbi.get(embedRef.current);

            if (embededReport && accessToken) {
                embededReport.setAccessToken(accessToken.token);
            }
        }
    }, [embedRef, accessToken, isFetching]);
    if (
        (powerBIError && powerBIError.detail.errorCode) ||
        (fusionError && fusionError.statusCode)
    ) {
        //Only handling selected errors from Power BI. As you migh get errors that can be ignored.
        const errorCode = powerBIError
            ? powerBIError.detail.errorCode
            : fusionError?.statusCode.toString();

        switch (errorCode) {
            case '404':
                return (
                    <ErrorMessage
                        hasError={true}
                        errorType={'notFound'}
                        resourceName={'report'}
                        message={
                            'Report not found. Report might not be available or it does not exist '
                        }
                    />
                );
            default:
                return <ReportErrorMessage report={report} />;
        }
    }

    return (
        <>
            {isFetching && <Spinner title={loadingText} floating centered />}
            {!isFetching && <div className={styles.powerbiContent} ref={embedRef}></div>}
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
