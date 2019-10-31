import React, { useRef } from 'react';
import { Position, PositionInstance } from '@equinor/fusion';
import { PersonPhoto, LinkIcon, styling, useTooltipRef } from '@equinor/fusion-components';

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
    
    const personsDetails = currentInstance
        ? rotationInstances.length > 0
            ? [currentInstance.assignedPerson, ...rotationInstances.map(i => i.assignedPerson)]
            : currentInstance.assignedPerson
        : undefined;

    return (
        <div className={styles.photoIconContainer} ref={containerRef}>
            <div className={styles.personIconContainer}>
                <PersonPhoto person={personsDetails} size="large" />
            </div>
            {isLinked && (
                <div className={styles.linkedIcon} ref={linkedRef}>
                    <LinkIcon color={styling.colors.blackAlt2} height={16} width={16} />
                </div>
            )}
        </div>
    );
};

export default PositionPhotoIcon;
