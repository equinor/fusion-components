import React, { useCallback } from 'react';
import { formatDate, Position, PositionInstance } from '@equinor/fusion';

import styles from '../styles.less';
import { useTooltipRef, ExpandMoreIcon, IconButton } from '@equinor/fusion-components';

type PositionInstanceProps = {
    position: Position;
    instance: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
    showExternalId: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
    onExpand?: (position: Position, instance: PositionInstance) => void;
};

const PositionInstanceComponent: React.FC<PositionInstanceProps> = ({
    position,
    instance,
    showLocation,
    showDate,
    showExternalId,
    onClick,
    onExpand,
}) => {
    const positionNameTooltipRef = useTooltipRef(position.name, 'below');
    const assignedPersonNameTooltipRef = useTooltipRef(instance.assignedPerson.name, 'below');

    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (onClick) {
                onClick(position, instance);
                e.stopPropagation();
            }
        },
        [position, instance, onClick]
    );

    const onExpandHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onExpand) {
                onExpand(position, instance);
                e.stopPropagation();
            }
        },
        [position, instance, onExpand]
    );

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
                    {formatDate(instance.appliesFrom)} - {formatDate(instance.appliesTo)} (
                    {instance.percent}%)
                </div>
            )}
            {showExternalId && <div className={styles.externalId}>{position.externalId}</div>}
            {onExpand && (
                <div className={styles.expandButton}>
                    {/* Child count */}
                    <IconButton onClick={onExpandHandler}>
                        <ExpandMoreIcon isExpanded={false} />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default PositionInstanceComponent;
