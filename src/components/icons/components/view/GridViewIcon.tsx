import { IconProps, useIcon } from '@equinor/fusion-components';

/**
 * @deprecated
 * @see Link : {@link https://equinor.github.io/fusion-react-components/?path=/docs/data-icon--page}
 */

export const GridViewIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M3.5 5.5V18.5H20.5V5.5H3.5ZM13.5 7.5V11H10.5V7.5H13.5ZM8.5 7.5H5.5V11H8.5V7.5ZM5.5 16.5V13H8.5V16.5H5.5ZM10.5 13V16.5H13.5V13H10.5ZM18.5 16.5H15.5V13H18.5V16.5ZM15.5 7.5V11H18.5V7.5H15.5Z"
        />
    );

    return iconFactory(props);
};

export default GridViewIcon;
