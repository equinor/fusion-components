import styles from '../styles.less';
import { PositionInstance, Position } from '@equinor/fusion';
import { PersonPhoto } from '@equinor/fusion-components';
import { FC, useCallback, useMemo } from 'react';

type RotationInstancesProps = {
    allInstances: PositionInstance[];
    position: Position;
    anonymize?: boolean;
};

const RotationInstances: FC<RotationInstancesProps> = ({ allInstances, position, anonymize }) => {
    const instancesSortedByRotationId = useMemo(
        () =>
            allInstances.sort((a, b) => {
                const aRotationId = a.rotationId ? +a.rotationId : 0;
                const bRotationId = b.rotationId ? +b.rotationId : 0;

                return aRotationId - bRotationId;
            }),
        [allInstances]
    );
    const instanceName = useCallback(
        (instance: PositionInstance) => {
            if (anonymize) return '';
            return instance?.assignedPerson?.name ? instance.assignedPerson.name : 'TBN';
        },
        [anonymize]
    );
    return (
        <div className={styles.rotationInstances}>
            {instancesSortedByRotationId.map((instance) => (
                <div className={styles.assignee} key={instance.id}>
                    <PersonPhoto
                        person={!anonymize ? instance.assignedPerson || undefined : undefined}
                        customTooltip={anonymize ? 'Anonymous' : undefined}
                    />
                    <div className={styles.assigneeInfo}>
                        <span className={styles.name}>{instanceName(instance)}</span>
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
