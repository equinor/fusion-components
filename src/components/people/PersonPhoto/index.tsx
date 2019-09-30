import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useFusionContext,
    useComponentDisplayClassNames,
    usePersonDetails,
    PersonDetails,
    usePersonImageUrl,
} from '@equinor/fusion';

import { useTooltipRef } from '@equinor/fusion-components';
import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
    hideTooltip?: boolean;
};

const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No name',
    mail: 'noname@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'Employee',
    company: { id: 'id', name: 'name' },
});

export default ({ personId, person, hideTooltip, size = 'medium' }: PersonPhotoProps) => {
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());

    const { imageUrl, error: imageError } = usePersonImageUrl(person ? person.azureUniqueId : personId || "");

    const { error, personDetails } = personId ? usePersonDetails(personId) : { error: null, personDetails: person };

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
    const nameTooltipRef = useTooltipRef(hideTooltip ? '' : currentPerson.name);

    return (
        <div ref={nameTooltipRef} className={photoClassNames} style={imageStyle}>
            {imageError !== null && <FallbackImage size={size} />}
            <AccountTypeBadge
                currentPerson={personDetails || getDefaultPerson()}
                size={size}
                hideTooltip={hideTooltip}
            />
        </div>
    );
};
