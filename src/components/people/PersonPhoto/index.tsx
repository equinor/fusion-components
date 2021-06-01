/* eslint-disable prettier/prettier */
import styles from './styles.less';
import classNames from 'classnames';
import {
    useComponentDisplayClassNames,
    usePersonDetails,
    PersonDetails,
    usePersonImageUrl,
} from '@equinor/fusion';

import FallbackImage from './FallbackImage';
import AccountTypeBadge from './AccountTypeBadge';
import RotationBadge from './RotationBadge';
import { SkeletonDisc } from '../../feedback/Skeleton';
import PersonPresenceIcon from './PersonPresenceIcon';
import AccountTypeIcon from './AccountTypeIcon';

export { PersonPresenceIcon, AccountTypeIcon };

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export type PersonPhotoProps = {
    personId?: string;
    person?: PersonDetails;
    size?: PhotoSize;
    hideTooltip?: boolean;
    additionalPersons?: PersonDetails[];
};

export default ({
    personId,
    person,
    hideTooltip,
    size = 'medium',
    additionalPersons = [],
}: PersonPhotoProps) => {
    const id = person && additionalPersons.length === 0 ? person.azureUniqueId : personId || '';

    const { isFetching, imageUrl, error: imageError } = usePersonImageUrl(id);

    const { personDetails } = personId ? usePersonDetails(personId) : { personDetails: person };

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

    const popoverClassNames = classNames(styles.popoverDetails, {
        [styles.hidePopover]: hideTooltip,
    });

    if (isFetching) {
        return (
            <div className={photoClassNames}>
                <SkeletonDisc size={size} />
            </div>
        );
    }

    return (
        <div className={photoClassNames} style={imageStyle}>
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
