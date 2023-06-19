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
        (step: WorkflowStep, index: number, depth?: number): number => {
            if (depth > 50) {
                throw 'Exceeding maximum depth';
            }
            const previousStep = workflow.steps.find(
                (workflowStep) => workflowStep.id === step.previousStep
            );

            if (previousStep) {
                return findWorkflowIndex(previousStep, index + 1, depth + 1);
            }
            return index;
        },
        [workflow]
    );

    const sortedWorkflowSteps: WorkflowStep[] = useMemo(() => {
        try {
            if (workflow) {
                return workflow.steps.reduce(
                    (sortedSteps: WorkflowStep[], currentStep: WorkflowStep) => {
                        const currentIndex = findWorkflowIndex(currentStep, 0, 0);
                        sortedSteps[currentIndex] = currentStep;
                        return sortedSteps;
                    },
                    new Array(workflow.steps.length).fill(null)
                );
            }
        } catch (err) {
            return undefined;
        }
    }, [workflow, findWorkflowIndex]);

    return (
        <div className={styles.workflowContainer}>
            {sortedWorkflowSteps ? (
                sortedWorkflowSteps.map((step) => (
                    <RequestWorkflowStep
                        key={step.id}
                        step={step}
                        inline={!!inline}
                        provisioningStatus={provisioningStatus}
                    />
                ))
            ) : !inline ? (
                <div>No workflow has been initiated yet</div>
            ) : null}
        </div>
    );
};

export default RequestWorkflow;
