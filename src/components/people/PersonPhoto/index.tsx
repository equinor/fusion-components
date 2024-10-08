import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { useStyles } from './PersonPhoto.style';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    PersonDetails,
    usePersonImageUrl,
    PersonPresenceAvailability,
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
    customTooltip?: string;
};

export default ({
    personId,
    person,
    hideTooltip,
    hidePopover,
    size = 'medium',
    additionalPersons = [],
    presenceStatus,
    customTooltip,
}: PersonPhotoProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(null);
    const styles = useStyles();

    const id = useMemo(() => {
        if (person && additionalPersons.length === 0) return person.azureUniqueId;
        return personId || '';
    }, [person, additionalPersons, personId]);

    const { isFetching, imageUrl, error: imageError } = usePersonImageUrl(id);

    const { error, personDetails, isFetching: fetching } = usePeopleDetails(personId, person);

    useEffect(() => {
        if (!error && personDetails && !fetching) {
            setCurrentPerson(personDetails);
        } else if (error) {
            setCurrentPerson(null);
        }
    }, [error, personDetails, fetching]);

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

    const imageStyle = imageError === null ? { backgroundImage: `url(${imageUrl})` } : {};
    const tooltipContent = (
        <div>
            {[...additionalPersons, currentPerson].map((person: PersonDetails, index: number) => {
                return (
                    <Fragment key={index}>
                        <span>
                            {customTooltip
                                ? customTooltip
                                : person
                                ? person.name
                                : 'TBN: To Be Nominated'}
                        </span>
                        <br />
                    </Fragment>
                );
            })}
        </div>
    );

    const nameTooltipRef = useTooltipRef(tooltipContent);

    const popoverClassNames = classNames(styles.popoverDetails, {
        [styles.hidePopover]: hideTooltip,
    });

    const [popoverRef, _isOpen] = usePopoverRef<HTMLDivElement>(
        <PersonDetail person={currentPerson} />,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );

    const refCheck = () => {
        if (additionalPersons.length > 0 || !currentPerson || !!customTooltip) {
            return nameTooltipRef;
        } else {
            return popoverRef;
        }
    };
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
    );
};
