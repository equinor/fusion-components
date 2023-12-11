import { useRef, FC, ReactNode, useMemo } from 'react';

import { Position, PositionInstance, PersonDetails } from '@equinor/fusion';

import {
    PersonPhoto,
    LinkIcon,
    styling,
    useTooltipRef,
    SyncIcon,
    ErrorIcon,
} from '@equinor/fusion-components';

import styles from '../styles.less';
import clsx from 'clsx';
import TaskOwner from './TaskOwner';

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
    showPmt?: boolean;
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
    showPmt,
}) => {
    const isRotating = rotationInstances.length > 0;
    const isTaskOwner = position.isTaskOwner;
    const isPmt = position.isProjectManagementTeam && showPmt;

    //show pmt as warning if allowExternalProjectManagementTeam is not enabled but non employee is assigned regardless
    const pmtExternalWarning =
        isPmt &&
        !(position.properties as Record<string, unknown>).allowExternalProjectManagementTeam &&
        currentInstance.assignedPerson &&
        currentInstance.assignedPerson?.accountType !== 'Employee';

    const containerRef = useRef<HTMLDivElement>(null);
    const linkedRef = useTooltipRef('Linked', 'below');
    const rotatingRef = useTooltipRef('Rotating', 'below');

    const pmtTooltip = pmtExternalWarning ? (
        <p>
            {' '}
            PMT role is not enabled for external personnel on this position.
            <br /> You can turn on this setting while editing the position.{' '}
        </p>
    ) : (
        <p>
            Personell allocated to this position has PMT (Project Management Team) role,
            <br /> giving them access to restricted information.
        </p>
    );
    const pmtRef = useTooltipRef(pmtTooltip, 'below');

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
        () => isTaskOwner || isLinked || isRotating || isPmt,
        [isRotating, isTaskOwner, isLinked]
    );

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
                    {isTaskOwner && showTaskOwner && (
                        <TaskOwner highlightTaskOwner={highlightTaskOwner} inline={inline} />
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
                    {isPmt && (
                        <span ref={pmtRef}>
                            {pmtExternalWarning ? (
                                <div className={styles.pmtWarning}>
                                    <s className={styles.pmtText}>PMT</s>
                                    <ErrorIcon outline />{' '}
                                </div>
                            ) : (
                                <p className={styles.pmtText}>PMT</p>
                            )}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default PositionPhotoIcon;
