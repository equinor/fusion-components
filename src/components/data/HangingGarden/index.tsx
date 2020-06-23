import * as React from 'react';
import * as styles from './styles.less';
import * as PIXI from 'pixi.js';
import useTextureCaches, { TEXTURE_CACHE_KEYS } from './hooks/useTextureCaches';
import {
    HangingGardenColumnIndex,
    HangingGardenProps,
    ExpandedColumns,
    HangingGardenColumn,
    ItemRenderContext,
    RenderItem,
} from './HangingGardenModels';
import {
    getMaxRowCount,
    createRenderedItemDescription,
    getColumnX,
    addDot,
    getHeaderWidth,
    getCalculatedWidth,
    getCalculatedHeight,
    DEFAULT_ITEM_HEIGHT,
    DEFAULT_HEADER_HEIGHT,
    DEFAULT_ITEM_TEXT_STYLE,
    EXPANDED_COLUMN_PADDING,
    HIGHLIGHTED_ITEM_KEY,
} from './utils';
import useScrolling from './hooks/useScrolling';
import usePopover from './hooks/usePopover';
import useHangingGardenData from './hooks/useHangingGardenData';

function HangingGarden<T extends HangingGardenColumnIndex>({
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
    const [maxRowCount, setMaxRowCount] = React.useState(0);
    const [expandedColumns, setExpandedColumns] = React.useState<ExpandedColumns>({});

    PIXI.utils.skipHello(); // Don't output the pixi message to the console
    PIXI.Ticker.shared.autoStart = false;
    PIXI.settings.ROUND_PIXELS = true;

    const container = React.useRef<HTMLDivElement>(null);
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const stage = React.useRef(new PIXI.Container());
    const checkRendererSizeAnimationframe = React.useRef(0);
    const renderQueue = React.useRef<RenderItem[]>([]);
    const isRendering = React.useRef(false);

    const pixiApp = React.useMemo(() => {
        if (!canvas.current || !container.current) return null;

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
    }, [canvas.current, container.current, backgroundColor]);

    const {
        scrollLeft,
        scrollTop,
        onScroll,
        scrollToHighlightedColumn,
        scrollToHighlightedItem,
    } = useScrolling<T>(canvas, container);

    const { popover, addPopover } = usePopover();

    const {
        clearTextureCaches,
        clearItemTextureCaches,
        addTextureToCache,
        getTextureFromCache,
    } = useTextureCaches();

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

    const getCharTexture = React.useCallback(
        (char: string) => {
            let texture = getTextureFromCache(TEXTURE_CACHE_KEYS.CHARS, char) as PIXI.Texture;
            if (!texture) {
                const text = new PIXI.Text(char, DEFAULT_ITEM_TEXT_STYLE);
                stage.current.addChild(text);
                text.x = -text.width;
                text.y = -text.height;
                texture = text.texture;
                addTextureToCache(TEXTURE_CACHE_KEYS.CHARS, char, texture);
            }

            return texture;
        },
        [getTextureFromCache, addTextureToCache, stage.current]
    );

    const createTextNode = React.useCallback(
        (text: string, color: number) => {
            let cachedText = getTextureFromCache(
                TEXTURE_CACHE_KEYS.TEXTS,
                text + color
            ) as PIXI.RenderTexture;

            if (!cachedText) {
                const chars = text.split('');
                const textContainer = new PIXI.Container();
                textContainer.cacheAsBitmap = true;
                let x = 0;
                chars.forEach((char) => {
                    const textSprite = new PIXI.Sprite(getCharTexture(char));
                    textSprite.x = x;
                    textSprite.y = 0;
                    if (color) {
                        textSprite.tint = color;
                    }
                    textContainer.addChild(textSprite);
                    x = x + textSprite.width;
                });

                cachedText = PIXI.RenderTexture.create({
                    width: textContainer.width,
                    height: textContainer.height,
                });
                pixiApp?.renderer.render(textContainer, cachedText);

                addTextureToCache(TEXTURE_CACHE_KEYS.TEXTS, text + color, cachedText);
            }

            return new PIXI.Sprite(cachedText);
        },
        [addTextureToCache, getTextureFromCache, pixiApp]
    );

    const createRect = React.useCallback(
        (x: number, y: number, width: number, height: number, color: number) => {
            const key = '' + color + x + y + width + height;
            let cachedRect = getTextureFromCache(
                TEXTURE_CACHE_KEYS.RECTS,
                key
            ) as PIXI.RenderTexture;

            if (!cachedRect) {
                const graphics = new PIXI.Graphics();
                graphics.beginFill(color);
                graphics.drawRoundedRect(x, y, width - 2, height - 2, 4);
                graphics.endFill();
                cachedRect = PIXI.RenderTexture.create({ width, height });
                pixiApp?.renderer.render(graphics, cachedRect);
                addTextureToCache(TEXTURE_CACHE_KEYS.RECTS, key, cachedRect);
            }

            return new PIXI.Sprite(cachedRect);
        },
        [pixiApp, getTextureFromCache, addTextureToCache]
    );

    const enqueueRenderer = React.useCallback(
        (key: string, render: (context: ItemRenderContext) => void, context: ItemRenderContext) => {
            renderQueue.current.push({
                key,
                render,
                context,
            });
        },
        [renderQueue.current]
    );

    const processRenderQueue = React.useCallback(() => {
        if (isRendering.current || !renderQueue.current.length) {
            if (!renderQueue.current.length) {
                pixiApp?.render();
            }

            return;
        }

        isRendering.current = true;

        const renderers = renderQueue.current.splice(0, 100);
        renderers.forEach(processRenderer);
        pixiApp?.render();
        isRendering.current = false;
        window.requestAnimationFrame(processRenderQueue);
    }, [isRendering.current, pixiApp, renderQueue.current]);

    const processRenderer = React.useCallback(
        (renderer: RenderItem) => {
            let graphicsContainer = getTextureFromCache(
                TEXTURE_CACHE_KEYS.GRAPHICS,
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
                pixiApp?.renderer.render(graphics, graphicsContainer);
                addTextureToCache(TEXTURE_CACHE_KEYS.GRAPHICS, renderer.key, graphicsContainer);
            }

            renderer.context.container.addChild(new PIXI.Sprite(graphicsContainer));
        },
        [getTextureFromCache, addTextureToCache, pixiApp]
    );

    const getRenderedItemDescription = React.useCallback(
        (item: T) => {
            let itemDescription = getTextureFromCache(
                TEXTURE_CACHE_KEYS.DESCRIPTIONS,
                item[itemKeyProp]
            );

            if (!itemDescription) {
                const description = getItemDescription(item);
                const textNode = createTextNode(description, 0x243746);
                itemDescription = createRenderedItemDescription(backgroundColor, textNode);
                addTextureToCache(
                    TEXTURE_CACHE_KEYS.DESCRIPTIONS,
                    item[itemKeyProp],
                    itemDescription
                );
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

    let processRenderQueueAnimationFrame: number = 0;
    const renderItem = React.useCallback(
        (item: T, index: number, columnIndex: number) => {
            const x = getColumnX(columnIndex, expandedColumns, itemWidth);
            const y = headerHeight + index * itemHeight;

            let renderedItem = getTextureFromCache(
                TEXTURE_CACHE_KEYS.ITEMS,
                item[itemKeyProp]
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
                    createRect: (x, y, width, height, color) =>
                        graphicsContext.addChild(createRect(x, y, width, height, color)),
                    addDot: (color, x, y, borderColor) =>
                        enqueueRenderer(
                            '' + color + x + y + borderColor,
                            (context) => addDot(context, color, x, y, borderColor),
                            itemRenderContext
                        ),
                    addPopover: (hitArea, renderPopover) =>
                        addPopover(renderedItem, hitArea, renderPopover),
                    enquedRender: (key, render) => enqueueRenderer(key, render, itemRenderContext),
                };

                renderItemContext(item, itemRenderContext);

                window.cancelAnimationFrame(processRenderQueueAnimationFrame);
                processRenderQueueAnimationFrame = window.requestAnimationFrame(processRenderQueue);

                addTextureToCache(TEXTURE_CACHE_KEYS.ITEMS, item[itemKeyProp], renderedItem);
            }

            if (highlightedItem && highlightedItem[itemKeyProp] === item[itemKeyProp]) {
                let renderedHighlightedItem = getTextureFromCache(
                    TEXTURE_CACHE_KEYS.ITEMS,
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
                TEXTURE_CACHE_KEYS.ITEMS,
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
            let renderedHeader = getTextureFromCache(
                TEXTURE_CACHE_KEYS.HEADERS,
                key
            ) as PIXI.Container;

            if (!renderedHeader) {
                const headerWidth = getHeaderWidth(columns[index]?.key, expandedColumns, itemWidth);
                const isHighlighted = highlightedColumnKey === key;
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
                });

                addTextureToCache(TEXTURE_CACHE_KEYS.HEADERS, key, renderedHeader);
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

export {
    HangingGardenProps,
    HangingGardenColumn,
    ItemRenderContext,
    RenderItem,
} from './HangingGardenModels';
export { useHangingGardenData };
export default HangingGarden;
