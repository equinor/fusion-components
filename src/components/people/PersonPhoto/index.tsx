import React, { useState, useEffect, Fragment } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    PersonDetails,
    usePersonImageUrl,
    PersonPresenceAvailability,
    PersonPresence,
} from '@equinor/fusion';

import { useTooltipRef, usePopoverRef } from '@equinor/fusion-components';
import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';
import RotationBadge from './RotationBadge';
import PersonDetail from '../PersonDetail';
import { SkeletonDisc } from '../../feedback/Skeleton';
import PersonPresenceIcon from './PersonPresenceIcon';
import AccountTypeIcon from './AccountTypeIcon';
import usePeopleDetails from '../usePeopleDetails';
import usePresence from '../usePresence';

export { PersonPresenceIcon, AccountTypeIcon };

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
    hideTooltip?: boolean;
    additionalPersons?: PersonDetails[];
    hidePopover?: boolean;
    presenceStatus?: PersonPresenceAvailability;
};

export default ({
    personId,
    person,
    hideTooltip,
    hidePopover,
    size = 'medium',
    additionalPersons = [],
    presenceStatus,
}: PersonPhotoProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(null);
    const [currentPresence, setCurrentPresence] = useState<PersonPresence>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const id = person && additionalPersons.length === 0 ? person.azureUniqueId : personId || '';

    const { isFetching, imageUrl, error: imageError } = usePersonImageUrl(id);
    const { error, personDetails, isFetching: fetching } = usePeopleDetails(
        person ? { person } : { id: personId }
    );
    const { presence, isFetchingPresence, presenceError } = usePresence(id, isPopoverOpen);
    const imageStyle = imageError === null ? { backgroundImage: `url(${imageUrl})` } : {};

    const photoClassNames = classNames(
        styles.photoContainer,
        useComponentDisplayClassNames(styles),
        {
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
        }
    );
    const popoverClassNames = classNames(styles.popoverDetails, {
        [styles.hidePopover]: hideTooltip,
    });

    const tooltipContent = (
        <div>
            {[...additionalPersons, currentPerson].map((person: PersonDetails, index: number) => {
                return (
                    <Fragment key={index}>
                        <span>{person ? person.name : 'TBN: To Be Nominated'}</span>
                        <br />
                    </Fragment>
                );
            })}
        </div>
    );

    const nameTooltipRef = useTooltipRef(tooltipContent);

    const [popoverRef, isOpen] = usePopoverRef<HTMLDivElement>(
        <PersonDetail person={currentPerson} presence={presence} />,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );
    const refCheck = () => {
        if (additionalPersons.length > 0 || !currentPerson) {
            return nameTooltipRef;
        } else {
            return popoverRef;
        }
    };

    useEffect(() => {
        if (!error && personDetails && !fetching) {
            setCurrentPerson(personDetails);
        } else if (error) {
            setCurrentPerson(null);
        }
    }, [error, personDetails, fetching]);

    useEffect(() => {
        if (!presenceError && !isFetchingPresence && presence) {
            setCurrentPresence(presence);
        }
    }, [presenceError, isFetchingPresence, presence]);

    useEffect(() => {
        if (isOpen) {
            setIsPopoverOpen(true);
        } else {
            setIsPopoverOpen(false);
        }
    }, [isOpen]);

    if (isFetching) {
        return (
            <div className={photoClassNames}>
                <SkeletonDisc size={size} />
            </div>
        );
    }

    return (
        <div
            ref={hidePopover ? undefined : refCheck()}
            className={photoClassNames}
            style={imageStyle}
        >
            <div>
                <div className={popoverClassNames}>
                    {(imageError !== null || additionalPersons.length > 0 || !id) && (
                        <FallbackImage size={size} rotation={additionalPersons.length > 0} />
                    )}
                    {personDetails && additionalPersons.length === 0 && (
                        <AccountTypeBadge currentPerson={personDetails} size={size} />
                    )}
                    {additionalPersons.length > 0 && (
                        <RotationBadge
                            numberOfPersons={additionalPersons.length + 1}
                            size={size}
                            hideTooltip={hideTooltip}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
