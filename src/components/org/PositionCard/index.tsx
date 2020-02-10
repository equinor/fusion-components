import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Position, useComponentDisplayClassNames, PositionInstance } from '@equinor/fusion';

import styles from './styles.less';
import PositionIconPhoto from './components/PositionIconPhoto';
import PositionInstanceComponent from './components/PositionInstance';
import { useCurrentInstance } from './hooks';

type PositionCardProps = {
    position: Position;
    instance?: PositionInstance;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    showObs: boolean;
    showTimeline: boolean;
    isFuture?: boolean;
    isPast?: boolean;
    isLinked?: boolean;
    childCount?: number;
    selectedDate?: Date;
    onClick?: (position: Position, instance?: PositionInstance) => void;
    onExpand?: (position: Position, instance?: PositionInstance) => void;
};

const PositionCard: React.FC<PositionCardProps> = ({
    position,
    instance,
    isSelected,
    showExternalId,
    showLocation,
    showDate,
    showObs,
    showTimeline,
    onClick,
    onExpand,
    isFuture,
    isPast,
    isLinked,
    childCount,
    selectedDate,
}) => {
    const isExternalHire =
        instance &&
        instance.assignedPerson &&
        instance.assignedPerson.jobTitle &&
        instance.assignedPerson.jobTitle.toLowerCase().startsWith('ext');
    const isExternal =
        instance && instance.assignedPerson && instance.assignedPerson.accountType === 'External';
    const isConsultant =
        instance && instance.assignedPerson && instance.assignedPerson.accountType === 'Consultant';

    const containerClassNames = classNames(
        styles.context,
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isSelected]: isSelected,
            [styles.isClickable]: !!onClick,
            [styles.isExternal]: isExternal,
            [styles.isConsultant]: isConsultant,
            [styles.isExternalHire]: isExternalHire,
            [styles.isLinked]: isLinked,
            [styles.futurePosition]: isFuture,
            [styles.pastPosition]: isPast,
        }
    );

    const onClickHandler = useCallback(() => {
        if (onClick) {
            onClick(position, instance);
        }
    }, [position, instance, onClick]);

    const currentInstance = useCurrentInstance(position.instances || [], instance, selectedDate);

    const current: PositionInstance | undefined = currentInstance || undefined;
    const rotatingInstances: PositionInstance[] =
        currentInstance && currentInstance.rotatingInstances
            ? currentInstance.rotatingInstances
            : [];

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionIconPhoto
                position={position}
                currentInstance={current}
                isLinked={isLinked}
                onClick={onClick}
                rotationInstances={rotatingInstances}
            />
            <PositionInstanceComponent
                position={position}
                instance={current}
                showLocation={showLocation}
                showDate={showDate}
                showExternalId={showExternalId}
                showObs={showObs}
                showTimeline={showTimeline}
                onClick={onClick}
                onExpand={onExpand}
                childCount={childCount}
                rotationInstances={rotatingInstances}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default PositionCard;
