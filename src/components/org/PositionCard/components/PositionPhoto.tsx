import React from 'react';
import { PositionInstance } from '@equinor/fusion';
import { PeopleIcon } from '@equinor/fusion-components';

import styles from '../styles.less';

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

export default PositionPhoto;
