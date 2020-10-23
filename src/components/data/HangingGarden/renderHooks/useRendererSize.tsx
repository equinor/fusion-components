import * as React from 'react';
import { useHangingGardenContext } from '../hooks/useHangingGardenContext';
import useGarden from './useGarden';

declare class ResizeObserver {
    constructor(callback: any);
    observe: (target: Element | null) => void;
    unobserve: (target: Element | null) => void;
}

type ResizeObserverArray = {
    contentRect: { width: number; height: number };
};

const useRendererSize = () => {
    const { pixiApp, container } = useHangingGardenContext();
    const { renderGarden } = useGarden();
    const resizeObserverRef = React.useRef<ResizeObserver>();
    const checkRendererSizeAnimationframe = React.useRef(0);

    const resizeRenderer = React.useCallback(
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

    React.useEffect(() => {
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
