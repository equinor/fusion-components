import { useRef, useMemo, RefObject } from 'react';
import * as PIXI from 'pixi.js-legacy';

/**
 * set up for the PIXI.js api
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const usePixiApp = (
    canvas: RefObject<HTMLCanvasElement> | null,
    container: RefObject<HTMLDivElement> | null,
    backgroundColor: number
) => {
    PIXI.utils.skipHello(); // Don't output the pixi message to the console
    PIXI.Ticker.shared.autoStart = false;
    PIXI.settings.ROUND_PIXELS = true;

    const pixiApp = useRef<PIXI.Application | null>(null);

    pixiApp.current = useMemo(() => {
        if (!canvas?.current || !container?.current) return null;

        return new PIXI.Application({
            view: canvas.current,
            width: container.current?.offsetWidth,
            height: container.current?.offsetHeight,
            backgroundColor,
            resolution: 1,
            antialias: true,
            transparent: true,
            sharedTicker: true,
        });
    }, [canvas?.current, container?.current, backgroundColor]);

    if (pixiApp.current) {
        pixiApp.current.renderer.plugins.interaction.autoPreventDefault = false;
        pixiApp.current.renderer.view.style.touchAction = 'auto';
    }

    return { pixiApp };
};

export default usePixiApp;
