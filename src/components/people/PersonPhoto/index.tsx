import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useFusionContext,
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
    usePersonDetails,
    PersonDetails,
} from '@equinor/fusion';
import ConsultantIcon from './icons/ConsultantIcon';
import ExternalHireIcon from './icons/ExternalHireIcon';
import AffiliateIcon from './icons/AffiliateIcon';
import FallbackIcon from './icons/FallbackIcon';

import { useTooltipRef } from '@equinor/fusion-components';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
    hideTooltip?: boolean;
};

const getIconSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 16 : 24,
    large: isCompact ? 8 : 16,
    medium: isCompact ? 8 : 16,
    small: isCompact ? 8 : 12,
});

const getFallbackImageSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 48 : 56,
    large: isCompact ? 32 : 40,
    medium: isCompact ? 24 : 32,
    small: isCompact ? 16 : 24,
});

const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No name',
    mail: 'noname@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'consultant',
    company: { id: 'id', name: 'name' },
});

type FallbackImageProps = {
    size: PhotoSize;
};

const FallbackImage = ({ size }: FallbackImageProps) => {
    const displayType = useComponentDisplayType();
    const sizes = getFallbackImageSizes(displayType === ComponentDisplayType.Compact);

    return (
        <FallbackIcon
            width={sizes[size]}
            height={sizes[size]}
            {...{
                viewBox: `0 0 ${sizes.xlarge} ${sizes.xlarge} `,
            }}
        />
    );
};

type AccountTypeIconProps = {
    size: PhotoSize;
    currentPerson: PersonDetails;
    hideTooltip?: boolean;
};

const AccountTypeIcon = ({ size, currentPerson, hideTooltip }: AccountTypeIconProps) => {
    const isExternalHire =
        currentPerson.jobTitle !== null && currentPerson.jobTitle.toLowerCase().startsWith('ext');
    const isExternal = currentPerson.accountType === 'external';
    const isConsultant = currentPerson.accountType === 'consultant';
    const isEmployee = currentPerson.accountType === 'employee';

    const iconClassNames = classNames(styles.iconContainer, useComponentDisplayClassNames(styles), {
        [styles.xlarge]: size === 'xlarge',
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
        [styles.externalHire]: isExternalHire,
        [styles.consultant]: isConsultant,
        [styles.affiliate]: isExternal,
    });

    const displayType = useComponentDisplayType();
    const iconSize = getIconSizes(displayType === ComponentDisplayType.Compact)[size];
    const accountTypeTooltipRef = useTooltipRef(hideTooltip ? '' : currentPerson.accountType);

    if (isEmployee) {
        return null;
    }

    return (
        <div className={iconClassNames} ref={accountTypeTooltipRef}>
            {isConsultant && <ConsultantIcon width={iconSize} height={iconSize} />}
            {isExternalHire && <ExternalHireIcon width={iconSize} height={iconSize} />}
            {isExternal && <AffiliateIcon width={iconSize} height={iconSize} />}
        </div>
    );
};

export default ({ personId, person, hideTooltip, size = 'medium' }: PersonPhotoProps) => {
    if (!personId && !person) {
        throw new Error('You must specify at least one of personId and person');
    }

    const fusionContext = useFusionContext();
    const [isFallbackImage, setIsFallbackImage] = useState(false);
    const [currentPerson, setCurrentPerson] = useState<PersonDetails>(getDefaultPerson());

    const urlToPhoto = useMemo(() => {
        const peopleUrls = fusionContext.http.resourceCollections.people;

        if (person) {
            return peopleUrls.getPersonPhoto(person.azureUniqueId);
        } else if (personId) {
            return peopleUrls.getPersonPhoto(personId);
        }
    }, [personId, person, fusionContext]);

    const [error, _, personDetails] = personId ? usePersonDetails(personId) : [null, false, person];

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

    const image = new Image();
    image.onerror = () => setIsFallbackImage(true);
    image.src = `${urlToPhoto}`;

    const imageStyle = !isFallbackImage ? { backgroundImage: `url(${urlToPhoto})` } : {};
    const nameTooltipRef = useTooltipRef(hideTooltip ? '' : currentPerson.name);

    return (
        <div ref={nameTooltipRef} className={photoClassNames} style={imageStyle}>
            {isFallbackImage && <FallbackImage size={size} />}
            <AccountTypeIcon
                currentPerson={personDetails || getDefaultPerson()}
                size={size}
                hideTooltip={hideTooltip}
            />
        </div>
    );
};
