import { PhotoSize } from '@equinor/fusion-components';
import FallbackIcon from './icons/FallbackIcon';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';
import RotationIcon from './icons/RotationIcon';

type FallbackImageProps = {
    size: PhotoSize;
    rotation?: boolean;
};

const getFallbackImageSizes = (isCompact: boolean) => ({
    xlarge: isCompact ? 48 : 56,
    large: isCompact ? 32 : 40,
    medium: isCompact ? 24 : 32,
    small: isCompact ? 16 : 24,
});

const FallbackImage = ({ size, rotation }: FallbackImageProps) => {
    const displayType = useComponentDisplayType();
    const sizes = getFallbackImageSizes(displayType === ComponentDisplayType.Compact);
    const iconProps = {
        width: sizes[size],
        height: sizes[size],
        ...{
            viewBox: `0 0 ${sizes.xlarge} ${sizes.xlarge} `,
        },
    };
    return rotation ? <RotationIcon {...iconProps} /> : <FallbackIcon {...iconProps} />;
};

export default FallbackImage;
