import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Position, useComponentDisplayClassNames, PositionInstance } from '@equinor/fusion';

import styles from './styles.less';
import PositionIconPhoto from './components/PositionIconPhoto';
import PositionInstanceComponent from './components/PositionInstance';

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

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionIconPhoto
                position={position}
                currentInstance={instance}
                isLinked={isLinked}
                onClick={onClick}
            />
            <PositionInstanceComponent
                position={position}
                instance={instance}
                showLocation={showLocation}
                showDate={showDate}
                showExternalId={showExternalId}
                showObs={showObs}
                showTimeline={showTimeline}
                onClick={onClick}
                onExpand={onExpand}
                childCount={childCount}
            />
        </div>
    );
};

export default PositionCard;
