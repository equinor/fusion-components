import { useRef, FC } from 'react';

import { Position, PositionInstance, PersonDetails } from '@equinor/fusion';
import {
    PersonPhoto,
    LinkIcon,
    styling,
    useTooltipRef,
    SyncIcon,
    PeopleIcon
} from '@equinor/fusion-components';

import styles from '../styles.less';

type PositionPhotoIconProps = {
    position: Position;
    currentInstance?: PositionInstance;
    isLinked?: boolean;
    isTaskOwner?: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
    rotationInstances: PositionInstance[];
};

const PositionPhotoIcon: FC<PositionPhotoIconProps> = ({
    currentInstance,
    isLinked,
    isTaskOwner,
    rotationInstances,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const taskOwnerRef = useTooltipRef('Task Owner', 'below');
    const linkedRef = useTooltipRef('Linked', 'below');
    const rotatingRef = useTooltipRef('Rotating', 'below');

    const isRotating = rotationInstances.length > 0;
    console.log(currentInstance);
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
            {(isTaskOwner || isLinked || isRotating) && (
                <div className={styles.stateIcons}>
                    {isTaskOwner && (
                        <span ref={taskOwnerRef}>
                            <PeopleIcon color={styling.colors.blackAlt2} height={16} width={16} />
                        </span>
                    )}
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
