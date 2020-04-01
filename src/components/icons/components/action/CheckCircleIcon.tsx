import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const CheckCircle = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.83l6.59-6.59L18 9l-8 8-4-4 1.41-1.41L10 14.17z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default CheckCircle;
