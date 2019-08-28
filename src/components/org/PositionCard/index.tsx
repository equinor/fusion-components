import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Position, useComponentDisplayClassNames, PositionInstance } from '@equinor/fusion';

import styles from './styles.less';
import PositionPhoto from './components/PositionPhoto';
import PositionInstanceComponent from './components/PositionInstance';

type PositionCardProps = {
    position: Position;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
};

const getCurrentInstance = (position: Position) => {
    const now = new Date().getTime();
    return (
        position.instances.find(instance => {
            const from = new Date(instance.appliesFrom).getTime();
            const to = new Date(instance.appliesTo).getTime();
            return now >= from && to >= now;
        }) || position.instances[0]
    );
};

const PositionCard: React.FC<PositionCardProps> = ({
    position,
    isSelected,
    showExternalId,
    showLocation,
    showDate,
    onClick,
}) => {
    const currentInstance = useMemo(() => getCurrentInstance(position), [position]);

    const containerClassNames = classNames(
        styles.context,
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.isSelected]: isSelected,
            [styles.isClickable]: !!onClick,
            [styles.multipleAssignments]: position.instances.length > 1,
        }
    );

    const onClickHandler = useCallback(() => {
        if (onClick) {
            onClick(position, currentInstance);
        }
    }, [position, currentInstance, onClick]);

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionPhoto
                position={position}
                currentInstance={currentInstance}
                onClick={onClick}
            />
            <PositionInstanceComponent
                position={position}
                instance={currentInstance}
                showLocation={showLocation}
                showDate={showDate}
                showExternalId={showExternalId}
                onClick={onClick}
            />
        </div>
    );
};

export default PositionCard;
