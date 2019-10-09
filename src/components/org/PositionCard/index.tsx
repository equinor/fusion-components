import React, { useCallback } from 'react';
import classNames from 'classnames';
import {
    Position,
    useComponentDisplayClassNames,
    PositionInstance,
} from '@equinor/fusion';

import styles from './styles.less';
import PositionPhoto from './components/PositionPhoto';
import PositionInstanceComponent from './components/PositionInstance';

type PositionCardProps = {
    position: Position;
    instance?: PositionInstance;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    showObs: boolean;
    isLinked?: boolean;
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
    onClick,
    onExpand,
    isLinked,
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
        }
    );

    const onClickHandler = useCallback(() => {
        if (onClick) {
            onClick(position, instance);
        }
    }, [position, instance, onClick]);

    return (
        <div className={containerClassNames} onClick={onClickHandler}>
            <PositionPhoto position={position} currentInstance={instance} onClick={onClick} />
            <PositionInstanceComponent
                position={position}
                instance={instance}
                showLocation={showLocation}
                showDate={showDate}
                showExternalId={showExternalId}
                showObs={showObs}
                onClick={onClick}
                onExpand={onExpand}
                isLinked={isLinked}
            />
        </div>
    );
};

export default PositionCard;
