import React from 'react';
import { useFusionContext, useComponentDisplayType, ComponentDisplayType } from '@equinor/fusion';
import ComponentDisplayTypeIcon from '../../icons/components/componentDisplayType';
import useTooltipRef from '../../../hooks/useTooltipRef';

const inverseComponentDisplayType = (componentDisplayType: ComponentDisplayType) =>
    componentDisplayType === ComponentDisplayType.Comfortable
        ? ComponentDisplayType.Compact
        : ComponentDisplayType.Comfortable;

const getComponentDisplayTypeTooltipText = (componentDisplayType: ComponentDisplayType) =>
    componentDisplayType === ComponentDisplayType.Comfortable
        ? 'Switch to compact mode'
        : 'Switch to comfortable mode';

const ComponentDisplayToggleButton: React.FC = () => {
    const { settings } = useFusionContext();

    const componentDisplayType = useComponentDisplayType();
    const toggleComponentDisplayType = () => {
        settings.core.setAsync(
            'componentDisplayType',
            inverseComponentDisplayType(componentDisplayType)
        );
    };

    const componentDisplayTypeTooltipRef = useTooltipRef(
        getComponentDisplayTypeTooltipText(componentDisplayType),
        'below'
    );

    return (
        <button ref={componentDisplayTypeTooltipRef} onClick={toggleComponentDisplayType}>
            <ComponentDisplayTypeIcon />
        </button>
    );
};

export default ComponentDisplayToggleButton;
