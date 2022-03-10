import useIcon, { IconProps } from '../../../../hooks/useIcon';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

const MinimizeIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 11H17C17.55 11 18 11.45 18 12C18 12.55 17.55 13 17 13H7C6.45 13 6 12.55 6 12C6 11.45 6.45 11 7 11Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default MinimizeIcon;
