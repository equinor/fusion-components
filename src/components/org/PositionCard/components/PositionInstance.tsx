import React, { useCallback } from 'react';
import { formatDate, Position, PositionInstance } from '@equinor/fusion';
import classNames from 'classnames';
import styles from '../styles.less';
import { useTooltipRef, ExpandMoreIcon, IconButton } from '@equinor/fusion-components';

type PositionInstanceProps = {
    position: Position;
    instance?: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
    showObs: boolean;
    showExternalId: boolean;
    onClick?: (position: Position, instance?: PositionInstance) => void;
    onExpand?: (position: Position, instance?: PositionInstance) => void;
};

const PositionInstanceComponent: React.FC<PositionInstanceProps> = ({
    position,
    instance,
    showLocation,
    showDate,
    showExternalId,
    showObs,
    onClick,
    onExpand,
}) => {
    const assignedPersonName =
        instance && instance.assignedPerson ? instance.assignedPerson.name : 'TBN';
    const locationName =
        instance && instance.location && instance.location.name ? instance.location.name : 'TBN';

    const obsTooltipRef = useTooltipRef('OBS: ' + position.basePosition.name, 'below');
    const positionNameTooltipRef = useTooltipRef('Position: ' + position.name, 'below');
    const assignedPersonNameTooltipRef = useTooltipRef('Person: ' + assignedPersonName, 'below');
    const currentPeriodTooltipRef = useTooltipRef('Current period', 'below');
    const directChildrenTooltipRef = useTooltipRef(
        position.directChildCount + ' positions',
        'above'
    );
    const externalIdTooltipRef = useTooltipRef('External ID: ' + position.externalId, 'below');

    const positionInstanceClasses = classNames(styles.positionInstance, {
        [styles.cropPositionName]: !showObs || (showObs && !showLocation && !showDate),
    });

    const onClickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (onClick) {
                e.stopPropagation();
                onClick(position, instance);
            }
        },
        [position, instance, onClick]
    );

    const onExpandHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onExpand) {
                e.stopPropagation();
                onExpand(position, instance);
            }
        },
        [position, instance, onExpand]
    );

    const instances = position ? position.instances : [];
    const instancesByFrom = React.useMemo(
        () => [...instances].sort((a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime()),
        [instances]
    );
    const instancesByTo = React.useMemo(
        () => [...instances].sort((a, b) => b.appliesTo.getTime() - a.appliesTo.getTime()),
        [instances]
    );

    const firstInstance = React.useMemo(() => instancesByFrom[0], [instancesByFrom]);
    const lastInstance = React.useMemo(
        () => instancesByTo.find(i => i.appliesTo.getTime !== undefined),
        [instancesByTo]
    );

    return (
        <div className={positionInstanceClasses} onClick={onClickHandler}>
            {showObs && (
                <div className={styles.basePositionName}>
                    <span ref={obsTooltipRef}>{position.basePosition.name}</span>
                </div>
            )}

            <div className={styles.positionName}>
                <span ref={positionNameTooltipRef}>{position.name}</span>
            </div>

            <div className={styles.assignedPersonName}>
                <span ref={assignedPersonNameTooltipRef}>{assignedPersonName}</span>
            </div>
            {showLocation && <div className={styles.location}>{locationName}</div>}
            {showDate && instance && (
                <div className={styles.period}>
                    <span ref={currentPeriodTooltipRef}>
                        {formatDate(firstInstance.appliesFrom)} -{' '}
                        {formatDate((lastInstance || firstInstance).appliesTo)} ({instance.workload}
                        %)
                    </span>
                </div>
            )}
            {showExternalId && (
                <div className={styles.externalId} ref={externalIdTooltipRef}>
                    {position.externalId}
                </div>
            )}
            {onExpand && position.totalChildCount > 0 && (
                <div className={styles.expandButton}>
                    <IconButton ref={directChildrenTooltipRef} onClick={onExpandHandler}>
                        <div className={styles.childPositionCount}>
                            {position.directChildCount}
                            <ExpandMoreIcon height={16} isExpanded={false} />
                        </div>
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default PositionInstanceComponent;
