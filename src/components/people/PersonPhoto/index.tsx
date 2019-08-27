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
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
};

const getIconSizes = (isCompact: boolean) => ({
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
    accountType: 'consultant',
    company: { id: 'id', name: 'name' },
});

const fallbackPhotoUrl = () => 'https://via.placeholder.com/150';

export default ({ personId, person, size = 'medium' }: PersonPhotoProps) => {
    const fusionContext = useFusionContext();
    const [urlToPhoto, setUrlToPhoto] = useState(fallbackPhotoUrl());
    const [currentPerson, setCurrentperson] = useState<PersonDetails>(person || getDefaultPerson());

    useEffect(() => {
        const peopleUrls = fusionContext.http.resourceCollections.people;

        if (person) {
            const url = peopleUrls.getPersonPhoto(person.azureUniqueId);
            setUrlToPhoto(url);
        } else if (personId) {
            const url = peopleUrls.getPersonPhoto(personId);
            setUrlToPhoto(url);
        }
    }, [personId, person, fusionContext]);

    const [error, isFetching, personDetails] = personId
        ? usePersonDetails(personId)
        : [null, false, null];

    useEffect(() => {
        if (!error && personDetails !== null) {
            setCurrentperson(personDetails);
        } else if (error) {
            setCurrentperson(getDefaultPerson());
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

    const accountType = currentPerson.accountType.toLowerCase();

    const isExternalHire =
        currentPerson.jobTitle !== null && currentPerson.jobTitle.toLowerCase().startsWith('ext');
    const isExternal = accountType === 'external';
    const isConsultant = accountType === 'consultant';

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

    const nameTooltipRef = useTooltipRef(currentPerson.name);
    const accountTypeTooltipRef = useTooltipRef(currentPerson.accountType);

    return (
        <>
            {isFetching && <Spinner />}
            {!isFetching && (
                <div ref={nameTooltipRef} className={photoClassNames}>
                    <img src={urlToPhoto} onError={() => setUrlToPhoto(fallbackPhotoUrl())} />
                    <div className={iconClassNames} ref={accountTypeTooltipRef}>
                        {isConsultant && <ConsultantIcon width={iconSize} height={iconSize} />}
                        {isExternalHire && <ExternalHireIcon width={iconSize} height={iconSize} />}
                        {isExternal && <AffiliateIcon width={iconSize} height={iconSize} />}
                    </div>
                </div>
            )}
        </>
    );
};
