import { IconProps, useIcon } from '@equinor/fusion-components';

const ArrowForwardIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.20874 13H16.3787L11.4987 17.88C11.1087 18.27 11.1087 18.91 11.4987 19.3C11.8887 19.69 12.5187 19.69 12.9087 19.3L19.4987 12.71C19.8887 12.32 19.8887 11.69 19.4987 11.3L12.9187 4.70002C12.7319 4.51276 12.4783 4.40753 12.2137 4.40753C11.9492 4.40753 11.6956 4.51276 11.5087 4.70002C11.1187 5.09002 11.1187 5.72002 11.5087 6.11002L16.3787 11H5.20874C4.65874 11 4.20874 11.45 4.20874 12C4.20874 12.55 4.65874 13 5.20874 13Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default ArrowForwardIcon;
