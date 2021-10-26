import { useTooltipRef, CollapseIcon, IconButton } from '@equinor/fusion-components';
import { FC } from 'react';

type CollapseExpandButtonProps = {
    isOpen: boolean;
    onClick: () => void;
    screenPlacement: 'left' | 'right';
    id?: string;
};

const CollapseExpandButton: FC<CollapseExpandButtonProps> = ({
    isOpen,
    onClick,
    screenPlacement,
    id,
}) => {
    const tooltipRef = useTooltipRef(
        isOpen ? 'Collapse' : 'Expand',
        screenPlacement === 'right' ? 'left' : 'right'
    );

    return (
        <IconButton id={id} ref={tooltipRef} onClick={onClick}>
            <CollapseIcon isCollapsed={!isOpen} screenPlacement={screenPlacement} />
        </IconButton>
    );
};

export default CollapseExpandButton;
