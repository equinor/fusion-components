import React from 'react';
import { formatDate, Position, PositionInstance } from '@equinor/fusion';

import styles from '../styles.less';
import { useTooltipRef } from '@equinor/fusion-components';

type PositionInstanceProps = {
    position: Position;
    instance: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
    showExternalId: boolean;
};

const PositionInstanceComponent: React.FC<PositionInstanceProps> = ({
    position,
    instance,
    showLocation,
    showDate,
    showExternalId,
}) => {
    const positionNameTooltipRef = useTooltipRef(position.name, 'below');
    const assignedPersonNameTooltipRef = useTooltipRef('Assigned person name', 'below');

    return (
        <div className={styles.positionInstance}>
            <div className={styles.basePositionName}>{position.basePosition.name}</div>
            <div className={styles.positionName}>
                <span ref={positionNameTooltipRef}>{position.name}</span>
            </div>
            <div className={styles.assignedPersonName}>
                <span ref={assignedPersonNameTooltipRef}>Assigned person name</span>
            </div>
            {showLocation && <div className={styles.location}>{instance.location.name}</div>}
            {showDate && (
                <div className={styles.period}>
                    {formatDate(new Date(instance.appliesFrom))} -{' '}
                    {formatDate(new Date(instance.appliesTo))} ({instance.percent}%)
                </div>
            )}
            {showExternalId && <div className={styles.externalId}>{position.externalId}</div>}
        </div>
    );
};

export default PositionInstanceComponent;
