import { useCallback, FC, MouseEvent, useMemo } from 'react';

import { formatDate, Position, PositionInstance } from '@equinor/fusion';
import classNames from 'classnames';
import styles from '../styles.less';
import {
    useTooltipRef,
    ExpandMoreIcon,
    IconButton,
    InlinePositionTimeline,
} from '@equinor/fusion-components';
import { ChildCountTypeKey, childCountTypeNameMapping } from '..';

type PositionInstanceProps = {
    position: Position;
    instance?: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
    showObs: boolean;
    obsProp: 'organisation' | 'obs';
    showTimeline: boolean;
    showExternalId: boolean;
    onClick?: (position: Position, instance?: PositionInstance) => void;
    onExpand?: (position: Position, instance?: PositionInstance) => void;
    childCount?: number;
    childCountType?: ChildCountTypeKey;
    rotationInstances: PositionInstance[];
    selectedDate?: Date;
    anonymize?: boolean;
};

const PositionInstanceComponent: FC<PositionInstanceProps> = ({
    position,
    instance,
    showLocation,
    showDate,
    showExternalId,
    showObs,
    obsProp = 'obs',
    showTimeline,
    onClick,
    onExpand,
    childCount,
    childCountType,
    rotationInstances,
    selectedDate,
    anonymize,
}) => {
    const assignedPersonName = useMemo(() => {
        if (anonymize) return '';
        if (!instance?.assignedPerson) return 'TBN - To Be Nominated';
        if (rotationInstances.length > 0) {
            return `${rotationInstances.length + 1} assignees`;
        }
        return instance.assignedPerson.name;
    }, [anonymize, instance, rotationInstances]);

    const locationName =
        instance && instance.location && instance.location.name ? instance.location.name : 'TBN';

    let obs: string;
    if (obsProp === 'obs')
        obs = instance && instance.obs && instance.obs !== '' ? instance.obs : 'N/A';
    else if (obsProp === 'organisation')
        obs =
            instance && instance.organisation && instance.organisation.name
                ? instance.organisation.name
                : 'N/A';

    const childrenTooltipName = childCountTypeNameMapping[childCountType] || 'positions';

    const obsTooltipRef = useTooltipRef(`OBS: ${obs}`, 'below');
    const positionNameTooltipRef = useTooltipRef('Position: ' + position.name, 'below');
    const assignedPersonNameTooltipRef = useTooltipRef(
        `Person: ${anonymize ? 'Anonymous' : assignedPersonName}`,
        'below'
    );
    const currentPeriodTooltipRef = useTooltipRef('Current period', 'below');
    const childrenTooltipRef = useTooltipRef(
        childCountType !== 'hidden' ? `${childCount} ${childrenTooltipName}` : '',
        'above'
    );
    const externalIdTooltipRef = useTooltipRef('External ID: ' + position.externalId, 'below');

    const positionInstanceClasses = classNames(styles.positionInstance, {
        [styles.cropPositionName]: !showObs || (showObs && !showLocation && !showDate),
    });

    const onClickHandler = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (onClick) {
                e.stopPropagation();
                onClick(position, instance);
            }
        },
        [position, instance, onClick]
    );

    const onExpandHandler = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (onExpand) {
                e.stopPropagation();
                onExpand(position, instance);
            }
        },
        [position, instance, onExpand]
    );

    const instances = position ? position.instances : [];

    return (
        <div className={positionInstanceClasses} onClick={onClickHandler}>
            {showObs && instance && (
                <div className={styles.basePositionName}>
                    <span ref={obsTooltipRef}>{obs}</span>
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
                        {formatDate(instance.appliesFrom)} - {formatDate(instance.appliesTo)} (
                        {instance.workload}
                        %)
                    </span>
                </div>
            )}
            {showExternalId && (
                <div className={styles.externalId} ref={externalIdTooltipRef}>
                    {position.externalId}
                </div>
            )}
            {onExpand && childCount !== undefined && (
                <div className={styles.expandButton}>
                    <IconButton ref={childrenTooltipRef} onClick={onExpandHandler}>
                        <div className={styles.childPositionCount}>
                            {childCountType !== 'hidden' && childCount !== 0
                                ? childCount
                                : undefined}
                            <ExpandMoreIcon height={16} isExpanded={false} />
                        </div>
                    </IconButton>
                </div>
            )}
            {showTimeline && instances.length > 0 && (
                <div className={styles.positionTimeline}>
                    <InlinePositionTimeline
                        selectedPosition={position}
                        initialDate={selectedDate}
                        size="small"
                    />
                </div>
            )}
        </div>
    );
};

export default PositionInstanceComponent;
