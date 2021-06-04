import { IconProps, useIcon } from '@equinor/fusion-components';

export const ListViewIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
            d="M3 7H5V9H3V7ZM5 11H3V13H5V11ZM21 11H7V13H21V11ZM3 15H5V17H3V15ZM21 15H7V17H21V15ZM21 7H7V9H21V7Z"
        />
    );

    return iconFactory(props);
};

export default ListViewIcon;
