import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

export const ListViewIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7H5V9H3V7ZM5 11H3V13H5V11ZM21 11H7V13H21V11ZM3 15H5V17H3V15ZM21 15H7V17H21V15ZM21 7H7V9H21V7Z" fill="currentColor"/>
    );

    return iconFactory(props);
};

export default ListViewIcon;
