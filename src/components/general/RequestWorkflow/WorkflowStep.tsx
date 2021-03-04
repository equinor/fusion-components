import { FC, useMemo } from 'react';
import styles from './styles.less';
import {
    CheckCircleIcon,
    styling,
    PersonPhoto,
    ScheduleIcon,
    usePopoverRef,
} from '@equinor/fusion-components';
import { formatDate, useCurrentPersonDetails } from '@equinor/fusion';
import classNames from 'classnames';
import WorkflowPopover from './WorkflowPopover';
import { ProvisioningStatus, WorkflowStep } from './models';

type RequestWorkflowStepProps = {
    step: WorkflowStep;
    provisioningStatus: ProvisioningStatus;
    inline: boolean;
};

const RequestWorkflowStep: FC<RequestWorkflowStepProps> = ({
    step,
    inline,
    provisioningStatus,
}) => {
    const { personDetails } = useCurrentPersonDetails();
    const [popoverRef] = usePopoverRef<HTMLDivElement>(
        <WorkflowPopover step={step} provisioningStatus={provisioningStatus} />,
        {
            justify: 'center',
            placement: 'below',
        },
        true,
        300
    );

    const icon = useMemo(() => {
        switch (step.state) {
            case 'Approved':
                return <CheckCircleIcon color={styling.colors.green} />;
            case 'Pending':
                return !!step.started ? (
                    <ScheduleIcon color={styling.colors.orange} />
                ) : (
                    <ScheduleIcon color={styling.colors.blackAlt3} />
                );
            default:
                null;
        }
    }, [step]);

    const personPhotoId = useMemo(() => {
        const person = step.completedBy;
        if (person && !inline) {
            return person.azureUniquePersonId;
        } else if (step.state === 'Approved' && personDetails && !inline) {
            return personDetails.azureUniqueId;
        }
        return null;
    }, [step, personDetails, inline]);

    const completedBy = useMemo(() => {
        return (
            <div className={styles.stepPerson}>
                {personPhotoId && <PersonPhoto personId={personPhotoId} />}
                <div className={styles.stepPersonDetails}>
                    <span className={styles.completed}>{step.state}</span>
                    <span className={styles.completedDate}>
                        {step.completed ? formatDate(step.completed) : ''}
                    </span>
                </div>
            </div>
        );
    }, [step, inline, personPhotoId]);

    const workflowStepClasses = classNames(styles.workflowStep, {
        [styles.inline]: inline,
    });

    const connectorClasses = classNames(styles.stepConnectorLine, {
        [styles.approved]: step.state === 'Approved',
    });

    const workflowStepNameClasses = classNames(styles.stepTitle, {
        [styles.disabled]: step.state === 'Pending',
    });

    return (
        <div className={workflowStepClasses}>
            <div className={styles.stepHeader} ref={popoverRef}>
                <div>{icon}</div>
                {!inline && <span className={workflowStepNameClasses}>{step.name}</span>}
                {step.nextStep !== null && (
                    <div className={styles.stepConnector}>
                        <div className={connectorClasses}></div>
                    </div>
                )}
            </div>
            {!inline && completedBy}
        </div>
    );
};

export default RequestWorkflowStep;
