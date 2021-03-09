import { useCallback, useMemo, FC } from 'react';
import { WorkflowProvisioningStatus, Workflow, WorkflowStep } from './models';
import styles from './styles.less';
import RequestWorkflowStep from './WorkflowStep';

type RequestWorkflowProps = {
    workflow: Workflow | null;
    provisioningStatus: WorkflowProvisioningStatus;
    inline?: boolean;
};

const RequestWorkflow: FC<RequestWorkflowProps> = ({ workflow, inline, provisioningStatus }) => {
    const findWorkflowIndex = useCallback(
        (step: WorkflowStep, index: number): number => {
            const previousStep = workflow.steps.find(
                (workflowStep) => workflowStep.id === step.previousStep
            );

            if (previousStep) {
                return findWorkflowIndex(previousStep, index + 1);
            }
            return index;
        },
        [workflow]
    );

    const sortedWorkflowSteps = useMemo(
        () => workflow &&
            workflow.steps.reduce((sortedSteps: WorkflowStep[], currentStep: WorkflowStep) => {
                sortedSteps[findWorkflowIndex(currentStep, 0)] = currentStep;
                return sortedSteps;
            }, new Array(workflow.steps.length).fill(null)),
        [workflow, findWorkflowIndex]
    );

    return (
        <div className={styles.workflowContainer}>
            {!!workflow ? sortedWorkflowSteps.map((step) => (
                <RequestWorkflowStep
                    key={step.id}
                    step={step}
                    inline={!!inline}
                    provisioningStatus={provisioningStatus}
                />
            )) : <div>Workflow has not been initiated yet</div>}
        </div>
    );
};

export default RequestWorkflow;
