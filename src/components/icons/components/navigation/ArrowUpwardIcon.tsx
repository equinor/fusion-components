import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

const ArrowUpwardIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M13 18.7912V7.62123L17.88 12.5012C18.27 12.8912 18.91 12.8912 19.3 12.5012C19.69 12.1112 19.69 11.4812 19.3 11.0912L12.71 4.50123C12.5231 4.31397 12.2695 4.20874 12.005 4.20874C11.7405 4.20874 11.4868 4.31397 11.3 4.50123L4.69997 11.0812C4.30997 11.4712 4.30997 12.1012 4.69997 12.4912C5.08997 12.8812 5.71997 12.8812 6.10997 12.4912L11 7.62123V18.7912C11 19.3412 11.45 19.7912 12 19.7912C12.55 19.7912 13 19.3412 13 18.7912Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default ArrowUpwardIcon;
