import * as React from 'react';
import * as PIXI from 'pixi.js';
import { PopoverContainer } from '@equinor/fusion-components';

const POPOVER_MARGIN = 8;

export type UsePopover = {
    popover: JSX.Element | null;
    addPopover: (
        hitContainer: PIXI.Container,
        hitArea: PIXI.Rectangle,
        renderPopover: () => JSX.Element
    ) => void;
};

export type Popover = {
    top: number;
    left: number;
    render: () => JSX.Element;
};

const usePopover = (delay?: number): UsePopover => {
    const [selectedPopover, setSelectedPopover] = React.useState<Popover | null>(null);

    const addPopover = React.useCallback(
        (
            hitContainer: PIXI.Container,
            hitArea: PIXI.Rectangle,
            renderPopover: () => JSX.Element
        ) => {
            const hitAreaContainer = new PIXI.Container();
            hitAreaContainer.interactive = true;
            hitAreaContainer.hitArea = hitArea;

            let timer: NodeJS.Timeout;
            hitAreaContainer.on('mouseover', () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setSelectedPopover({
                        top: hitContainer.y + hitArea.height,
                        left: hitContainer.x + hitArea.x - POPOVER_MARGIN,
                        render: renderPopover,
                    });
                }, delay || 500);
            });

            hitAreaContainer.on('mouseout', () => {
                clearTimeout(timer);
                setSelectedPopover(null);
            });

            hitContainer.addChild(hitAreaContainer);
        },
        []
    );

    const popover = React.useMemo(() => {
        if (!selectedPopover) return null;

        return (
            <div
                style={{
                    position: 'absolute',
                    top: selectedPopover.top,
                    left: selectedPopover.left,
                }}
            >
                <PopoverContainer>{selectedPopover.render()}</PopoverContainer>
            </div>
        );
    }, [selectedPopover]);

    return { popover, addPopover };
};

export default usePopover;
