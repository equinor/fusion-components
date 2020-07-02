import React from 'react';
import {
    useComponentDisplayType,
    useComponentDisplayClassNames,
    ComponentDisplayType,
} from '@equinor/fusion';
import styles from './styles.less';
import classNames from 'classnames';
import RotationNumberIcon from './icons/RotationNumberIcon';
import { PhotoSize } from '../PersonCard';

type RotationBadgeProps = {
    size: PhotoSize;
    numberOfPersons: number;
    hideTooltip?: boolean;
};

const getIconSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 24 : 24,
    large: isCompact ? 16 : 16,
    medium: isCompact ? 12 : 16,
    small: isCompact ? 8 : 12,
});

const RotationBadge = ({ size, numberOfPersons, hideTooltip }: RotationBadgeProps) => {
    const iconClassNames = classNames(styles.iconContainer, useComponentDisplayClassNames(styles), {
        [styles.xlarge]: size === 'xlarge',
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
    });

    const displayType = useComponentDisplayType();
    const iconSize = getIconSizes(displayType === ComponentDisplayType.Compact)[size];

    return (
        <div className={iconClassNames}>
            <RotationNumberIcon
                width={iconSize}
                height={iconSize}
                numberOfPersons={numberOfPersons}
            />
        </div>
    );
};

export default RotationBadge;
