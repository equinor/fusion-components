import React from 'react';
import useTooltipRef from 'hooks/useTooltipRef';
import IconButton from 'components/general/IconButton';
import CollapseIcon from 'components/icons/components/action/CollapseIcon';

type CollapseExpandButtonProps = {
    isCollapsed: boolean;
    onClick: () => void;
};

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({ isCollapsed, onClick }) => {
    const tooltipRef = useTooltipRef(isCollapsed ? 'Expand' : 'Collapse', 'right');

    return (
        <IconButton ref={tooltipRef} onClick={onClick}>
            <CollapseIcon isCollapsed={isCollapsed} screenPlacement="left" />
        </IconButton>
    );
};

export default CollapseExpandButton;
