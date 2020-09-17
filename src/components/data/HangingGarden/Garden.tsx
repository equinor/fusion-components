import * as React from 'react';
import * as styles from './styles.less';
import * as PIXI from 'pixi.js';
import {
    HangingGardenColumnIndex,
    HangingGardenProps,
    HangingGardenColumn,
} from './models/HangingGarden';
import {
    getMaxRowCount,
    createRenderedItemDescription,
    getColumnX,
    addDot,
    isHeaderExpanded,
    getHeaderWidth,
    getCalculatedWidth,
    getCalculatedHeight,
    DEFAULT_ITEM_HEIGHT,
    DEFAULT_HEADER_HEIGHT,
    EXPANDED_COLUMN_PADDING,
    HIGHLIGHTED_ITEM_KEY,
} from './utils';
import useScrolling from './hooks/useScrolling';
import usePopover from './hooks/usePopover';
import { useHangingGardenContext } from './hooks/useHangingGardenContext';
import { ItemRenderContext, Size, Position } from './models/RenderContext';
import useRenderQueue from './renderHooks/useRenderQueue';
import useTextNode from './renderHooks/useTextNode';

function Garden<T extends HangingGardenColumnIndex>({
    columns,
    highlightedColumnKey,
    highlightedItem,
    itemKeyProp,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    itemWidth,
    renderHeaderContext,
    renderItemContext,
    getItemDescription,
    onItemClick,
    headerHeight = DEFAULT_HEADER_HEIGHT,
    provideController,
    backgroundColor = 0xffffff,
}: HangingGardenProps<T>) {
    const {
        container,
        canvas,
        stage,
        checkRendererSizeAnimationframe,
        pixiApp,
        maxRowCount,
        setMaxRowCount,
        expandedColumns,
        setExpandedColumns,
        textureCaches,
    } = useHangingGardenContext();

    const {
        clearTextureCaches,
        clearItemTextureCaches,
        addTextureToCache,
        getTextureFromCache,
    } = textureCaches;

    const {
        scrollLeft,
        scrollTop,
        onScroll,
        scrollToHighlightedColumn,
        scrollToHighlightedItem,
    } = useScrolling<T>(canvas, container);

    const { popover, addPopover } = usePopover();

    const {
        enqueueRenderer,
        processRenderQueue,
        processRenderQueueAnimationFrame,
    } = useRenderQueue();

    React.useEffect(() => {
        if (!pixiApp) return;

        pixiApp.stage.addChild(stage.current);
        pixiApp.stop();

        if (provideController) {
            provideController({
                clearGarden: () => {
                    clearTextureCaches();
                    clearItemTextureCaches();
                },
            });
        }
    }, [pixiApp]);

    React.useEffect(() => {
        clearTextureCaches();
        setExpandedColumns({});
        setMaxRowCount(getMaxRowCount(columns));
        scrollToHighlightedColumn(columns, highlightedColumnKey, itemWidth);
        renderGarden();
    }, [columns]);

    React.useEffect(() => {
        checkRendererSize();

        return () => {
            window.cancelAnimationFrame(checkRendererSizeAnimationframe.current);
        };
    }, [columns]);

    React.useEffect(() => {
        scrollToHighlightedItem(columns, highlightedItem, itemKeyProp, itemWidth);
        clearTextureCaches();
        renderGarden();
    }, [highlightedItem]);

    React.useEffect(() => {
        clearTextureCaches();
        renderGarden();
    }, [expandedColumns]);

    React.useEffect(() => {
        clearItemTextureCaches();
    }, [itemHeight, itemWidth]);

    const { createTextNode } = useTextNode();

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

    const getRenderedItemDescription = React.useCallback(
        (item: T) => {
            let itemDescription = getTextureFromCache('descriptions', item[itemKeyProp]);

            if (!itemDescription) {
                const description = getItemDescription(item);
                const textNode = createTextNode(description, 0x243746);
                itemDescription = createRenderedItemDescription(backgroundColor, textNode);
                addTextureToCache('descriptions', item[itemKeyProp], itemDescription);
            }
            return itemDescription as PIXI.Container;
        },
        [backgroundColor, getTextureFromCache, addTextureToCache, getItemDescription]
    );

    const renderItemDescription = React.useCallback(
        (item: T, index: number, columnIndex: number) => {
            const column = columns[columnIndex];
            const expandedColumn = expandedColumns && expandedColumns[column.key];

            if (!expandedColumn || !expandedColumn.isExpanded) {
                return;
            }

            const pixiContainer = getRenderedItemDescription(item);
            pixiContainer.y =
                headerHeight + index * itemHeight + (itemHeight / 2 - pixiContainer.height / 2);
            pixiContainer.x =
                getColumnX(columnIndex, expandedColumns, itemWidth) +
                itemWidth +
                EXPANDED_COLUMN_PADDING;
            stage.current.removeChild(pixiContainer);
            stage.current.addChild(pixiContainer);
        },
        [
            headerHeight,
            columns,
            expandedColumns,
            getColumnX,
            itemHeight,
            itemWidth,
            getRenderedItemDescription,
            stage.current,
        ]
    );

    //let processRenderQueueAnimationFrame: number = 0;
    const renderItem = React.useCallback(
        (item: T, index: number, columnIndex: number) => {
            const x = getColumnX(columnIndex, expandedColumns, itemWidth);
            const y = headerHeight + index * itemHeight;
            let renderedItem = getTextureFromCache('items', item[itemKeyProp]) as PIXI.Container;
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

                addTextureToCache('items', item[itemKeyProp], renderedItem);
            }

            if (highlightedItem && highlightedItem[itemKeyProp] === item[itemKeyProp]) {
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

    const renderHighlightedItem = React.useCallback(() => {
        if (!highlightedItem) {
            const renderedHighlightedItem = getTextureFromCache(
                'items',
                HIGHLIGHTED_ITEM_KEY
            ) as PIXI.Container;

            if (renderedHighlightedItem) {
                stage.current.removeChild(renderedHighlightedItem);
            }

            return;
        }

        const column = columns.find((column) =>
            column.data.find((item) => item[itemKeyProp] === highlightedItem[itemKeyProp])
        );

        if (column) {
            renderItem(
                highlightedItem,
                column.data.findIndex((item) => item[itemKeyProp] === highlightedItem[itemKeyProp]),
                columns.indexOf(column)
            );
        }
    }, [highlightedItem, getTextureFromCache, addTextureToCache, stage.current, columns]);

    const onHeaderClick = React.useCallback(
        (key: string, index: number) => {
            if (expandedColumns && expandedColumns[key]) {
                setExpandedColumns((prevColumns) => ({
                    ...prevColumns,
                    [key]: {
                        ...prevColumns[key],
                        isExpanded: !prevColumns[key].isExpanded,
                    },
                }));

                return;
            }

            const column = columns[index];

            const renderedDescriptions = column.data.map(getRenderedItemDescription);

            const maxWidth = Math.max.apply(
                Math,
                renderedDescriptions.map((description) => description.width)
            );

            setExpandedColumns((prevColumns) => ({
                ...prevColumns,
                [key]: {
                    isExpanded: true,
                    maxWidth,
                    index,
                },
            }));
        },
        [expandedColumns, columns, setExpandedColumns, getRenderedItemDescription]
    );

    const renderHeader = React.useCallback(
        (key: string, index: number) => {
            let renderedHeader = getTextureFromCache('headers', key) as PIXI.Container;

            if (!renderedHeader) {
                const headerWidth = getHeaderWidth(columns[index]?.key, expandedColumns, itemWidth);
                const isHighlighted = highlightedColumnKey === key;
                const isExpanded = isHeaderExpanded(key, expandedColumns);
                renderedHeader = new PIXI.Container();
                renderedHeader.buttonMode = true;
                renderedHeader.interactive = true;
                renderedHeader.on('click', () => onHeaderClick(key, index));
                renderedHeader.on('tap', () => onHeaderClick(key, index));

                // Header container position and size
                const x = getColumnX(index, expandedColumns, itemWidth);
                renderedHeader.x = x;
                renderedHeader.y = 0;
                renderedHeader.width = headerWidth;
                renderedHeader.height = headerHeight;

                // Render header
                const graphicsContext = new PIXI.Graphics();
                graphicsContext.cacheAsBitmap = true;

                renderedHeader.addChild(graphicsContext);
                graphicsContext.beginFill(isHighlighted ? 0x007079 : 0xf7f7f7);
                graphicsContext.drawRoundedRect(0, 0, headerWidth - 2, headerHeight - 2, 4);
                graphicsContext.endFill();

                renderHeaderContext(key, {
                    container: renderedHeader,
                    width: headerWidth,
                    height: headerHeight,
                    graphics: graphicsContext,
                    createTextNode: createTextNode,
                    isHighlighted,
                    isExpanded,
                });

                addTextureToCache('headers', key, renderedHeader);
            }

            // Fixed header when scrolling
            renderedHeader.y = scrollTop.current;

            // Ensure the header is on top (zIndex)
            stage.current.removeChild(renderedHeader);
            stage.current.addChild(renderedHeader);
        },
        [
            getTextureFromCache,
            addTextureToCache,
            onHeaderClick,
            highlightedColumnKey,
            expandedColumns,
            columns,
            itemWidth,
            headerHeight,
            renderHeaderContext,
            stage.current,
            createTextNode,
            scrollTop.current,
        ]
    );

    const renderColumn = React.useCallback(
        (column: HangingGardenColumn<T>, index: number) => {
            const startRow = Math.floor(scrollTop.current / itemHeight);
            const offSetHeigth = container.current?.offsetHeight || 0;
            const endRow = Math.min(
                column.data.length,
                Math.ceil((scrollTop.current + offSetHeigth) / itemHeight)
            );

            for (let i = startRow; i < endRow; i++) {
                renderItem(column.data[i], i, index);
            }

            renderHeader(column.key, index);
        },
        [
            renderItem,
            renderHeader,
            expandedColumns,
            container.current?.offsetHeight,
            scrollTop.current,
            itemHeight,
        ]
    );

    const renderGarden = React.useCallback(() => {
        const oldStage = stage.current;
        stage.current = new PIXI.Container();
        stage.current.x = -scrollLeft.current;
        stage.current.y = -scrollTop.current;

        const offsetWidth = container.current?.offsetWidth || 0;
        const scrollRight = scrollLeft.current + offsetWidth + 10;
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const columnX = getColumnX(i, expandedColumns, itemWidth);
            const width = getHeaderWidth(column.key, expandedColumns, itemWidth);

            if (column && columnX + width >= scrollLeft.current && columnX <= scrollRight) {
                renderColumn(column, i);
            }
        }

        renderHighlightedItem();

        pixiApp?.stage.addChild(stage.current);

        oldStage.destroy();
        pixiApp?.stage.removeChild(oldStage);

        pixiApp?.render();
    }, [
        container.current?.offsetWidth,
        stage.current,
        pixiApp,
        scrollLeft.current,
        scrollTop.current,
        expandedColumns,
        columns,
        renderColumn,
        getColumnX,
        getHeaderWidth,
        renderHighlightedItem,
    ]);

    const checkRendererSize = React.useCallback(() => {
        if (!container.current || !pixiApp) {
            checkRendererSizeAnimationframe.current = window.requestAnimationFrame(
                checkRendererSize
            );
            return;
        }

        const { offsetWidth, offsetHeight } = container.current;
        const { width, height } = pixiApp.renderer;

        if (width !== offsetWidth || height !== offsetHeight) {
            pixiApp.renderer.resize(offsetWidth, offsetHeight);
            renderGarden();
        }

        checkRendererSizeAnimationframe.current = window.requestAnimationFrame(checkRendererSize);
    }, [
        container.current?.offsetWidth,
        container.current?.offsetHeight,
        pixiApp,
        checkRendererSizeAnimationframe.current,
        renderGarden,
    ]);

    const handleScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            onScroll(e, renderGarden);
        },
        [renderGarden, onScroll]
    );

    return (
        <div className={styles.container} ref={container} onScroll={handleScroll}>
            <div
                style={{
                    width: getCalculatedWidth(expandedColumns, columns.length, itemWidth),
                    height: getCalculatedHeight(headerHeight, itemHeight, maxRowCount),
                    minWidth: '100%',
                    minHeight: '100%',
                }}
            >
                <canvas ref={canvas} />
            </div>
            {popover}
        </div>
    );
}

export default Garden;
