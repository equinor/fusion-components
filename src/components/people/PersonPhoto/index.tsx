import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    usePersonDetails,
    PersonDetails,
    usePersonImageUrl,
} from '@equinor/fusion';

import { useTooltipRef, usePopoverRef } from '@equinor/fusion-components';
import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';
import RotationBadge from './RotationBadge';
import PersonDetail from '../PersonDetail';
import { SkeletonDisc } from '../../feedback/Skeleton';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
    hideTooltip?: boolean;
    additionalPersons?: PersonDetails[];
    hidePopover?: boolean;
};

const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No person assigned',
    mail: 'noname@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'Employee',
    company: { id: 'id', name: 'name' },
});

export default ({
    personId,
    person,
    hideTooltip,
    hidePopover,
    size = 'medium',
    additionalPersons = [],
}: PersonPhotoProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());

    const id = person && additionalPersons.length === 0 ? person.azureUniqueId : personId || '';

    const { isFetching, imageUrl, error: imageError } = usePersonImageUrl(id);

    const { error, personDetails } = personId
        ? usePersonDetails(personId)
        : { error: null, personDetails: person };

    useEffect(() => {
        if (!error && personDetails) {
            setCurrentPerson(personDetails);
        } else if (error) {
            setCurrentPerson(getDefaultPerson());
        }
    }, [error, personDetails]);

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
    const toolTipContent = hideTooltip ? (
        ''
    ) : additionalPersons.length > 0 ? (
        <div>
            {[...additionalPersons, currentPerson].map(person => (
                <>
                    <span>{person ? person.name : 'TBN'}</span>
                    <br />
                </>
            ))}
        </div>
    ) : currentPerson ? (
        currentPerson.name
    ) : (
        'TBN'
    );
    const nameTooltipRef = useTooltipRef(toolTipContent);

    const popoverClassNames = classNames(styles.popoverDetails, {
        [styles.hidePopover]: hideTooltip,
    });

    const PopoverContent = () => (
        <>
            {additionalPersons.length > 0 ? (
                <div>
                    {[...additionalPersons, currentPerson].map(person => (
                        <>
                            <span>{person.name}</span>
                            <br />
                        </>
                    ))}
                </div>
            ) : (
                <PersonDetail person={currentPerson} />
            )}
        </>
    );

    const [popoverRef, isOpen] = usePopoverRef<HTMLDivElement>(
        <PopoverContent />,
        {
            justify: 'start', // start = "left" | middle = "center" | end = "right"
            placement: 'below', // start = "top" | middle = "center" | end = "bottom"
        },
        true,
        500
    );

    if (isFetching) {
        return (
            <div className={photoClassNames}>
                <SkeletonDisc size={size} />
            </div>
        );
    }

    return (
        <div
            ref={hidePopover ? undefined : popoverRef}
            className={photoClassNames}
            style={imageStyle}
        >
            <div ref={hideTooltip ? undefined : nameTooltipRef}>
                <div className={popoverClassNames}>
                    {(imageError !== null || additionalPersons.length > 0 || !id) && (
                        <FallbackImage size={size} rotation={additionalPersons.length > 0} />
                    )}
                    {personDetails && additionalPersons.length === 0 && (
                        <AccountTypeBadge
                            currentPerson={personDetails}
                            size={size}
                            hideTooltip={hideTooltip}
                        />
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
