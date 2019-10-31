import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

const SyncIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12 2.21V4C16.42 4 20 7.58 20 12C20 13.04 19.8 14.04 19.43 14.95C19.16 15.62 18.3 15.8 17.79 15.29C17.52 15.02 17.41 14.61 17.56 14.25C17.85 13.56 18 12.79 18 12C18 8.69 15.31 6 12 6V7.79C12 8.24 11.46 8.46 11.14 8.15L8.35 5.36C8.15 5.16 8.15 4.85 8.35 4.65L11.15 1.86C11.46 1.54 12 1.76 12 2.21ZM6 12C6 15.31 8.69 18 12 18V16.21C12 15.76 12.54 15.54 12.85 15.85L15.64 18.64C15.84 18.84 15.84 19.15 15.64 19.35L12.85 22.14C12.54 22.46 12 22.24 12 21.79V20C7.58 20 4 16.42 4 12C4 10.96 4.2 9.96 4.57 9.05C4.84 8.38 5.7 8.2 6.21 8.71C6.48 8.98 6.59 9.39 6.44 9.75C6.15 10.44 6 11.21 6 12Z" 
            fill="currentColor"
        />

    );

    return iconFactory(props);
};

export default SyncIcon;
