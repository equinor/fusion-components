import React, { useCallback } from 'react';
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

const PositionCard: React.FC<PositionCardProps> = ({
    position,
    isSelected,
    showExternalId,
    showLocation,
    showDate,
    onClick,
}) => {
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

    // TODO: Get current instance somehow
    const currentInstance = position.instances[0];
    const onClickHandler = useCallback(() => {
        onClick(position, currentInstance);
    }, [position, currentInstance, onClick]);

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionPhoto position={position} currentInstance={currentInstance} />
            <PositionInstanceComponent
                position={position}
                instance={currentInstance}
                showLocation={showLocation}
                showDate={showDate}
                showExternalId={showExternalId}
            />
        </div>
    );
};

export default PositionCard;
