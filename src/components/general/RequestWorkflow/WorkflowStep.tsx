import { FC, useMemo } from 'react';
import styles from './styles.less';
import { CheckCircleIcon, styling, ScheduleIcon, usePopoverRef } from '@equinor/fusion-components';
import classNames from 'classnames';
import WorkflowPopover from './WorkflowPopover';
import { WorkflowProvisioningStatus, WorkflowStep } from './models';
import CompletedBy from './CompletedBy';

type RequestWorkflowStepProps = {
    step: WorkflowStep;
    provisioningStatus: WorkflowProvisioningStatus;
    inline: boolean;
};

const RequestWorkflowStep: FC<RequestWorkflowStepProps> = ({
    step,
    inline,
    provisioningStatus,
}) => {
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
            case 'Skipped':
                return <CheckCircleIcon color={styling.colors.green} />;
            case 'Pending':
                return step.started ? (
                    <ScheduleIcon color={styling.colors.orange} />
                ) : (
                    <ScheduleIcon color={styling.colors.blackAlt3} />
                );
            default:
                null;
        }
    }, [step]);

    const workflowStepClasses = classNames(styles.workflowStep, {
        [styles.inline]: inline,
    });

    const connectorClasses = classNames(styles.stepConnectorLine, {
        [styles.approved]: step.state === 'Approved' || step.state === 'Skipped',
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
            {!inline && <CompletedBy step={step} />}
        </div>
    );
};

export default RequestWorkflowStep;
