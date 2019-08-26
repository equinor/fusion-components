import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const InfoIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM11 9H13V7H11V9Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    );

    return iconFactory(props);
};

export default InfoIcon;