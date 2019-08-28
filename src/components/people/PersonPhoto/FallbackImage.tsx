import React from 'react';
import { PhotoSize } from '@equinor/fusion-components';
import FallbackIcon from './icons/FallbackIcon';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';

type FallbackImageProps = {
    size: PhotoSize;
};

const getFallbackImageSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 48 : 56,
    large: isCompact ? 32 : 40,
    medium: isCompact ? 24 : 32,
    small: isCompact ? 16 : 24,
});

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

export default FallbackImage;
