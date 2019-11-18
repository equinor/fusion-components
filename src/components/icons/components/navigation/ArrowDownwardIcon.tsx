import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

const ArrowDownwardIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M11.005 5.20874V16.3787L6.12498 11.4987C5.73498 11.1087 5.09498 11.1087 4.70498 11.4987C4.31498 11.8887 4.31498 12.5187 4.70498 12.9087L11.295 19.4987C11.685 19.8887 12.315 19.8887 12.705 19.4987L19.295 12.9087C19.685 12.5187 19.685 11.8887 19.295 11.4987C19.1081 11.3115 18.8545 11.2063 18.59 11.2063C18.3255 11.2063 18.0718 11.3115 17.885 11.4987L13.005 16.3787V5.20874C13.005 4.65874 12.555 4.20874 12.005 4.20874C11.455 4.20874 11.005 4.65874 11.005 5.20874Z" 
            fill="currentColor" 
        />

    );

    return iconFactory(props);
};

export default ArrowDownwardIcon;
