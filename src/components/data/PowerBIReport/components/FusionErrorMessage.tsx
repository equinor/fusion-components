import * as React from 'react';
import * as styles from '../styles.less';
import FusionError from '../models/FusionError';
import { Report } from '@equinor/fusion/lib/http/apiClients/models/report/';
import ErrorMessage from 'components/general/ErrorMessage';
import PersonCard from 'components/people/PersonCard';
import { BlockIcon } from 'components/icons/components/content';

type FusionMessageProps = {
    error: FusionError;
    report: Report;
};

const iconProps = {
    width: 80,
    height: 80,
    cursor: 'default',
    color: '#666666',
};

const AccessDenied: React.FC<FusionMessageProps> = ({ report }) => {
    const owner = report.ownedBy;
    const policy = report.securityRequirementCheck || 'any';
    const disciplines = report.securityRequirements
        ? report.securityRequirements.map(s => s.value)
        : [];

    return (
        <div className={styles.errorContainer}>
            <div>
                <BlockIcon {...iconProps} />
            </div>
            <div className={styles.errorTitle}>You can't access this report or dashboard</div>
            {owner && (
                <div className={styles.owner}>
                    <PersonCard personId={owner.azureUniqueId}></PersonCard>
                    <div className={styles.info}>Report is owned by {owner.name}</div>
                </div>
            )}
            {disciplines.length > 0 && (
                <>
                    <div className={styles.errorMetadata}>
                        To access the report, you'll need to have <i>{policy.toLowerCase()}</i> of
                        the following disciplines:
                    </div>
                    <ul>
                        {disciplines.map(d => (
                            <li>{d}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

const ReportViewerErrorMessage: React.FC<FusionMessageProps> = ({ report, error }) => {
    if (error.statusCode === 403 || error.statusCode === 401) {
        return <AccessDenied report={report} error={error} />;
    }

    const errorMessage = React.useMemo(() => {
        const { fusionError } = error;

        if (fusionError && fusionError.error) {
            return fusionError.error.message;
        } else if (fusionError) {
            const err = fusionError as any;

            return err.status === 404
                ? 'Tried to load report but required data was not found.'
                : 'Something unexpected occurred.';
        }

        return 'Something unexpected occurred.';
    }, [error]);

    return (
        <ErrorMessage
            hasError={true}
            message={errorMessage}
            title={'Something went wrong'}
            errorType={error.statusCode === 404 ? 'notFound' : 'error'}
        />
    );
};

export default ReportViewerErrorMessage;
