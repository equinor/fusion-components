import * as React from 'react';
import * as PIXI from 'pixi.js';

import { useHangingGardenContext } from '../hooks/useHangingGardenContext';
import useTextNode from './useTextNode';
import { getColumnX, addDot, HIGHLIGHTED_ITEM_KEY } from '../utils';
import { HangingGardenColumnIndex } from '../models/HangingGarden';
import { Size, Position, ItemRenderContext } from '../models/RenderContext';
import useRenderQueue from './useRenderQueue';
import useItemDescription from './useItemDescription';

const useItem = <T extends HangingGardenColumnIndex>() => {
    const {
        pixiApp,
        stage,
        expandedColumns,
        headerHeight,
        itemHeight,
        itemWidth,
        itemKeyProp,
        highlightedItem,
        onItemClick,
        renderItemContext,
        textureCaches: { getTextureFromCache, addTextureToCache },
        popover: { addPopover },
    } = useHangingGardenContext();

    const { createTextNode } = useTextNode();

    const {
        enqueueRenderer,
        processRenderQueue,
        processRenderQueueAnimationFrame,
    } = useRenderQueue();

    const { renderItemDescription } = useItemDescription<T>();

    const createRect = React.useCallback(
        (position: Position, size: Size, color: number) => {
            const { x, y } = position;
            const { width, height } = size;

            const key = '' + color + x + y + width + height;
            let cachedRect = getTextureFromCache('rects', key) as PIXI.RenderTexture;

            if (!cachedRect) {
                const graphics = new PIXI.Graphics();
                graphics.beginFill(color);
                graphics.drawRoundedRect(x, y, width - 2, height - 2, 4);
                graphics.endFill();
                cachedRect = PIXI.RenderTexture.create({ width, height });
                pixiApp?.renderer.render(graphics, cachedRect);
                addTextureToCache('rects', key, cachedRect);
            }

            return new PIXI.Sprite(cachedRect);
        },
        [pixiApp, getTextureFromCache, addTextureToCache]
    );

    const renderItem = React.useCallback(
        (item: T, index: number, columnIndex: number) => {
            const x = getColumnX(columnIndex, expandedColumns, itemWidth);
            const y = headerHeight + index * itemHeight;
            let renderedItem = getTextureFromCache(
                'items',
                item[itemKeyProp as keyof T]
            ) as PIXI.Container;
            if (!renderedItem) {
                renderedItem = new PIXI.Container();
                renderedItem;
                renderedItem.x = x;
                renderedItem.y = y;
                renderedItem.width = itemWidth;
                renderedItem.height = itemHeight;
                renderedItem.buttonMode = true;
                renderedItem.interactive = true;
                renderedItem.on('click', () => onItemClick(item));
                renderedItem.on('tap', () => onItemClick(item));

                const graphicsContext = new PIXI.Graphics();
                graphicsContext.cacheAsBitmap = true;
                renderedItem.addChild(graphicsContext);

                const itemRenderContext: ItemRenderContext = {
                    container: renderedItem,
                    width: itemWidth,
                    height: itemHeight,
                    graphics: graphicsContext,
                    createTextNode: createTextNode,
                    createRect: (position, size, color) =>
                        graphicsContext.addChild(createRect(position, size, color)),
                    addDot: (color, position, borderColor) =>
                        enqueueRenderer(
                            '' + color + position.x + position.y + borderColor,
                            (context) => addDot(context, color, position, borderColor),
                            itemRenderContext
                        ),
                    addPopover: (hitArea, renderPopover) =>
                        addPopover(renderedItem, hitArea, renderPopover),
                    enquedRender: (key, render) => enqueueRenderer(key, render, itemRenderContext),
                };

                renderItemContext(item, itemRenderContext);

                window.cancelAnimationFrame(processRenderQueueAnimationFrame.current);
                processRenderQueueAnimationFrame.current = window.requestAnimationFrame(
                    processRenderQueue
                );

                addTextureToCache('items', item[itemKeyProp as keyof T], renderedItem);
            }

            if (
                highlightedItem &&
                highlightedItem[itemKeyProp as keyof T] === item[itemKeyProp as keyof T]
            ) {
                let renderedHighlightedItem = getTextureFromCache(
                    'items',
                    HIGHLIGHTED_ITEM_KEY
                ) as PIXI.Graphics;
                if (!renderedHighlightedItem) {
                    renderedHighlightedItem = new PIXI.Graphics();
                    renderedHighlightedItem.cacheAsBitmap = true;
                    renderedHighlightedItem.lineStyle(4, 0x243746);
                    renderedHighlightedItem.drawRoundedRect(0, 0, itemWidth - 2, itemHeight - 2, 4);
                }

                renderedHighlightedItem.x = x;
                renderedHighlightedItem.y = y;
                stage.current.addChild(renderedHighlightedItem);
            }

            renderItemDescription(item, index, columnIndex);

            renderedItem.x = x;
            renderedItem.y = y;

            stage.current.addChild(renderedItem);
        },
        [
            stage.current,
            getColumnX,
            expandedColumns,
            highlightedItem,
            headerHeight,
            itemHeight,
            itemWidth,
            createTextNode,
            enqueueRenderer,
            getTextureFromCache,
            addTextureToCache,
            processRenderQueueAnimationFrame,
            processRenderQueue,
            renderItemDescription,
            onItemClick,
        ]
    );

    return { renderItem };
};

export default useItem;
