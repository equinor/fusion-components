import React from 'react';
import {
    useComponentDisplayClassNames,
    useComponentDisplayType,
    ComponentDisplayType,
} from '@equinor/fusion';
import classNames from 'classnames';
import styles from './styles.less';
import FallbackIcon from './FallbackIcon';

export type DiscSize = 'xlarge' | 'large' | 'medium' | 'small';
type SkeletonDiscProps = {
    size: DiscSize;
};
const getFallbackImageSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 48 : 56,
    large: isCompact ? 32 : 40,
    medium: isCompact ? 24 : 32,
    small: isCompact ? 16 : 24,
});

const SkeletonDisc: React.FC<SkeletonDiscProps> = ({ size }) => {
    const displayClassNames = useComponentDisplayClassNames(styles);

    const discClassNames = classNames(styles.skeleton, styles.disc, displayClassNames, {
        [styles.xlarge]: size === 'xlarge',
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
    });

    const displayType = useComponentDisplayType();

    const sizes = getFallbackImageSizes(displayType === ComponentDisplayType.Compact);
    const iconProps = {
        width: sizes[size],
        height: sizes[size],
        ...{
            viewBox: `0 0 ${sizes.xlarge} ${sizes.xlarge} `,
        },
    };

    return (
        <div className={discClassNames}>
            <FallbackIcon {...iconProps} />
        </div>
    );
};

export default SkeletonDisc;
