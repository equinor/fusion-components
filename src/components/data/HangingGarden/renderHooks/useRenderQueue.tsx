import * as React from 'react';
import * as PIXI from 'pixi.js';
import { useHangingGardenContext } from './useHangingGardenContext';
import { ItemRenderContext, RenderItem } from '..';

export type RenderQueue = {
    enqueueRenderer: (
        key: string,
        render: (context: ItemRenderContext) => void,
        context: ItemRenderContext
    ) => void;
    processRenderQueue: () => void;
    processRenderQueueAnimationFrame: React.MutableRefObject<number>;
};

/**
 * A queue for all items the renderGarden creates that needs to be rendered.
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useRenderQueue = (): RenderQueue => {
    const {
        pixiApp,
        textureCaches: { getTextureFromCache, addTextureToCache },
    } = useHangingGardenContext();

    const renderQueue = React.useRef<RenderItem[]>([]);
    const isRendering = React.useRef(false);

    const processRenderQueueAnimationFrame = React.useRef(0);

    const enqueueRenderer = React.useCallback(
        (key: string, render: (context: ItemRenderContext) => void, context: ItemRenderContext) => {
            renderQueue.current.push({
                key,
                render,
                context,
            });

            return;
        },
        [renderQueue.current]
    );

    const processRenderQueue = React.useCallback(() => {
        if (isRendering.current || !renderQueue.current.length) {
            if (!renderQueue.current.length) {
                pixiApp.current?.render();
            }

            return;
        }

        isRendering.current = true;
        const renderers = renderQueue.current.splice(0, 100);
        renderers.forEach(processRenderer);
        pixiApp.current?.render();
        isRendering.current = false;
        window.requestAnimationFrame(processRenderQueue);
    }, [isRendering.current, pixiApp, renderQueue.current]);

    const processRenderer = React.useCallback(
        (renderer: RenderItem) => {
            let graphicsContainer = getTextureFromCache(
                'graphics',
                renderer.key
            ) as PIXI.RenderTexture;

            if (!graphicsContainer) {
                const graphics = new PIXI.Graphics();
                graphics.cacheAsBitmap = false;
                renderer.render({
                    ...renderer.context,
                    graphics,
                });

                graphicsContainer = PIXI.RenderTexture.create({
                    width: renderer.context.width,
                    height: renderer.context.height,
                });
                pixiApp.current?.renderer.render(graphics, graphicsContainer);
                addTextureToCache('graphics', renderer.key, graphicsContainer);
            }

            renderer.context.container.addChild(new PIXI.Sprite(graphicsContainer));
        },
        [getTextureFromCache, addTextureToCache, pixiApp]
    );

    return { enqueueRenderer, processRenderQueue, processRenderQueueAnimationFrame };
};

export default useRenderQueue;
