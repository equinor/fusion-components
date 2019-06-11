import * as React from 'react';

type IconFactoryProps = {
    height?: number;
    width?: number;
    color?: string;
};

export type IconProps = {} & IconFactoryProps;

const useIcon = (content: React.SVGAttributes<SVGElement>) => {
    const iconFactory = ({
        height = 24,
        width = 24,
        color = '#000',
        ...rest
    }: IconFactoryProps) => {
        const props = {
            cursor: 'pointer',
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
