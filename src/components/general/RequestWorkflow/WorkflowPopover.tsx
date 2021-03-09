import { formatDate } from '@equinor/fusion';
import classNames from 'classnames';
import { FC, useCallback, useMemo } from 'react';
import styles from './styles.less';
import { PersonCard } from '@equinor/fusion-components';
import FusionIcon from './FusionIcon';
import { WorkflowProvisioningStatus, WorkflowStep } from './models';

type WorkflowPopoverProps = {
    step: WorkflowStep;
    provisioningStatus: WorkflowProvisioningStatus;
};

const WorkflowPopover: FC<WorkflowPopoverProps> = ({ step, provisioningStatus }) => {
    const createItemField = useCallback(
        (fieldName: string, title: string, content: () => string | JSX.Element) => {
            return (
                <div className={classNames(styles.textField, styles[fieldName])}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.content}>{content()}</span>
                </div>
            );
        },
        []
    );

    const hasProvisioned = useMemo(
        () => provisioningStatus && step.id === 'provisioning' && provisioningStatus.state === 'Provisioned',
        [provisioningStatus, step]
    );

    return (
        <div className={styles.popoverContainer}>
            <span className={styles.header}>
                {step.name} - {hasProvisioned ? provisioningStatus.state : step.state}
            </span>
            {createItemField('started', 'Started', () =>
                step.started ? formatDate(step.started) : 'N/A'
            )}

            {createItemField('completed', 'Completed', () =>
                step.completed ? formatDate(step.completed) : 'N/A'
            )}
            {createItemField('completedBy', 'Completed by', () =>
                hasProvisioned ? (
                    <div className={styles.stepPerson}>
                        <FusionIcon />
                        <div className={styles.stepPersonDetails}>
                            <span>System account</span>
                        </div>
                    </div>
                ) : step.completedBy?.azureUniquePersonId ? (
                    <PersonCard
                        personId={step.completedBy?.azureUniquePersonId}
                        photoSize="large"
                    />
                ) : (
                    'TBN'
                )
            )}
            {createItemField('description', 'Description', () =>
                step.description.length > 0 ? step.description : 'N/A'
            )}
        </div>
    );
};

export default WorkflowPopover;
