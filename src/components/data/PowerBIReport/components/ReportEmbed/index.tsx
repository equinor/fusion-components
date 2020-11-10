import * as React from 'react';
import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { useTelemetryLogger, useCurrentApp, Context } from '@equinor/fusion';
import { ICustomEvent } from 'service';
import {
    AccessToken,
    ResourceType,
    EmbedInfo,
    EmbedConfig,
} from '@equinor/fusion/lib/http/apiClients/models/report/';
import { AppSettingsManager } from '@equinor/fusion-components';

import * as styles from '../../styles.less';
import { ButtonClickEvent } from '../../models/EventHandlerTypes';

type PowerBIProps = {
    reportId: string;
    embedInfo: EmbedInfo;
    accessToken: AccessToken;
    setError: React.Dispatch<
        React.SetStateAction<pbi.service.ICustomEvent<pbi.models.IError> | null>
    >;
    currentContext: Context | null;
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

/**
 * TODO: use native react component from Microsoft
 */
const ReportEmbed: React.FC<PowerBIProps> = ({
    reportId,
    embedInfo,
    accessToken,
    setError,
    currentContext,
    filters,
    hasContext,
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [timeLoadStart, SetTimeLoadStart] = React.useState<Date>(new Date());
    const telemetryLogger = useTelemetryLogger();
    const [reApplyFilter, setReapplyFilter] = React.useState<boolean>(false);
    const embedRef = React.useRef<HTMLDivElement>(null);
    const embeddedRef = React.useRef<pbi.Embed | null>(null);
    const [awaitableBookmark, setAwaitableBookmark] = React.useState<string | null>(null);

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

    const getConfig = React.useCallback(
        (embedInfo: EmbedInfo) => {
            const embedConfig = embedInfo.embedConfig;
            const token = accessToken ? accessToken.token : undefined;
            let config: pbi.IEmbedConfiguration = {
                type: embedInfo.embedConfig.embedType.toLowerCase(),
                id: getReportOrDashboardId(embedConfig, embedInfo.embedConfig.embedType),
                embedUrl: embedConfig.embedUrl,
                tokenType: getTokenType(embedConfig),
                accessToken: token,
            };

            if (embedInfo.embedConfig.embedType === 'Report') {
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
        [accessToken]
    );

    const embed = React.useCallback(
        (node: HTMLDivElement) => {
            if (embedInfo) {
                const config = getConfig(embedInfo);

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
                    setError(err);
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
        [embedInfo, getConfig, reportId]
    );

    /** TODO: add filters for dashboard if needed? */
    React.useLayoutEffect(() => {
        const embedType = embedInfo?.embedConfig?.embedType;
        if (!embeddedRef.current || !embedType) return;
        switch (embedType) {
            case 'Report':
                embeddedRef.current.on('pageChanged', setFilter);
                return () =>
                    embeddedRef?.current ? embeddedRef.current.off('pageChanged') : undefined;
        }
    }, [filters, embeddedRef.current, embedInfo]);

    React.useEffect(() => {
        if (!isLoading) setFilter();
    }, [isLoading]);

    React.useEffect(() => {
        if (!embeddedRef.current) return;

        setIsLoading(true);
        embeddedRef.current.reload();
    }, [currentContext?.id]);

    React.useEffect(() => {
        if (!embeddedRef.current) return;

        embeddedRef.current.off('rendered');
        embeddedRef.current.on('rendered', () => {
            if (reApplyFilter) setFilter();
            setReapplyFilter(false);
        });
    }, [reApplyFilter]);

    React.useEffect(() => {
        if (!embedRef?.current || !accessToken) return;

        embed(embedRef.current);
    }, [embedRef?.current, accessToken]);

    React.useEffect(() => {
        if (!embedRef?.current) return;

        const embededReport = powerbi.get(embedRef.current);
        if (embededReport && accessToken) embededReport.setAccessToken(accessToken.token);
    }, [embedRef?.current, accessToken]);

    return (
        <>
            <div className={styles.powerbiContent} ref={embedRef}></div>
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

export default ReportEmbed;
