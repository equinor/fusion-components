import React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import {
    useFusionContext,
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import ConsultantIcon from './icons/ConsultantIcon';
import ExternalHireIcon from './icons/ExternalHireIcon';
import AffiliateIcon from './icons/AffiliateIcon';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';
export type Affiliation = 'externalhire' | 'consultant' | 'affiliate';

export type PersonPhotoProps = {
    personId: string;
    affiliation: Affiliation;
    size: PhotoSize;
    title?: string;
};

const friendlyAffiliationName = (affiliation: string) => {
    switch (affiliation) {
        case 'externalhire':
            return 'External Hire';
        case 'consultant':
            return 'Consultant';
        case 'affiliate':
            return 'Affiliate';
    }
};

const getIconSizes = isCompact => ({
    xlarge: isCompact ? 16 : 24,
    large: isCompact ? 8 : 16,
    medium: isCompact ? 8 : 16,
    small: isCompact ? 8 : 12,
});

export default ({ personId, affiliation, size, title }: PersonPhotoProps) => {
    const fusionContext = useFusionContext();
    const urlToPhoto = fusionContext.http.resourceCollections.people.getPersonPhoto(personId);

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

    const iconClassNames = classNames(
        styles.affiliationContainer,
        useComponentDisplayClassNames(styles),
        {
            [styles.xlarge]: size === 'xlarge',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
            [styles.small]: size === 'small',
            [styles.externalHire]: affiliation === 'externalhire',
            [styles.consultant]: affiliation === 'consultant',
            [styles.affiliate]: affiliation === 'affiliate',
        }
    );

    const displayType = useComponentDisplayType();
    const iconSizes = getIconSizes(displayType === ComponentDisplayType.Compact);

    return (
        <React.Fragment>
            <img className={photoClassNames} src="https://via.placeholder.com/150" />
            <div
                title={title}
                className={photoClassNames}
                style={{
                    backgroundImage: `url('${urlToPhoto}')`,
                }}
            >
                <div className={iconClassNames} title={friendlyAffiliationName(affiliation)}>
                    {affiliation === 'consultant' && (
                        <ConsultantIcon width={iconSizes[size]} height={iconSizes[size]} />
                    )}
                    {affiliation === 'externalhire' && (
                        <ExternalHireIcon width={iconSizes[size]} height={iconSizes[size]} />
                    )}
                    {affiliation === 'affiliate' && (
                        <AffiliateIcon width={iconSizes[size]} height={iconSizes[size]} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};
