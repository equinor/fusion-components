import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

type ExpandIconProps = {
    less: boolean;
} & IconProps;

const ExpandIcon = ({ less, ...rest }: ExpandIconProps) => {
    const d = less
        ? 'M11.295 9.00002L6.70498 13.59C6.31498 13.98 6.31498 14.61 6.70498 15C7.09498 15.39 7.72498 15.39 8.11498 15L12.005 11.12L15.885 15C16.275 15.39 16.905 15.39 17.295 15C17.685 14.61 17.685 13.98 17.295 13.59L12.705 9.00002C12.325 8.61002 11.685 8.61002 11.295 9.00002Z'
        : 'M15.875 9.00001L11.995 12.88L8.11498 9.00001C7.92814 8.81275 7.67449 8.70752 7.40998 8.70752C7.14546 8.70752 6.89181 8.81275 6.70498 9.00001C6.31498 9.39001 6.31498 10.02 6.70498 10.41L11.295 15C11.685 15.39 12.315 15.39 12.705 15L17.295 10.41C17.685 10.02 17.685 9.39001 17.295 9.00001C16.905 8.62001 16.265 8.61001 15.875 9.00001Z';
    const iconFactory = useIcon(<path d={d} fill="currentColor" />);

    return iconFactory(rest);
};

export default ExpandIcon;
