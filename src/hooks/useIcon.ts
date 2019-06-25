import * as React from 'react';
import { useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';

type IconFactoryProps = {
    height?: number;
    width?: number;
    color?: string;
    cursor?: string;
};

export type IconProps = {} & IconFactoryProps;

const useIcon = (content: React.SVGAttributes<SVGElement>) => {
    const displayType = useComponentDisplayType();

    const iconFactory = ({
        height = displayType === ComponentDisplayType.Compact ? 16 : 24,
        width = displayType === ComponentDisplayType.Compact ? 16 : 24,
        color = '',
        ...rest
    }: IconFactoryProps) => {
        const props = {
            height,
            style: { color },
            viewBox: '0 0 24 24',
            width,
            ...rest,
        };

        return React.createElement('svg', props, content);
    };

    return iconFactory;
};

export default useIcon;
