import React from 'react';
import { useTooltipRef, CollapseIcon, IconButton } from '@equinor/fusion-components';

type CollapseExpandButtonProps = {
    isOpen: boolean;
    onClick: () => void;
    screenPlacement: 'left' | 'right';
};

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({
    isOpen,
    onClick,
    screenPlacement,
}) => {
    const tooltipRef = useTooltipRef(
        isOpen ? 'Collapse' : 'Expand',
        screenPlacement === 'right' ? 'left' : 'right'
    );

    return (
        <IconButton ref={tooltipRef} onClick={onClick}>
            <CollapseIcon isCollapsed={!isOpen} screenPlacement={screenPlacement} />
        </IconButton>
    );
};

export default CollapseExpandButton;
