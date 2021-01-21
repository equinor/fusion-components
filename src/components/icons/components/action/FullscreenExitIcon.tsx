import * as React from 'react';
import useIcon, { IconProps } from '../../../../hooks/useIcon';

const FullscreenExitIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 8h3V5h2v5H5V8zm3 8H5v-2h5v5H8v-3zm6 3h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z"
            fill="currentColor"
        />
    );

    return iconFactory(props);
};

export default FullscreenExitIcon;
