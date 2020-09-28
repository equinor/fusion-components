import * as React from 'react';
import * as styles from './styles.less';
import { Report } from '@equinor/fusion/lib/http/apiClients/models/report/';
import {
    MarkdownViewer,
    Spinner,
    PersonCard,
    Accordion,
    AccordionItem,
    useElevationClassName,
} from '@equinor/fusion-components';
import { useCurrentUser, useApiClients } from '@equinor/fusion';
import classNames from 'classnames';

type ReportErrorMessageProps = {
    report: Report;
};

const ReportErrorMessage: React.FC<ReportErrorMessageProps> = ({ report }) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(true);
    const [requirements, setRequirements] = React.useState<string | null>(null);
    const [description, setDescription] = React.useState<string | null>(null);
    const [noAccessMessage, setNoAccessMessage] = React.useState<string | null>(null);
    const [isAccessControlDescriptionsOpen, setAccessControlDescriptionOpen] = React.useState(
        false
    );

    const reportApiClient = useApiClients().report;
    const user = useCurrentUser();
    const timeStamp = React.useMemo(() => new Date().toString(), []);

    React.useEffect(() => {
        getReportInformation();
    }, [report]);

    const getReportInformation = React.useCallback(async () => {
        setIsFetching(true);

        try {
            const fetchedRequirements = await reportApiClient.getRlsRequirements(report.id);
            setRequirements(fetchedRequirements?.data || null);
        } catch {
            setRequirements(null);
        }

        try {
            const fetchedNoAccessMessage = await reportApiClient.getAccessDescription(report.id);
            setNoAccessMessage(fetchedNoAccessMessage?.data || null);
        } catch {
            setNoAccessMessage(null);
        }

        try {
            const fetchedDescriptions = await reportApiClient.getDescription(report.id);
            setDescription(fetchedDescriptions?.data || null);
        } catch {
            setDescription(null);
        }

        setIsFetching(false);
    }, [report.id]);

    if (isFetching)
        return <Spinner title={'Retrieving report access specifications '} floating centered />;

    return (
        <div className={styles.reportErroMessage}>
            <div className={styles.container}>
                <h2 className={styles.header}>Restricted Access</h2>
                <div
                    className={classNames(
                        useElevationClassName(3),
                        styles.restrictedAccessContainer
                    )}
                >
                    <h2>It looks like you do not have access to this report</h2>
                    {noAccessMessage && <MarkdownViewer markdown={noAccessMessage} />}
                    <div className={styles.reportInfoContainer}>
                        {description && (
                            <div className={styles.reportDescription}>
                                <h5>Report description</h5>
                                <MarkdownViewer markdown={description} />
                            </div>
                        )}
                        {report.ownedBy?.azureUniqueId && (
                            <div className={styles.reportOwner}>
                                <h5>Report owner</h5>
                                <PersonCard personId={report.ownedBy.azureUniqueId}></PersonCard>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.userIdentityContainer}>
                    <h4>
                        Your identity does not meet this reports access requirements, your identity
                        is:
                    </h4>
                    <div className={styles.info}>
                        <div className={styles.labels}>
                            <div>Username</div>
                            <div>GUID</div>
                            <div>Roles</div>
                            <div>Timestamp</div>
                            <div>Context</div>
                        </div>
                        <div className={styles.text}>
                            <div> {user?.upn} </div>
                            <div> {user?.id} </div>
                            <div>{user?.roles.toString()} </div>
                            <div> {timeStamp} </div>
                            <div> {window.location.href} </div>
                        </div>
                    </div>
                </div>
                {requirements && (
                    <div className={styles.accessControlContainer}>
                        <Accordion>
                            <AccordionItem
                                label={'Access control description'}
                                isOpen={isAccessControlDescriptionsOpen}
                                onChange={() => setAccessControlDescriptionOpen((s) => !s)}
                            >
                                <MarkdownViewer markdown={requirements} />
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportErrorMessage;
