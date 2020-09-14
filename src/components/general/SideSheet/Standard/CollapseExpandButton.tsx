import React from 'react';
import useTooltipRef from 'hooks/useTooltipRef';
import IconButton from 'components/general/IconButton';
import CollapseIcon from 'components/icons/components/action/CollapseIcon';

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
