import React from 'react';
import { useTooltipRef, CollapseIcon, IconButton } from '@equinor/fusion-components';

type CollapseExpandButtonProps = {
    isCollapsed: boolean;
    onClick: () => void;
};

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({ isCollapsed, onClick }) => {
    const tooltipRef = useTooltipRef(isCollapsed ? 'Expand' : 'Collapse', 'right');

    return (
        <IconButton ref={tooltipRef} onClick={onClick}>
            <CollapseIcon isCollapsed={isCollapsed} />
        </IconButton>
    );
};

export default CollapseExpandButton;