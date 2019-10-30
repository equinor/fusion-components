import React, { useState, useEffect } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    usePersonDetails,
    PersonDetails,
    usePersonImageUrl,
} from '@equinor/fusion';

import { useTooltipRef } from '@equinor/fusion-components';
import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';
import RotationBadge from './RotationBadge';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails | PersonDetails[];
    size?: PhotoSize;
    hideTooltip?: boolean;
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

const hasMultiplePersons = (person: any): person is any[] => Array.isArray(person);

export default ({ personId, person, hideTooltip, size = 'medium' }: PersonPhotoProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails | PersonDetails[]>(
        getDefaultPerson()
    );

    const { imageUrl, error: imageError } = usePersonImageUrl(
        person && !hasMultiplePersons(person) ? person.azureUniqueId : personId || ''
    );

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
    ) : !hasMultiplePersons(currentPerson) ? (
        currentPerson.name
    ) : (
        <div>
            {currentPerson.map(person => (
                <>
                    <span>{person.name}</span>
                    <br />
                </>
            ))}
        </div>
    );
    const nameTooltipRef = useTooltipRef(toolTipContent);

    return (
        <div ref={nameTooltipRef} className={photoClassNames} style={imageStyle}>
            {(imageError !== null || hasMultiplePersons(personDetails)) && (
                <FallbackImage size={size} rotation={hasMultiplePersons(personDetails)} />
            )}
            {personDetails && !hasMultiplePersons(personDetails) && (
                <AccountTypeBadge
                    currentPerson={personDetails}
                    size={size}
                    hideTooltip={hideTooltip}
                />
            )}
            {hasMultiplePersons(personDetails) && (
                <RotationBadge
                    numberOfPersons={personDetails.length}
                    size={size}
                    hideTooltip={hideTooltip}
                />
            )}
        </div>
    );
};
