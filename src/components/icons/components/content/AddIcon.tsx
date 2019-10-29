import { IconProps, useIcon } from '@equinor/fusion-components';
import * as React from 'react';

const AddIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default AddIcon;
