import * as React from 'react';
import * as styles from '../styles.less';
import { PositionInstance, Position } from '@equinor/fusion';
import { PersonPhoto } from '@equinor/fusion-components';

type RotationInstancesProps = {
    allInstances: PositionInstance[];
    position: Position;
};

const RotationInstances: React.FC<RotationInstancesProps> = ({ allInstances, position }) => {
    const instancesSortedByRotationId = React.useMemo(
        () =>
            allInstances.sort((a, b) => {
                const aRotationId = a.rotationId ? +a.rotationId : 0;
                const bRotationId = b.rotationId ? +b.rotationId : 0;

                return aRotationId - bRotationId;
            }),
        [allInstances]
    );
    return (
        <div className={styles.rotationInstances}>
            {instancesSortedByRotationId.map((instance) => (
                <div className={styles.assignee}>
                    <PersonPhoto person={instance.assignedPerson || undefined} />
                    <div className={styles.assigneeInfo}>
                        <span className={styles.name}>
                            {instance.assignedPerson && instance.assignedPerson.name
                                ? instance.assignedPerson.name
                                : 'TBN'}
                        </span>
                        <span className={styles.externalId}>
                            {position.externalId}-
                            {instance.rotationId ? `R${instance.rotationId.toUpperCase()}` : ''}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RotationInstances;
