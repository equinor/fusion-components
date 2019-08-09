import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

type DropdownArrowProps = IconProps & {
    isOpen: boolean;
};

const OpenArrow: React.FC = () => (
    <path
        d="M8.70627 12.5862L11.2963 9.99624C11.6863 9.60624 12.3163 9.60624 12.7063 9.99624L15.2963 12.5862C15.9263 13.2162 15.4763 14.2962 14.5863 14.2962H9.40627C8.51627 14.2962 8.07627 13.2162 8.70627 12.5862Z"
        fill="currentColor"
    />
);

const ClosedArrow: React.FC = () => (
    <path
        d="M8.70627 11.4137L11.2963 14.0037C11.6863 14.3937 12.3163 14.3937 12.7063 14.0037L15.2963 11.4137C15.9263 10.7837 15.4763 9.70374 14.5863 9.70374H9.40627C8.51627 9.70374 8.07627 10.7837 8.70627 11.4137Z"
        fill="currentColor"
    />
);

const DropdownArrow = ({ isOpen, ...props }: DropdownArrowProps) => {
    const iconFactory = useIcon(
        isOpen ? <OpenArrow /> : <ClosedArrow />
    );

    return iconFactory(props);
};

export default DropdownArrow;
