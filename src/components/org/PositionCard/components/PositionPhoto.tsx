import React, { useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import { Position, PositionInstance, useComponentDisplayClassNames } from '@equinor/fusion';
import {
    PeopleIcon,
    RelativeOverlayPortal,
    useClickOutsideOverlayPortal,
    PersonPhoto,
} from '@equinor/fusion-components';
import PositionInstanceComponent from './PositionInstance';

import styles from '../styles.less';

type PositionPhotoProps = {
    position: Position;
    currentInstance: PositionInstance;
    onClick?: (position: Position, instance: PositionInstance) => void;
};

const PositionPhoto: React.FC<PositionPhotoProps> = ({ position, currentInstance, onClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showInstancePopover, setShowInstancePopover] = useState(false);

    const hasMultipleInstances = position.instances.length > 1;

    const popoverClassNames = classNames(
        styles.context,
        styles.instancesPopover,
        useComponentDisplayClassNames(styles)
    );

    const toggleInstancePopover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setShowInstancePopover(prev => !prev);
        e.stopPropagation();
    }, []);

    const closeInstancePopover = useCallback(() => {
        setShowInstancePopover(false);
    }, []);

    useClickOutsideOverlayPortal(closeInstancePopover, containerRef.current);

    return (
        <div className={styles.photoContainer} ref={containerRef}>
            {hasMultipleInstances ? (
                <>
                    <div className={styles.personIconContainer} onClick={toggleInstancePopover}>
                        <PersonPhoto
                            personId={currentInstance.assignedPerson.azureUniqueId}
                            size='large'
                            affiliation={'affiliate'}
                        />
                        <div className={styles.instanceCount}>{position.instances.length}</div>
                    </div>
                    <RelativeOverlayPortal relativeRef={containerRef} show={showInstancePopover}>
                        <div className={popoverClassNames}>
                            {position.instances.map(instance => (
                                <div className={styles.instanceWrapper} key={instance.obs}>
                                    <div className={styles.personIconContainer}>
                                        <PersonPhoto
                                            personId={instance.assignedPerson.azureUniqueId}
                                            size='large'
                                            affiliation={'affiliate'}
                                        />
                                    </div>
                                    <PositionInstanceComponent
                                        instance={instance}
                                        position={position}
                                        showDate={false}
                                        showLocation={false}
                                        showExternalId
                                        onClick={onClick}
                                    />
                                </div>
                            ))}
                        </div>
                    </RelativeOverlayPortal>
                </>
            ) : (
                <div className={styles.personIconContainer}>
                    <PersonPhoto
                        personId={currentInstance.assignedPerson.azureUniqueId}
                        size='large'
                        affiliation={'affiliate'}
                    />
                </div>
            )}
        </div>
    );
};

export default PositionPhoto;
