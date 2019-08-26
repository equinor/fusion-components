import React, { useCallback } from 'react';
import { formatDate, Position, PositionInstance } from '@equinor/fusion';

import styles from '../styles.less';
import { useTooltipRef } from '@equinor/fusion-components';

type PositionInstanceProps = {
    position: Position;
    instance: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
    showExternalId: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
};

const PositionInstanceComponent: React.FC<PositionInstanceProps> = ({
    position,
    instance,
    showLocation,
    showDate,
    showExternalId,
    onClick,
}) => {
    const positionNameTooltipRef = useTooltipRef(position.name, 'below');
    const assignedPersonNameTooltipRef = useTooltipRef(instance.assignedPerson.name, 'below');
    
    const onClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if(onClick) {
            onClick(position, instance);
            e.stopPropagation();
        }
    }, [position, instance, onClick]);

    return (
        <div className={styles.positionInstance} onClick={onClickHandler}>
            <div className={styles.basePositionName}>{position.basePosition.name}</div>
            <div className={styles.positionName}>
                <span ref={positionNameTooltipRef}>{position.name}</span>
            </div>
            <div className={styles.assignedPersonName}>
                <span ref={assignedPersonNameTooltipRef}>{instance.assignedPerson.name}</span>
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
