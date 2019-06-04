import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

type ChevronIconProps = {
    left: boolean;
} & IconProps;

const ChevronIcon = ({ left, ...rest }: ChevronIconProps) => {
    const d = left
        ? 'M15 6.70502C14.8132 6.51777 14.5595 6.41254 14.295 6.41254C14.0305 6.41254 13.7769 6.51777 13.59 6.70502L9.00002 11.295C8.61002 11.685 8.61002 12.315 9.00002 12.705L13.59 17.295C13.98 17.685 14.61 17.685 15 17.295C15.39 16.905 15.39 16.275 15 15.885L11.12 11.995L15 8.11502C15.39 7.72502 15.38 7.08502 15 6.70502Z'
        : 'M9.00002 6.71063C8.61002 7.10063 8.61002 7.73063 9.00002 8.12063L12.88 12.0006L9.00002 15.8806C8.61002 16.2706 8.61002 16.9006 9.00002 17.2906C9.39002 17.6806 10.02 17.6806 10.41 17.2906L15 12.7006C15.39 12.3106 15.39 11.6806 15 11.2906L10.41 6.70063C10.03 6.32063 9.39002 6.32063 9.00002 6.71063Z';
    const iconFactory = useIcon(<path d={d} fill="currentColor" />);

    return iconFactory(rest);
};

export default ChevronIcon;
