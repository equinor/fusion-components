import * as React from 'react';
import { IconProps, useIcon } from '@equinor/fusion-components';

const EditIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.7088 5.63123C21.0988 6.02123 21.0988 6.65123 20.7088 7.04123L18.8788 8.87123L15.1288 5.12123L16.9588 3.29123C17.1456 3.10398 17.3993 2.99875 17.6638 2.99875C17.9283 2.99875 18.1819 3.10398 18.3688 3.29123L20.7088 5.63123ZM2.99878 20.5012V17.4612C2.99878 17.3212 3.04878 17.2012 3.14878 17.1012L14.0588 6.19123L17.8088 9.94123L6.88878 20.8512C6.79878 20.9512 6.66878 21.0012 6.53878 21.0012H3.49878C3.21878 21.0012 2.99878 20.7812 2.99878 20.5012Z"
            fill="currentcolor"
        />
    );

    return iconFactory(props);
};

export default EditIcon;
