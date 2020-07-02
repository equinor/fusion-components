import React from 'react';
import useIcon, { IconProps } from 'hooks/useIcon';

type RotationNumberIconProps = IconProps & {
    numberOfPersons: number;
};

const RotationNumberIcon = (props: RotationNumberIconProps) => {
    const iconFactory = useIcon(
        <>
            <circle cx="12" cy="12" r="12" fill="#007079" />
            <text x="50%" y="50%" text-anchor="middle" stroke="white" stroke-width="1px" dy=".3em">
                {props.numberOfPersons}
            </text>
        </>
    );

    return iconFactory(props);
};

export default RotationNumberIcon;
