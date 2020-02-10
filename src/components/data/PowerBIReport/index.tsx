import * as React from 'react';
import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { Spinner, ErrorMessage } from '@equinor/fusion-components';
import {
    useTelemetryLogger,
    FusionApiHttpErrorResponse,
    useApiClients,
    useCurrentApp,
} from '@equinor/fusion';
import { ReportType } from './models/reportTypes';
import { ICustomEvent } from 'service';
import FusionError from './models/FusionError';
import FusionErrorMessage from './components/FusionErrorMessage';
import { Report, EmbedInfo, AccessToken } from '@equinor/fusion/lib/http/apiClients/models/report/';
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

type PowerBIProps = {
    reportId: string;
    filters?: pbi.models.ReportLevelFilters[] | null;
};

const getReportOrDashboardId = (embedConfig: any, type: ReportType) => {
    switch (type) {
        case 'report':
            return embedConfig.reportId;
        case 'dashboard':
            return embedConfig.dashboardId;
    }
};

const getTokenType = (embedConfig: any) => {
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

let timeout: any;

const PowerBIReport: React.FC<PowerBIProps> = ({ reportId, filters }) => {
    const reportContext = useApiClients().report;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [powerBIError, setPowerBIError] = React.useState<ICustomEvent<IError>>();
    const [fusionError, setFusionError] = React.useState<FusionError>();

    const [report, setReport] = React.useState<Report>();
    const [embedInfo, setEmbedInfo] = React.useState<EmbedInfo>();
    const [accessToken, setAccessToken] = React.useState<AccessToken>();
    const [timeLoadStart, SetTimeLoadStart] = React.useState<Date>(new Date());
    const telemetryLogger = useTelemetryLogger();

    const embedRef = React.useRef<HTMLDivElement>(null);
    const embeddedRef = React.useRef<pbi.Embed | null>(null);

    const getReportInfo = async () => {
        try {
            const fetchedReport = await reportContext.getReportAsync(reportId);
            setReport(fetchedReport.data);
            const fetchedEmbedInfo = await reportContext.getEmbedInfo(reportId);
            setEmbedInfo(fetchedEmbedInfo.data);
            const fetchedAccessToken = await reportContext.getAccessToken(reportId);
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

    const setFilter = async () => {
        if (!embedRef.current) return;

        const report = powerbi.get(embedRef.current) as pbi.Report;

        if (!report) return;

        filters ? report.setFilters(filters) : report.removeFilters();
    };

    React.useEffect(() => {
        if (!isLoading) setFilter();
    }, [filters, embedRef, isLoading]);

    React.useEffect(() => {
        getReportInfo();
    }, []);

    const getConfig = React.useCallback(
        (type: ReportType) => {
            const embedConfig = embedInfo ? embedInfo.embedConfig : undefined;
            const token = accessToken ? accessToken.token : undefined;
            let config: pbi.IEmbedConfiguration = {
                type,
                id: getReportOrDashboardId(embedConfig, type),
                embedUrl: embedConfig.embedUrl,
                tokenType: getTokenType(embedConfig),
                accessToken: token,
            };

            if (type === 'report') {
                const settings = {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false,
                    // background: pbi.models.BackgroundType.Transparent,
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

    const embed = React.useCallback(
        (node: HTMLDivElement) => {
            if (embedInfo) {
                const config = getConfig(embedInfo.embedConfig.embedType.toLowerCase());

                embeddedRef.current = powerbi.embed(node, config);

                embeddedRef.current.off('loaded');
                embeddedRef.current.off('error');
                embeddedRef.current.off('rendered');
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

    React.useEffect(() => {
        if (embeddedRef.current) {
            embeddedRef.current.off('pageChanged');
            embeddedRef.current.off('buttonClicked');
            embeddedRef.current.on('pageChanged', () => {
                setFilter();
            });
            embeddedRef.current.on('buttonClicked', (button: ICustomEvent<ButtonClickEvent>) => {
                if (button.detail.title.toLowerCase() === 'reset filter') setFilter();
            });
        }
    }, [filters, embedRef.current]);

    React.useEffect(() => {
        if (accessToken) {
            const now = utcNow();
            const expiration = accessToken.expirationUtc;

            const expires = expiration.getTime() - now.getTime();

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(async () => {
                const access = await reportContext.getAccessToken(reportId);
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

    if (fusionError && report) {
        return <FusionErrorMessage error={fusionError} report={report} />;
    }

    if (fusionError && fusionError.statusCode === 404)
        if (
            (powerBIError && powerBIError.detail.errorCode) ||
            (fusionError && fusionError.statusCode)
        ) {
            //Only handling selected errors from Power BI. As you migh get errors that can be ignored.
            const errorCode = powerBIError
                ? powerBIError.detail.errorCode
                : fusionError.statusCode.toString();

            switch (errorCode) {
                case '401':
                    return (
                        <ErrorMessage
                            hasError={true}
                            errorType={'accessDenied'}
                            message={'Access Denied'}
                        />
                    );
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
            }
        }

    return (
        <>
            {isLoading && embedInfo && embedInfo.embedConfig.embedType === 'Dashboard' && (
                <Spinner floating centered />
            )}
            <div className={styles.powerbiContent} ref={embedRef}></div>
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
