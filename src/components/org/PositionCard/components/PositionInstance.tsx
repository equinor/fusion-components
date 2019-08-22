import React from 'react';
import { formatDate, PositionInstance } from '@equinor/fusion';

import styles from './styles.less';

type PositionInstanceProps = {
    instance: PositionInstance;
    showLocation: boolean;
    showDate: boolean;
};

const PositionInstanceComponent: React.FC<PositionInstanceProps> = ({
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

export default PositionInstanceComponent;
