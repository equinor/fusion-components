import { IconProps, useIcon } from '@equinor/fusion-components';
import * as React from 'react';

const CopyIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5 1H4.5C3.4 1 2.5 1.9 2.5 3V16C2.5 16.55 2.95 17 3.5 17C4.05 17 4.5 16.55 4.5 16V4C4.5 3.45 4.95 3 5.5 3H15.5C16.05 3 16.5 2.55 16.5 2C16.5 1.45 16.05 1 15.5 1ZM19.5 5H8.5C7.4 5 6.5 5.9 6.5 7V21C6.5 22.1 7.4 23 8.5 23H19.5C20.6 23 21.5 22.1 21.5 21V7C21.5 5.9 20.6 5 19.5 5ZM9.5 21H18.5C19.05 21 19.5 20.55 19.5 20V8C19.5 7.45 19.05 7 18.5 7H9.5C8.95 7 8.5 7.45 8.5 8V20C8.5 20.55 8.95 21 9.5 21Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CopyIcon;
