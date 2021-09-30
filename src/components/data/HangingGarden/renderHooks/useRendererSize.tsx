import { useRef, useCallback, useEffect } from 'react';
import { useHangingGardenContext } from './useHangingGardenContext';
import useGarden from './useGarden';

declare class ResizeObserver {
    constructor(callback: any);
    observe: (target: Element | null) => void;
    unobserve: (target: Element | null) => void;
}

type ResizeObserverArray = {
    contentRect: { width: number; height: number };
};

/**
 * Handles rendersize of the garden canvas.
 * Will recalculate when window size are changed, or some other item changes the viewport.
 * Example of this is minimizing a filter pane is used.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useRendererSize = () => {
    const { pixiApp, container } = useHangingGardenContext();
    const { renderGarden } = useGarden();
    const resizeObserverRef = useRef<ResizeObserver>();
    const checkRendererSizeAnimationframe = useRef(0);

    const resizeRenderer = useCallback(
        (containerWidth: number, containerHeight: number, pixiApp: PIXI.Application | null) => {
            if (!pixiApp) return;

            const { width, height } = pixiApp?.renderer;

            if (width !== containerWidth || height !== containerHeight) {
                pixiApp.renderer.resize(containerWidth, containerHeight);
                renderGarden();
            }
        },
        [renderGarden]
    );

    useEffect(() => {
        renderGarden();

        resizeObserverRef.current = new ResizeObserver((arr: ResizeObserverArray[]) => {
            const { width, height } = arr[0].contentRect;
            window.cancelAnimationFrame(checkRendererSizeAnimationframe.current);
            checkRendererSizeAnimationframe.current = window.requestAnimationFrame(() =>
                resizeRenderer(width, height, pixiApp.current)
            );
        });

        resizeObserverRef?.current?.observe(container.current);

        return () => resizeObserverRef?.current?.unobserve(container.current);
    }, [resizeRenderer]);

    return;
};

export default useRendererSize;
