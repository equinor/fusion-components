import React, { useRef } from 'react';
import { Position, PositionInstance, PersonDetails } from '@equinor/fusion';

import styles from '../styles.less';
import useTooltipRef from 'hooks/useTooltipRef';
import PersonPhoto from 'components/people/PersonPhoto';
import LinkIcon from 'components/icons/components/wysiwyg/LinkIcon';
import styling from 'styles/styling';
import SyncIcon from 'components/icons/components/notification/SyncIcon';

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

    const additionalPersons = rotationInstances.reduce(
        (previousPersons: PersonDetails[], instance) => {
            if (instance.assignedPerson) {
                return [...previousPersons, instance.assignedPerson];
            }
            return previousPersons;
        },
        []
    );
    return (
        <div className={styles.photoIconContainer} ref={containerRef}>
            <div className={styles.personIconContainer}>
                <PersonPhoto
                    person={(currentInstance && currentInstance.assignedPerson) || undefined}
                    additionalPersons={additionalPersons}
                    size="large"
                    key={currentInstance ? currentInstance.id : (+new Date()).toString()}
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
                            <SyncIcon color={styling.colors.blackAlt2} height={16} width={16} />
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default PositionPhotoIcon;
