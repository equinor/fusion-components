import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { useTelemetryLogger, Context } from '@equinor/fusion';
import { ICustomEvent } from 'service';
import {
    AccessToken,
    ResourceType,
    EmbedInfo,
    EmbedConfig,
} from '@equinor/fusion/lib/http/apiClients/models/report/';

import styles from '../../styles.less';
import { ButtonClickEvent } from '../../models/EventHandlerTypes';
import { FC, useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';
import { PowerBIReportErrorDetail } from '../..';
import { BookmarksManager } from '@equinor/fusion-components';

type PowerBIProps = {
    reportId: string;
    embedInfo: EmbedInfo;
    accessToken: AccessToken;
    setError: React.Dispatch<React.SetStateAction<PowerBIReportErrorDetail | null>>;
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
const ReportEmbed: FC<PowerBIProps> = ({
    reportId,
    embedInfo,
    accessToken,
    setError,
    currentContext,
    filters,
    hasContext,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [timeLoadStart] = useState<Date>(new Date());
    const telemetryLogger = useTelemetryLogger();
    const [reApplyFilter, setReapplyFilter] = useState<boolean>(false);
    const embedRef = useRef<HTMLDivElement>(null);
    const embeddedRef = useRef<pbi.Embed | null>(null);
    const [awaitableBookmark, setAwaitableBookmark] = useState<string | null>(null);
    const [isRendering, setIsRendering] = useState<boolean>(true);
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

    const getConfig = useCallback(
        (embedConfig: EmbedConfig) => {
            const token = accessToken.token;
            const config: pbi.IEmbedConfiguration = {
                type: embedConfig.embedType.toLowerCase(),
                id: getReportOrDashboardId(embedConfig, embedConfig.embedType),
                embedUrl: embedConfig.embedUrl,
                tokenType: getTokenType(embedConfig),
                accessToken: token,
            };

            if (embedConfig.embedType === 'Report') {
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
                const config = getConfig(embedInfo.embedConfig);
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
                    setIsRendering(false);
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
        const embedType = embedInfo.embedConfig?.embedType;
        if (!embeddedRef.current || !embedType) return;
        switch (embedType) {
            case 'Report':
                embeddedRef.current.on('pageChanged', setFilter);
                return () =>
                    embeddedRef?.current ? embeddedRef.current.off('pageChanged') : undefined;
        }
    }, [filters, embeddedRef.current, embedInfo, awaitableBookmark]);

    useEffect(() => {
        if (!isLoading) setFilter();
    }, [isLoading]);

    useEffect(() => {
        if (!embeddedRef.current) return;

        setIsLoading(true);

        embeddedRef.current.reload();
    }, [currentContext?.id]);

    useEffect(() => {
        if (!embeddedRef.current) return;

        embeddedRef.current.off('rendered');
        embeddedRef.current.on('rendered', () => {
            if (reApplyFilter) setFilter();
            setReapplyFilter(false);
        });
    }, [reApplyFilter]);

    useEffect(() => {
        if (!embedRef?.current) return;

        embed(embedRef.current);
    }, [embedRef?.current, accessToken]);

    useEffect(() => {
        if (embedRef.current !== null) {
            const embededReport = powerbi.get(embedRef.current);

            if (embededReport) embededReport.setAccessToken(accessToken.token);
        }
    }, [embedRef?.current, accessToken]);

    return (
        <>
            <div className={styles.powerbiContent} ref={embedRef}></div>
            {!isRendering && (
                <BookmarksManager
                    applyBookmark={(bookmark, awaitForContextSwitch) =>
                        applyBookmark(bookmark.payload, awaitForContextSwitch)
                    }
                    anchorId="pbi-bookmarks-btn"
                    name="Power BI bookmarks"
                    capturePayload={captureBookmark}
                />
            )}
        </>
    );
};

export default ReportEmbed;
