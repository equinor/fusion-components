import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

type FullscreenIconProps = {
    exit: boolean;
} & IconProps;

const FullscreenIcon = ({ exit, ...rest }: FullscreenIconProps) => {
    const d = exit
        ? 'M6 8H8V6C8 5.45 8.45 5 9 5C9.55 5 10 5.45 10 6V9C10 9.55 9.55 10 9 10H6C5.45 10 5 9.55 5 9C5 8.45 5.45 8 6 8ZM8 16H6C5.45 16 5 15.55 5 15C5 14.45 5.45 14 6 14H9C9.55 14 10 14.45 10 15V18C10 18.55 9.55 19 9 19C8.45 19 8 18.55 8 18V16ZM15 19C15.55 19 16 18.55 16 18V16H18C18.55 16 19 15.55 19 15C19 14.45 18.55 14 18 14H15C14.45 14 14 14.45 14 15V18C14 18.55 14.45 19 15 19ZM16 6V8H18C18.55 8 19 8.45 19 9C19 9.55 18.55 10 18 10H15C14.45 10 14 9.55 14 9V6C14 5.45 14.45 5 15 5C15.55 5 16 5.45 16 6Z'
        : 'M7 9C7 9.55 6.55 10 6 10C5.45 10 5 9.55 5 9V6C5 5.45 5.45 5 6 5H9C9.55 5 10 5.45 10 6C10 6.55 9.55 7 9 7H7V9ZM5 15C5 14.45 5.45 14 6 14C6.55 14 7 14.45 7 15V17H9C9.55 17 10 17.45 10 18C10 18.55 9.55 19 9 19H6C5.45 19 5 18.55 5 18V15ZM17 17H15C14.45 17 14 17.45 14 18C14 18.55 14.45 19 15 19H18C18.55 19 19 18.55 19 18V15C19 14.45 18.55 14 18 14C17.45 14 17 14.45 17 15V17ZM15 7C14.45 7 14 6.55 14 6C14 5.45 14.45 5 15 5H18C18.55 5 19 5.45 19 6V9C19 9.55 18.55 10 18 10C17.45 10 17 9.55 17 9V7H15Z';
    const iconFactory = useIcon(
        <path fillRule="evenodd" clipRule="evenodd" d={d} fill="currentColor" />
    );

    return iconFactory(rest);
};

export default FullscreenIcon;
