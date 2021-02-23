import { useEffect, useCallback, useState, FC } from 'react';
import * as pbi from 'powerbi-client';
import { IError } from 'powerbi-models';
import ReportEmbed from './components/ReportEmbed';
import { Spinner, ErrorMessage } from '@equinor/fusion-components';
import {
    useTelemetryLogger,
    FusionApiHttpErrorResponse,
    useCurrentContext,
    useApiClients,
    FusionApiErrorMessage,
} from '@equinor/fusion';
import { ICustomEvent } from 'service';
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
import { ErrorTypes } from '../../general/ErrorMessage';

type PowerBIProps = {
    reportId: string;
    filters?: pbi.models.ReportLevelFilters[] | null;
    hasContext?: boolean;
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

export type PowerBIReportErrorDetail = {
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

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [error, setError] = useState<PowerBIReportErrorDetail | null>(null);

    const [report, setReport] = useState<Report>();
    const [embedInfo, setEmbedInfo] = useState<EmbedInfo>();
    const [accessToken, setAccessToken] = useState<AccessToken>();
    const telemetryLogger = useTelemetryLogger();

    const [loadingText, setLoadingText] = useState<string>('Loading Report');

    const getReportInfo = async () => {
        setIsFetching(true);
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
        getReportInfo();
    }, []);

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
            {!isFetching && (
                <ReportEmbed
                    reportId={reportId}
                    embedInfo={embedInfo}
                    accessToken={accessToken}
                    setError={setError}
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
