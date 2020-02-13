import React from 'react';
import styles from '../styles.less';
import { PositionInstance, Position } from '@equinor/fusion';
import { PersonPhoto } from '@equinor/fusion-components';

type RotationInstancesProps = {
    allInstances: PositionInstance[];
    position: Position;
};

const RotationInstances: React.FC<RotationInstancesProps> = ({ allInstances, position }) => {
    return (
        <div className={styles.rotationInstances}>
            {allInstances.map(instance => (
                <div className={styles.assignee}>
                    <PersonPhoto person={instance.assignedPerson} />
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
