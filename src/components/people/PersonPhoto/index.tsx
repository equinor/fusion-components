import React, { useState, useEffect, Fragment, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    PersonDetails as PersonDetailsType,
    usePersonImageUrl,
    PersonPresenceAvailability,
    PersonPresence,
} from '@equinor/fusion';

import { useTooltipRef, usePopoverRef } from '@equinor/fusion-components';
import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';
import RotationBadge from './RotationBadge';
import PersonDetails from '../PersonDetails';
import { SkeletonDisc } from '../../feedback/Skeleton';
import PersonPresenceIcon from './PersonPresenceIcon';
import AccountTypeIcon from './AccountTypeIcon';
import usePeopleDetails from '../usePeopleDetails';
import usePresence from '../usePresence';

export { PersonPresenceIcon, AccountTypeIcon };

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetailsType;
    size?: PhotoSize;
    hideTooltip?: boolean;
    additionalPersons?: PersonDetailsType[];
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
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const id = person && additionalPersons.length === 0 ? person.azureUniqueId : personId || '';
    const personInfo = person ? { person: person } : { id: personId };

    const { isFetching, imageUrl, error: imageError } = usePersonImageUrl(id);
    const { error, personDetails, isFetching: isFetchingPeople } = usePeopleDetails(personInfo);
    const { isFetchingPresence, presence, presenceError } = usePresence(personInfo, isPopoverOpen);
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
            {[...additionalPersons, personDetails].map(
                (person: PersonDetailsType, index: number) => {
                    return (
                        <Fragment key={index}>
                            <span>{person ? person.name : 'TBN: To Be Nominated'}</span>
                            <br />
                        </Fragment>
                    );
                }
            )}
        </div>
    );
    const nameTooltipRef = useTooltipRef(tooltipContent);
    const popoverContent = !isFetchingPeople && (
        <PersonDetails
            person={personDetails}
            presence={presence}
            isFetching={isFetchingPeople}
            isFetchingPresence={isFetchingPresence}
        />
    );
    const [popoverRef, isOpen] = usePopoverRef<HTMLDivElement>(
        popoverContent,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );
    const refCheck = () => {
        if (additionalPersons.length > 0 || !personDetails) {
            return nameTooltipRef;
        } else {
            return popoverRef;
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsPopoverOpen(true);
        } else {
            setIsPopoverOpen(false);
        }
    }, [isOpen]);

    if (isFetching || isFetchingPeople) {
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
