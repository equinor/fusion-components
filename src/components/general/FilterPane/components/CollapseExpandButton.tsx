import React from 'react';
import { useFilterPaneContext } from '../FilterPaneContext';
import useTooltipRef from 'hooks/useTooltipRef';
import IconButton from 'components/general/IconButton';
import CollapseIcon from 'components/icons/components/action/CollapseIcon';

type CollapseExpandButtonProps = {
    onClick: () => void;
};

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({ onClick }) => {
    const filterPaneContext = useFilterPaneContext();
    const tooltipRef = useTooltipRef(
        filterPaneContext.paneIsCollapsed ? 'Expand' : 'Collapse',
        filterPaneContext.tooltipPlacement
    );

    return (
        <IconButton ref={tooltipRef} onClick={onClick}>
            <CollapseIcon
                isCollapsed={filterPaneContext.paneIsCollapsed}
                screenPlacement={filterPaneContext.screenPlacement}
            />
        </IconButton>
    );
};

export default CollapseExpandButton;
