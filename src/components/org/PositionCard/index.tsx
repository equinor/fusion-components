import React from 'react';
import classNames from 'classnames';
import { Position, useComponentDisplayClassNames } from '@equinor/fusion';
import { useElevationClassName } from '@equinor/fusion-components';

import styles from './styles.less';
import PositionPhoto from './components/PositionPhoto';
import PositionInstance from './components/PositionInstance';

type PositionCardProps = {
    position: Position;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    onClick?: () => void;
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
        styles.container,
        useComponentDisplayClassNames(styles),
        useElevationClassName(2),
        {
            [styles.isSelected]: isSelected,
        }
    );

    // TODO: Get current instance somehow
    const currentInstance = position.instances[0];

    return (
        <div className={containerClassNames} onClick={onClick}>
            <PositionPhoto instances={position.instances} currentInstance={currentInstance} />
            <PositionInstance
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
