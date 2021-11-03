import { IconProps, useIcon } from '@equinor/fusion-components';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

export const ColumnViewIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M3 4H21C21.55 4 22 4.45 22 5V19C22 19.55 21.55 20 21 20H3C2.45 20 2 19.55 2 19V5C2 4.45 2.45 4 3 4ZM4 18H8V6H4V18ZM14 18H10V6H14V18ZM16 18H20V6H16V18Z"
        />
    );

    return iconFactory(props);
};

export default ColumnViewIcon;
