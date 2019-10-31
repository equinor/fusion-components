import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const ModeIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M20.7087 5.63123C21.0987 6.02123 21.0987 6.65123 20.7087 7.04123L18.8787 8.87123L15.1287 5.12123L16.9587 3.29123C17.1456 3.10398 17.3992 2.99875 17.6637 2.99875C17.9283 2.99875 18.1819 3.10398 18.3687 3.29123L20.7087 5.63123ZM2.99875 20.5012V17.4612C2.99875 17.3212 3.04875 17.2012 3.14875 17.1012L14.0587 6.19123L17.8087 9.94123L6.88875 20.8512C6.79875 20.9512 6.66875 21.0012 6.53875 21.0012H3.49875C3.21875 21.0012 2.99875 20.7812 2.99875 20.5012Z" 
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default ModeIcon;
