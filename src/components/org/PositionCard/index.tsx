import React from 'react';
import classNames from 'classnames';
import {
    Position,
    useComponentDisplayClassNames,
    formatDate,
    PositionInstance,
} from '@equinor/fusion';
import { useElevationClassName, PeopleIcon } from '@equinor/fusion-components';

import styles from './styles.less';

type PositionCardProps = {
    position: Position;
    isSelected?: boolean;
    showExternalId: boolean;
    showLocation: boolean;
    showDate: boolean;
    onClick?: () => void;
};

type PositionInstanceProps = {
    instance: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
};

const PositionInstance: React.FC<PositionInstanceProps> = ({
    instance,
    showLocation,
    showDate,
}) => {
    return (
        <div className={styles.instance}>
            <div className={styles.assignedPersonName}>Assigned person name</div>
            {showLocation && <div className={styles.location}>{instance.location.name}</div>}
            {showDate && (
                <div className={styles.period}>
                    {formatDate(new Date(instance.appliesFrom))} -{' '}
                    {formatDate(new Date(instance.appliesTo))}
                </div>
            )}
        </div>
    );
};

type PositionPhotoProps = {
    instances: PositionInstance[];
    currentInstance: PositionInstance;
};

const PositionPhoto: React.FC<PositionPhotoProps> = ({ instances }) => {
    const hasMultipleInstances = instances.length > 1;
    return (
        <div className={styles.photoContainer}>
            {hasMultipleInstances ? (
                <div className={styles.personIconContainer}>
                    <PeopleIcon />
                    <div className={styles.instanceCount}>{instances.length}</div>
                </div>
            ) : (
                <div>Photo</div>
            )}
        </div>
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
            <div className={styles.positionDetails}>
                <div className={styles.basePositionName}>{position.basePosition.name}</div>
                <div className={styles.positionName}>{position.name}</div>
                <PositionInstance
                    instance={currentInstance}
                    showLocation={showLocation}
                    showDate={showDate}
                />
                {showExternalId && <div className={styles.externalId}>{position.externalId}</div>}
            </div>
        </div>
    );
};

export default PositionCard;
