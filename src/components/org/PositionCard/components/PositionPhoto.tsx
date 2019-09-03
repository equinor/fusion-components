import React, { useRef } from 'react';
import { Position, PositionInstance } from '@equinor/fusion';
import {
    PersonPhoto,
} from '@equinor/fusion-components';

import styles from '../styles.less';

type PositionPhotoProps = {
    position: Position;
    currentInstance?: PositionInstance;
    onClick?: (position: Position, instance: PositionInstance) => void;
};

const PositionPhoto: React.FC<PositionPhotoProps> = ({ currentInstance }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.photoContainer} ref={containerRef}>
            <div className={styles.personIconContainer}>
                <PersonPhoto
                    person={currentInstance ? currentInstance.assignedPerson : undefined}
                    size='large'
                />
            </div>
        </div>
    );
};

export default PositionPhoto;
