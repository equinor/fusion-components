import {
    FullscreenExitIcon,
    FullscreenIcon,
    IconButton,
    useAnchorRef,
    useFullscreen,
    useTooltipRef,
} from '@equinor/fusion-components';
import * as React from 'react';

export type FullscreenToggleButtonProps = {
    quickFactScope?: string;
};

const FullscreenToggleButton: React.FC<FullscreenToggleButtonProps> = ({ quickFactScope }) => {
    const { toggleFullscreen, isFullscreenActive } = useFullscreen();

    const tooltipRef = useTooltipRef(
        isFullscreenActive ? 'Exit Fullscreen Mode (F11)' : 'Enter Fullscreen Mode (F11)',
        'below'
    );

    useAnchorRef({ ref: tooltipRef, id: 'fullscreen-toggle-btn', scope: quickFactScope });

    return (
        <IconButton toggler active={isFullscreenActive} onClick={toggleFullscreen} ref={tooltipRef}>
            {isFullscreenActive ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
    );
};

export default FullscreenToggleButton;
