import { IconProps, useIcon } from '@equinor/fusion-components';
import * as React from 'react';

const AddIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
            fill="currentColor"
        />

    );

    return iconFactory(props);
};

export default AddIcon;
