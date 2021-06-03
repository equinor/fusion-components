import { formatDate, useCurrentPersonDetails } from "@equinor/fusion";
import { PersonPhoto } from "@equinor/fusion-components";
import { FC, useMemo } from "react";
import { WorfklowPendingPerson, WorkflowStep } from "./models";
import styles from './styles.less';

type Props = {
    step: WorkflowStep;
    pendingPerson?: WorfklowPendingPerson;
}

const CompletedBy: FC<Props> = ({step, pendingPerson}) => {
    const { personDetails } = useCurrentPersonDetails();

    const personPhotoId = useMemo(() => {
        const person = step.completedBy;
        if (person) {
            return person.azureUniquePersonId;
        } else if (step.state === 'Approved' && personDetails) {
            return personDetails.azureUniqueId;
        }

        if (step.id === pendingPerson?.stepId) {
            return pendingPerson?.person?.azureUniquePersonId;
        }
        return null;
    }, [step, personDetails]);

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
}

export default CompletedBy;