import { useRef, FC, ReactNode, useMemo } from 'react';

import { Position, PositionInstance, PersonDetails } from '@equinor/fusion';

// TODO: replace with FusionIcon
import { IconType } from '@equinor/fusion-wc-icon';

import {
    PersonPhoto,
    LinkIcon,
    styling,
    useTooltipRef,
    SyncIcon,
} from '@equinor/fusion-components';

import styles from '../styles.less';
import clsx from 'clsx';

type PositionPhotoIconProps = {
    position: Position;
    currentInstance?: PositionInstance;
    isLinked?: boolean;
    onClick?: (position: Position, instance: PositionInstance) => void;
    rotationInstances: PositionInstance[];
    personPhotoComponent?: ReactNode;
    showTaskOwner?: boolean;
    anonymize?: boolean;
    inline?: boolean;
    highlightTaskOwner?: boolean;
};

const PositionPhotoIcon: FC<PositionPhotoIconProps> = ({
    position,
    currentInstance,
    isLinked,
    rotationInstances,
    personPhotoComponent,
    showTaskOwner,
    anonymize,
    inline,
    highlightTaskOwner,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const taskOwnerRef = useTooltipRef('Task Owner', 'below');
    const linkedRef = useTooltipRef('Linked', 'below');
    const rotatingRef = useTooltipRef('Rotating', 'below');

    const isRotating = rotationInstances.length > 0;
    const isTaskOwner = position.isTaskOwner;

    const additionalPersons = rotationInstances.reduce(
        (previousPersons: PersonDetails[], instance) => {
            if (instance.assignedPerson) {
                return [...previousPersons, instance.assignedPerson];
            }
            return previousPersons;
        },
        []
    );
    const photoIconContainerStyles = clsx(styles.photoIconContainer, {
        [styles.inline]: inline,
    });
    const stateIconStyles = clsx(styles.stateIcons, {
        [styles.inline]: inline,
    });

    const displayIcons = useMemo(
        () => isTaskOwner || isLinked || isRotating || highlightTaskOwner,
        [isLinked, isTaskOwner, isRotating, highlightTaskOwner]
    );

    const showTaskOwnerIcon = useMemo(
        () => showTaskOwner && isTaskOwner && highlightTaskOwner,
        [showTaskOwner, isTaskOwner, highlightTaskOwner]
    );

    const showHighlightTaskowner = () => {
        return (
            <span ref={taskOwnerRef} className={styles.highligthTaskOwnerContainer}>
                <span className={styles.highligthTaskOwnerIcon}>
                    <fwc-icon type={IconType.EDS} icon="assignment_user"></fwc-icon>
                </span>
            </span>
        );
    };

    const showRegularTaskOwnerIcon = () => {
        return (
            <span ref={taskOwnerRef} className={styles.edsIcon}>
                <fwc-icon type={IconType.EDS} icon="assignment_user"></fwc-icon>
            </span>
        );
    };

    return (
        <div className={photoIconContainerStyles} ref={containerRef}>
            <div className={styles.personIconContainer}>
                {personPhotoComponent || (
                    <PersonPhoto
                        person={
                            !anonymize && currentInstance?.assignedPerson
                                ? currentInstance.assignedPerson
                                : undefined
                        }
                        additionalPersons={additionalPersons}
                        size={inline ? 'small' : 'large'}
                        key={currentInstance ? currentInstance.id : (+new Date()).toString()}
                        customTooltip={anonymize ? 'Anonymous' : undefined}
                    />
                )}
            </div>
            {displayIcons && (
                <div className={stateIconStyles}>
                    {showTaskOwnerIcon ? showHighlightTaskowner : showRegularTaskOwnerIcon}

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
