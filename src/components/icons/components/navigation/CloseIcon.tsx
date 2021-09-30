import { IconProps, useIcon } from '@equinor/fusion-components';

const CloseIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.3 5.71002C18.1131 5.52276 17.8595 5.41753 17.595 5.41753C17.3305 5.41753 17.0768 5.52276 16.89 5.71002L12 10.59L7.10997 5.70002C6.92314 5.51276 6.66949 5.40753 6.40497 5.40753C6.14045 5.40753 5.8868 5.51276 5.69997 5.70002C5.30997 6.09002 5.30997 6.72002 5.69997 7.11002L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11002C18.68 6.73002 18.68 6.09002 18.3 5.71002Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CloseIcon;
