import { formatDate, useCurrentPersonDetails } from "@equinor/fusion";
import { PersonPhoto } from "@equinor/fusion-components";
import { FC, useMemo } from "react";
import { WorkflowStep } from "./models";
import styles from './styles.less';

type Props = {
    step: WorkflowStep;
}

const CompletedBy: FC<Props> = ({step}) => {
    const { personDetails } = useCurrentPersonDetails();

    const personPhotoId = useMemo(() => {
        const person = step.completedBy;
        if (person) {
            return person.azureUniquePersonId;
        } else if (step.state === 'Approved' && personDetails) {
            return personDetails.azureUniqueId;
        }

        if (step?.pendingPerson) {
            return step.pendingPerson?.azureUniquePersonId;
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