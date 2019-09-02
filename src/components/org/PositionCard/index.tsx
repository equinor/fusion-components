import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import {
    Position,
    useComponentDisplayClassNames,
    PositionInstance,
    useComponentDisplayType,
} from '@equinor/fusion';

import styles from './styles.less';
import PositionPhoto from './components/PositionPhoto';
import PositionInstanceComponent from './components/PositionInstance';

type PositionCardProps = {
    position: Position;
    instance: PositionInstance;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
    onExpand?: (position: Position, instance: PositionInstance) => void;
};

const PositionCard: React.FC<PositionCardProps> = ({
    position,
    instance,
    isSelected,
    showExternalId,
    showLocation,
    showDate,
    onClick,
    onExpand,
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

    const onClickHandler = useCallback(() => {
        if (onClick) {
            onClick(position, instance);
        }
    }, [position, instance, onClick]);

    const componentDisplayType = useComponentDisplayType();

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionPhoto position={position} currentInstance={instance} onClick={onClick} />
            <PositionInstanceComponent
                position={position}
                instance={instance}
                showLocation={showLocation && componentDisplayType !== 'Compact'}
                showDate={showDate && componentDisplayType !== 'Compact'}
                showExternalId={showExternalId}
                onClick={onClick}
                onExpand={onExpand}
            />
        </div>
    );
};

export default PositionCard;
