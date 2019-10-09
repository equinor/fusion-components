import React, { useRef } from 'react';
import { Position, PositionInstance } from '@equinor/fusion';
import { PersonPhoto, LinkIcon, styling } from '@equinor/fusion-components';

import styles from '../styles.less';

type PositionPhotoIconProps = {
    position: Position;
    currentInstance?: PositionInstance;
    isLinked?: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
};

const PositionPhotoIcon: React.FC<PositionPhotoIconProps> = ({ currentInstance, isLinked }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.photoIconContainer} ref={containerRef}>
            <div className={styles.personIconContainer}>
                <PersonPhoto
                    person={currentInstance ? currentInstance.assignedPerson : undefined}
                    size="large"
                />
            </div>
            <div className={styles.linkedIcon}>
                {isLinked && <LinkIcon color={styling.colors.blackAlt2} height={16} width={16} />}
            </div>
        </div>
    );
};

export default PositionPhotoIcon;
