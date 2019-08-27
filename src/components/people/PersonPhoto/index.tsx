import React, { useState, useEffect } from 'react';
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
import { useTooltipRef } from '@equinor/fusion-components';
import { Spinner } from '@equinor/fusion-components';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId: string;
    size?: PhotoSize;
};

const getIconSizes = isCompact => ({
    xlarge: isCompact ? 16 : 24,
    large: isCompact ? 8 : 16,
    medium: isCompact ? 8 : 16,
    small: isCompact ? 8 : 12,
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
    accountType: 'employee',
    company: { id: 'id', name: 'name' },
});

export default ({ personId, size = 'medium' }: PersonPhotoProps) => {
    const fusionContext = useFusionContext();
    const urlToPhoto = fusionContext.http.resourceCollections.people.getPersonPhoto(personId);
    const [error, isFetching, personDetails] = usePersonDetails(personId);

    const [person, setPerson] = useState<PersonDetails>(getDefaultPerson());

    useEffect(() => {
        if (!error && personDetails !== null) {
            setPerson(personDetails);
        } else if (error) {
            setPerson(getDefaultPerson());
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

    const accountType = person.accountType.toLowerCase();

    const isExternalHire = person.jobTitle.toLowerCase().startsWith('ext');
    const isExternal = accountType === 'external';
    const isConsultant = accountType === 'consultant';

    const iconClassNames = classNames(
        styles.affiliationContainer,
        useComponentDisplayClassNames(styles),
        {
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.externalHire]: isExternalHire,
            [styles.consultant]: isConsultant,
            [styles.affiliate]: isExternal,
        }
    );

    const displayType = useComponentDisplayType();
    const iconSizes = getIconSizes(displayType === ComponentDisplayType.Compact);

    const nameTooltipRef = useTooltipRef(person.name);
    const accountTypeTooltipRef = useTooltipRef(person.accountType);

    return (
        <>
            {isFetching && <Spinner />}
            {!isFetching && (
                <div
                    ref={nameTooltipRef}
                    className={photoClassNames}
                    style={{
                        backgroundImage: `url('${urlToPhoto}')`,
                    }}
                >
                    <div className={iconClassNames} ref={accountTypeTooltipRef}>
                        {isConsultant && (
                            <ConsultantIcon width={iconSizes[size]} height={iconSizes[size]} />
                        )}
                        {isExternalHire && (
                            <ExternalHireIcon width={iconSizes[size]} height={iconSizes[size]} />
                        )}
                        {isExternal && (
                            <AffiliateIcon width={iconSizes[size]} height={iconSizes[size]} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
