import React, { useRef } from 'react';
import { Position, PositionInstance } from '@equinor/fusion';
import {
    PersonPhoto,
    LinkIcon,
    styling,
    useTooltipRef,
    PlatformIcon,
} from '@equinor/fusion-components';

import styles from '../styles.less';

type PositionPhotoIconProps = {
    position: Position;
    currentInstance?: PositionInstance;
    isLinked?: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
    rotationInstances: PositionInstance[];
};

const PositionPhotoIcon: React.FC<PositionPhotoIconProps> = ({
    currentInstance,
    isLinked,
    rotationInstances,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const linkedRef = useTooltipRef('Linked', 'below');
    const rotatingRef = useTooltipRef('Rotating', 'below');

    const isRotating = rotationInstances.length > 0;

  
    return (
        <div className={styles.photoIconContainer} ref={containerRef}>
            <div className={styles.personIconContainer}>
                <PersonPhoto
                    person={currentInstance && currentInstance.assignedPerson}
                    additionalPersons={rotationInstances.map(instance => instance.assignedPerson)}
                    size="large"
                />
            </div>
            {(isLinked || isRotating) && (
                <div className={styles.stateIcon}>
                    {isLinked && (
                        <span ref={linkedRef}>
                            <LinkIcon color={styling.colors.blackAlt2} height={16} width={16} />
                        </span>
                    )}
                    {isRotating && (
                        <span ref={rotatingRef}>
                            <PlatformIcon color={styling.colors.blackAlt2} height={16} width={16} />{' '}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default PositionPhotoIcon;
