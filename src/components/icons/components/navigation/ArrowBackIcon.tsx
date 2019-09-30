import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

const ArrowBackIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.7912 11.005H7.62124L12.5012 6.12502C12.8912 5.73502 12.8912 5.09502 12.5012 4.70502C12.3144 4.51777 12.0608 4.41254 11.7962 4.41254C11.5317 4.41254 11.2781 4.51777 11.0912 4.70502L4.50124 11.295C4.11124 11.685 4.11124 12.315 4.50124 12.705L11.0912 19.295C11.4812 19.685 12.1112 19.685 12.5012 19.295C12.8912 18.905 12.8912 18.275 12.5012 17.885L7.62124 13.005H18.7912C19.3412 13.005 19.7912 12.555 19.7912 12.005C19.7912 11.455 19.3412 11.005 18.7912 11.005Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default ArrowBackIcon;
