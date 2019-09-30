import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const PrintIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 3H17C17.55 3 18 3.45 18 4V6C18 6.55 17.55 7 17 7H7C6.45 7 6 6.55 6 6V4C6 3.45 6.45 3 7 3ZM5 8H19C20.66 8 22 9.34 22 11V15C22 16.1 21.1 17 20 17H18V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V17H4C2.9 17 2 16.1 2 15V11C2 9.34 3.34 8 5 8ZM9 19H15C15.55 19 16 18.55 16 18V14H8V18C8 18.55 8.45 19 9 19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default PrintIcon;
