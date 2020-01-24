import React from 'react';
import styles from './styles.less';
import { PersonPosition, formatDate } from '@equinor/fusion';
import { OpenInNewIcon } from '@equinor/fusion-components';

type PersonPositionCardProps = {
    position: PersonPosition;
    shouldShowIcon?: boolean;
};
const PersonPositionCard: React.FC<PersonPositionCardProps> = ({ position, shouldShowIcon }) => {
    return (
        <div className={styles.positionCard}>
            <h5>{position.project.name}</h5>
            <p className={styles.personPositionName}>{position.name}</p>
            <small className={styles.appliesFromTo}>
                {position.appliesFrom ? formatDate(position.appliesFrom) : 'N/A'}
                {' - '}
                {position.appliesTo ? formatDate(position.appliesTo) : 'N/A'} ({position.workload}%)
            </small>
            {shouldShowIcon && (
                <div className={styles.openInNewIcon}>
                    <OpenInNewIcon width={16} height={16} />
                </div>
            )}
        </div>
    );
};

export default PersonPositionCard;
