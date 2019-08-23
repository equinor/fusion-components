import React from 'react';
import styles from './styles.less';
import classNames from 'classnames';
import { useFusionContext, useComponentDisplayClassNames } from '@equinor/fusion';
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

const iconSizes = {
    xlarge: { width: 24, height: 24 },
    large: { width: 16, height: 16 },
    medium: { width: 16, height: 16 },
    small: { width: 12, height: 12 },
};

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
                        <ConsultantIcon
                            width={iconSizes[size].width}
                            height={iconSizes[size].height}
                        />
                    )}
                    {affiliation === 'externalhire' && (
                        <ExternalHireIcon
                            width={iconSizes[size].width}
                            height={iconSizes[size].height}
                        />
                    )}
                    {affiliation === 'affiliate' && (
                        <AffiliateIcon
                            width={iconSizes[size].width}
                            height={iconSizes[size].height}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};
