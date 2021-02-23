import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import { Spinner, ErrorMessage } from '@equinor/fusion-components';
import {
    FusionApiHttpErrorResponse,
    useCurrentContext,
    useApiClients,
    ContextTypes,
} from '@equinor/fusion';
import { ICustomEvent } from 'service';
import FusionError from './models/FusionError';
import { Report, AccessToken, EmbedInfo } from '@equinor/fusion/lib/http/apiClients/models/report/';
import {
    ReportLevelFilters,
    IBasicFilter,
    IBasicFilterWithKeys,
    IAdvancedFilter,
    IRelativeDateFuilter,
    ITupleFilter,
} from './models/ReportLevelFilters';

import ReportErrorMessage from './components/ReportErrorMessage';
import ReportEmbed from './components/ReportEmbed';
import React, { FC, useState, useCallback, useEffect } from 'react';

type PowerBIProps = {
    reportId: string;
    filters?: pbi.models.ReportLevelFilters[] | null;
    hasContext?: boolean;
    contextAccessCheck?: boolean;
};

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

/**
 * TODO: use native react component from Microsoft
 */
const PowerBIReport: FC<PowerBIProps> = ({ reportId, filters, hasContext, contextAccessCheck }) => {
    const reportApiClient = useApiClients().report;
    const currentContext = useCurrentContext();

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [powerBIError, setPowerBIError] = useState<ICustomEvent<IError> | null>(null);
    const [fusionError, setFusionError] = useState<FusionError | null>(null);
    const [contextError, setContextError] = useState<FusionError | null>(null);
    const [report, setReport] = useState<Report>();
    const [embedInfo, setEmbedInfo] = useState<EmbedInfo>();
    const [accessToken, setAccessToken] = useState<AccessToken>();
    const [loadingText, setLoadingText] = useState<string>('Loading Report');

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
        }
    };

    const checkContextAccess = useCallback(
        async (contextExternalId: string, contextType: ContextTypes) => {
            setContextError(null);

            try {
                await reportApiClient.checkContextAccess(reportId, contextExternalId, contextType);
            } catch (error) {
                setContextError({
                    statusCode: error.statusCode,
                    fusionError: error.response as FusionApiHttpErrorResponse,
                });
            }
        },
        [reportApiClient]
    );

    useEffect(() => {
        if (
            !contextAccessCheck ||
            !currentContext?.externalId ||
            !embedInfo?.embedConfig.rlsConfiguration
        )
            return;

        checkContextAccess(currentContext?.externalId, currentContext.type.id);
    }, [currentContext?.id, embedInfo?.embedConfig.rlsConfiguration]);

    useEffect(() => {
        getReportInfo();
    }, []);

    useEffect(() => {
        if (accessToken) {
            const now = utcNow();
            const expiration = accessToken.expirationUtc;

            const expires = expiration.getTime() - now.getTime();

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(async () => {
                const access = await reportApiClient.getAccessToken(reportId);
                setAccessToken(access.data);
            }, expires - 2 * 1000);
        }
    }, [accessToken, reportId]);

    if (powerBIError || fusionError) {
        //Only handling selected errors from Power BI. As you might get errors that can be ignored.
        const errorCode = powerBIError
            ? powerBIError?.detail?.errorCode
            : fusionError?.fusionError?.error?.code;

        switch (errorCode) {
            case '404':
            case 'notFound':
                return (
                    <ErrorMessage
                        hasError={true}
                        errorType={'notFound'}
                        resourceName={'report'}
                        message={
                            fusionError?.fusionError?.error?.message ||
                            'Report not found. Report might not be available or it does not exist '
                        }
                    />
                );
            default:
                return report ? (
                    <ReportErrorMessage report={report} contextError={false} />
                ) : (
                    <ErrorMessage
                        hasError={true}
                        message={fusionError?.fusionError?.error?.message || null}
                    />
                );
        }
    } else if (contextError) {
        return report ? (
            <ReportErrorMessage report={report} contextError={true} />
        ) : (
            <ErrorMessage
                hasError={true}
                message={contextError.fusionError?.error?.message || null}
            />
        );
    }

    return (
        <>
            {isFetching && !embedInfo && !accessToken && (
                <Spinner title={loadingText} floating centered />
            )}
            {!isFetching && embedInfo && accessToken && (
                <ReportEmbed
                    reportId={reportId}
                    embedInfo={embedInfo}
                    accessToken={accessToken}
                    setError={setPowerBIError}
                    currentContext={currentContext}
                    filters={filters}
                    hasContext={hasContext}
                />
            )}
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
