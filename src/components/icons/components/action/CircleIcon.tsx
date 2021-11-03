import useIcon, { IconProps } from '../../../../hooks/useIcon';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const CircleIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm2 0c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CircleIcon;
