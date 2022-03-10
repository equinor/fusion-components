import { useTooltipRef, CollapseIcon, IconButton } from '@equinor/fusion-components';
import { FC } from 'react';

type CollapseExpandButtonProps = {
    isCollapsed: boolean;
    onClick: () => void;
};

const CollapseExpandButton: FC<CollapseExpandButtonProps> = ({ isCollapsed, onClick }) => {
    const tooltipRef = useTooltipRef(isCollapsed ? 'Expand' : 'Collapse', 'right');

    return (
        <IconButton id="collapse-expand-btn" ref={tooltipRef} onClick={onClick}>
            <CollapseIcon isCollapsed={isCollapsed} screenPlacement="left" />
        </IconButton>
    );
};

export default CollapseExpandButton;
