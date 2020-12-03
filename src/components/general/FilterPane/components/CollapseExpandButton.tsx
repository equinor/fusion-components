import { useTooltipRef, CollapseIcon, IconButton } from '@equinor/fusion-components';
import { useFilterPaneContext } from '../FilterPaneContext';
import { FC } from 'react';

type CollapseExpandButtonProps = {
    onClick: () => void;
};

const CollapseExpandButton: FC<CollapseExpandButtonProps> = ({ onClick }) => {
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
