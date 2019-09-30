import { IconProps, useIcon } from '@equinor/fusion-components';
import * as React from 'react';

const PlayIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            clipRule="evenodd"
            d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM10.8 8.1C10.47 7.85 10 8.09 10 8.5V15.5C10 15.91 10.47 16.15 10.8 15.9L15.47 12.4C15.74 12.2 15.74 11.8 15.47 11.6L10.8 8.1Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    );

    return iconFactory(props);
};

export default PlayIcon;
