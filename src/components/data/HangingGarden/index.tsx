import * as React from 'react';
import * as styles from './styles.less';
import * as PIXI from 'pixi.js';
import useTextureCaches, { TEXTURE_CACHE_KEYS } from './useTextureCaches';
import { usePopoverRef } from '@equinor/fusion-components';

const DEFAULT_ITEM_HEIGHT = 24;
const DEFAULT_HEADER_HEIGHT = 32;
const TOOLTIP_PADDING = 4;
const TOOLTIP_MARGIN = 8;
const EXPANDED_COLUMN_PADDING = 8;
const HIGHLIGHTED_ITEM_KEY = 'highlighted-item';

const DEFAULT_ITEM_TEXT_STYLE = new PIXI.TextStyle({
    fontFamily: 'Equinor',
    fill: 'white',
    fontSize: 13,
    align: 'center',
});

export const createTextStyle = (style: PIXI.TextStyle) => new PIXI.TextStyle(style);

export type RenderItem = {
    key: string;
    render: (context: ItemRenderTemplateData) => void;
    context: ItemRenderTemplateData;
};

export type HangingGardenColumn<T> = {
    key: string;
    data: T[];
};

export type PopOver = {
    top: number;
    left: number;
    render: () => JSX.Element;
};

export type ExpandedColumn = {
    isExpanded: boolean;
    maxWidth: number;
    index: number;
};

export type ExpandedColumns = { [key: string]: ExpandedColumn };

export type RenderHeaderTemplateData = {
    container: PIXI.Container;
    width: number;
    height: number;
    graphics: PIXI.Graphics;
    createTextNode: (text: string, color: number) => PIXI.Sprite;
    isHighlighted: boolean;
};

export type ItemRenderTemplateData = {
    container: PIXI.Container;
    width: number;
    height: number;
    graphics: PIXI.Graphics;
    createTextNode: (text: string, color: number) => PIXI.Sprite;
    createRect: (x: number, y: number, width: number, height: number, color: number) => void;
    addDot: (color: number, x: number, y?: number, borderColor?: number) => void;
    addPopover: (hitArea: any, renderPopover: () => JSX.Element) => void;
    enquedRender: (key: string, render: (context: ItemRenderTemplateData) => void) => void;
};

export type HangingGardenColumnIndex = { [key: string]: any };

export type HangingGardenProps<T extends HangingGardenColumnIndex> = {
    hangingGardencolumns: HangingGardenColumn<T>[];
    highlightedColumnKey: string;
    highlightedItem: T | null;
    itemKeyProp: keyof T;
    itemWidth: number;
    itemHeight: number;
    getItemDescription: (item: T) => string;
    onItemClick: (item: T) => void;
    headerHeight: number;
    renderItemTemplate: (item: T, context: ItemRenderTemplateData) => void;
    renderHeaderTemplate: (key: string, context: RenderHeaderTemplateData) => void;
    provideController?: any;
    backgroundColor?: number;
};

function HangingGarden<T extends HangingGardenColumnIndex>({
    hangingGardencolumns,
    highlightedColumnKey,
    highlightedItem,
    itemKeyProp,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    itemWidth,
    renderHeaderTemplate,
    renderItemTemplate,
    getItemDescription,
    onItemClick,
    headerHeight = DEFAULT_HEADER_HEIGHT,
    provideController,
    backgroundColor = 0xffffff,
}: HangingGardenProps<T>) {
    const [columns, setColumns] = React.useState<HangingGardenColumn<T>[]>(hangingGardencolumns);
    const [revisions, setRevisions] = React.useState(0);
    const [maxRowCount, setMaxRowCount] = React.useState(0);
    const [expandedColumns, setExpandedColumns] = React.useState<ExpandedColumns>({});
    const [popover, setPopover] = React.useState<PopOver | null>(null);
    const [scrollTop, SetScrollTop] = React.useState(0);
    const [scrollLeft, SetScrollLeft] = React.useState(0);

    const {
        clearTextureCaches,
        clearItemTextureCaches,
        addTextureToCache,
        getTextureKeyFromCache,
    } = useTextureCaches();

    const container = React.useRef<HTMLDivElement>(null);
    const canvas = React.useRef<HTMLCanvasElement>(null);
    PIXI.utils.skipHello(); // Don't output the pixi message to the console
    PIXI.Ticker.shared.autoStart = false;
    PIXI.settings.ROUND_PIXELS = true;

    const pixiApp = new PIXI.Application({
        view: canvas.current || undefined,
        width: container.current?.offsetWidth,
        height: container.current?.offsetHeight,
        backgroundColor,
        resolution: 1,
        antialias: true,
        transparent: true,
        sharedTicker: true,
    });

    let stage = new PIXI.Container();

    React.useEffect(() => {
        pixiApp.stage.addChild(stage);
        pixiApp.stop();

        const didScroll = scrollToHighlightedColumn();

        // If we did scroll to the highlighted item, the scroll handler will render for us.
        // No need to render twice
        if (!didScroll) {
            window.requestAnimationFrame(() => {
                console.log('render garden 1');
                renderGarden();
            });
        }

        checkRendererSize();

        if (provideController) {
            provideController({
                clearGarden: () => {
                    clearGarden();
                    clearItemTextureCaches();
                },
            });
        }
    }, []);

    React.useEffect(() => {
        console.log('hangingGardencolumns running');
        if (hangingGardencolumns === columns) return;
        console.log('hangingGardencolumns setting columns', columns);
        setColumns(hangingGardencolumns);
        setMaxRowCount(getMaxRowCount(hangingGardencolumns));
        setRevisions((revision) => revision++);
    }, [hangingGardencolumns]);

    React.useEffect(() => {
        clearGarden();
        console.log('render garden 2');
        console.log('columns changes', columns);
        renderGarden();
    }, [columns]);

    React.useEffect(() => {
        scrollToHighlightedColumn();
        clearGarden();
        console.log('render garden 3');
        renderGarden();
    }, [highlightedItem]);

    React.useEffect(() => {
        clearGarden();
        console.log('render garden 4');
        renderGarden();
    }, [expandedColumns]);

    React.useEffect(() => {
        clearItemTextureCaches();
    }, [itemHeight, itemWidth]);

    const getMaxRowCount = (columns: HangingGardenColumn<T>[]) => {
        return Math.max.apply(
            Math,
            columns.map((column) => column.data.length)
        );
    };

    const scrollToHighlightedColumn = () => {
        if (!container.current) return;

        if (container.current.scrollWidth <= container.current.offsetWidth) {
            SetScrollLeft((container.current.scrollLeft = 0));
            return false;
        }

        let highlightedColumnIndex = -1;
        if (highlightedItem) {
            highlightedColumnIndex = columns.findIndex(
                (column) =>
                    column.data.findIndex(
                        (item) => item[itemKeyProp] === highlightedItem[itemKeyProp]
                    ) > -1
            );
        }

        if (highlightedColumnKey && highlightedColumnIndex === -1) {
            highlightedColumnIndex = columns.findIndex(
                (column) => column.key === highlightedColumnKey
            );
        }

        if (highlightedColumnIndex !== -1) {
            SetScrollLeft(
                (container.current.scrollLeft =
                    highlightedColumnIndex > -1
                        ? highlightedColumnIndex * itemWidth -
                          container.current.offsetWidth / 2 +
                          itemWidth / 2
                        : 0)
            );
        } else {
            SetScrollLeft((container.current.scrollLeft = 0));
        }

        return scrollLeft !== 0;
    };

    const checkRendererSize = () => {
        (window as any).requestIdleCallback(() => {
            if (!container.current) {
                return window.requestAnimationFrame(checkRendererSize);
            }

            const { offsetWidth, offsetHeight } = container.current;
            const { width, height } = pixiApp.renderer;

            if (width !== offsetWidth || height !== offsetHeight) {
                pixiApp.renderer.resize(offsetWidth, offsetHeight);
                console.log('render garden 5');
                renderGarden();
            }

            window.requestAnimationFrame(checkRendererSize);
        });
    };

    const clearGarden = () => {
        clearTextureCaches();
    };

    const getCharTexture = (char: string) => {
        let texture = getTextureKeyFromCache(TEXTURE_CACHE_KEYS.CHARS, char) as PIXI.Texture;
        if (!texture) {
            const text = new PIXI.Text(char, DEFAULT_ITEM_TEXT_STYLE);
            stage.addChild(text);
            text.x = -text.width;
            text.y = -text.height;
            texture = text.texture;
            addTextureToCache(TEXTURE_CACHE_KEYS.CHARS, char, texture);
        }

        return texture;
    };

    const createRoundedRectMask = (width: number, height: number) => {
        const mask = new PIXI.Graphics();
        mask.cacheAsBitmap = true;
        mask.beginFill(0xff3300);
        mask.drawRoundedRect(1, 1, width - 2, height - 2, 4);
        mask.endFill();
        return mask;
    };

    const getItemMask = () => {
        const key = 'item';
        let mask = getTextureKeyFromCache(TEXTURE_CACHE_KEYS.MASKS, key);
        if (!mask) {
            mask = createRoundedRectMask(itemWidth, itemHeight);
            addTextureToCache(TEXTURE_CACHE_KEYS.MASKS, key, mask);
        }

        return mask as PIXI.Graphics;
    };

    const getHeaderMask = (index: number) => {
        const key = `header-${index}`;
        let mask = getTextureKeyFromCache(TEXTURE_CACHE_KEYS.MASKS, key);
        if (!mask) {
            const headerWidth = getHeaderWidth(index);
            mask = createRoundedRectMask(headerWidth, headerHeight);
            addTextureToCache(TEXTURE_CACHE_KEYS.MASKS, key, mask);
        }

        return mask as PIXI.Graphics;
    };

    const createTextNode = (text: string, color: number) => {
        let cachedText = getTextureKeyFromCache(
            TEXTURE_CACHE_KEYS.TEXTS,
            text + color
        ) as PIXI.RenderTexture;

        if (!cachedText) {
            const chars = text.split('');
            const container = new PIXI.Container();
            container.cacheAsBitmap = true;
            let x = 0;
            chars.forEach((char) => {
                const textSprite = new PIXI.Sprite(getCharTexture(char));
                textSprite.x = x;
                textSprite.y = 0;
                if (color) {
                    textSprite.tint = color;
                }
                container.addChild(textSprite);
                x = x + textSprite.width;
            });

            cachedText = PIXI.RenderTexture.create({
                width: container.width,
                height: container.height,
            });
            pixiApp.renderer.render(container, cachedText);

            addTextureToCache(TEXTURE_CACHE_KEYS.TEXTS, text + color, cachedText);
        }

        return new PIXI.Sprite(cachedText);
    };

    const createRect = (x: number, y: number, width: number, height: number, color: number) => {
        const key = '' + color + x + y + width + height;
        let cachedRect = getTextureKeyFromCache(
            TEXTURE_CACHE_KEYS.RECTS,
            key
        ) as PIXI.RenderTexture;

        if (!cachedRect) {
            const graphics = new PIXI.Graphics();
            graphics.beginFill(color);
            graphics.drawRect(x, y, width, height);
            cachedRect = PIXI.RenderTexture.create({ width, height });
            pixiApp.renderer.render(graphics, cachedRect);
            addTextureToCache(TEXTURE_CACHE_KEYS.RECTS, key, cachedRect);
        }

        return new PIXI.Sprite(cachedRect);
    };
    /* NOT IN USE CAN BE REMOVED ? 
    
    const getRenderedTooltip = (title: string) => {
        let renderedTooltip = getTextureFromCache(TEXTURE_CACHE_KEYS.TOOLTIPS) as TooltipsCache;

        if (!renderedTooltip) {
            renderedTooltip = new PIXI.Container();
            renderedTooltip.cacheAsBitmap = true;

            const tooltipText = createTextNode(title, 0xffffff);
            tooltipText.x = tooltipText.y = TOOLTIP_PADDING;

            const graphics = new PIXI.Graphics();
            const height = tooltipText.height + TOOLTIP_PADDING * 2;
            graphics.beginFill(0x243746);
            graphics.drawRoundedRect(0, 0, tooltipText.width + TOOLTIP_PADDING * 2, height, 4);

            graphics.endFill();

            renderedTooltip.addChild(graphics);
            renderedTooltip.addChild(tooltipText);
        }

        return renderedTooltip;
    };

    let tooltipTimer: NodeJS.Timeout;
    const addTooltip = (container: PIXI.Container, title: string) => {
        container.interactive = true;

        let tooltip: PIXI.Container;
        container.on('mouseover', () => {
            clearTimeout(tooltipTimer);
            tooltipTimer = setTimeout(() => {
                tooltip = getRenderedTooltip(title);
                tooltip.x =
                    container.getGlobalPosition().x + container.width + TOOLTIP_MARGIN + scrollLeft;
                tooltip.y = container.getGlobalPosition().y + (tooltip.height / 2) * -1;
                stage.addChild(tooltip);
            }, 500);
        });

        container.on('mouseout', () => {
            clearTimeout(tooltipTimer);
            if (tooltip) {
                stage.removeChild(tooltip);
            }
        });
    };

    */

    const addPopover = (
        container: PIXI.Container,
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
                setPopover({
                    top: container.y + hitArea.height,
                    left: container.x + hitArea.x + TOOLTIP_MARGIN,
                    render: renderPopover,
                });
            }, 500);
        });

        hitAreaContainer.on('mouseout', () => {
            clearTimeout(timer);
            setPopover(null);
        });

        container.addChild(hitAreaContainer);
    };

    const addDot = (
        context: ItemRenderTemplateData,
        color: number,
        x: number,
        y?: number,
        borderColor = 0xffffff
    ) => {
        const circle = new PIXI.Circle(x, y, 2);

        context.graphics.lineStyle(1, borderColor, 1, 1);
        context.graphics.beginFill(color);
        context.graphics.drawShape(circle);
        context.graphics.endFill();
        context.graphics.lineStyle(0);
    };

    const renderGarden = () => {
        const oldStage = stage;

        stage = new PIXI.Container();

        stage.x = -scrollLeft;
        stage.y = -scrollTop;

        const offsetWidth = container.current?.offsetWidth || 0;
        const scrollRight = scrollLeft + offsetWidth;
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const columnX = getColumnX(i);
            const width = getHeaderWidth(i);

            if (column && columnX + width >= scrollLeft && columnX <= scrollRight) {
                renderColumn(column, i);
            }
        }

        renderHighlightedItem();
        pixiApp.stage.addChild(stage);

        oldStage.destroy();
        pixiApp.stage.removeChild(oldStage);

        pixiApp.render();
    };

    const getColumnX = (index: number) => {
        let expandedWithBeforeIndex = 0;
        for (const key in expandedColumns) {
            const expandedColumn = expandedColumns[key];
            if (expandedColumn.index < index && expandedColumn.isExpanded) {
                expandedWithBeforeIndex =
                    expandedWithBeforeIndex + expandedColumn.maxWidth + EXPANDED_COLUMN_PADDING * 2;
            }
        }

        return index * itemWidth + expandedWithBeforeIndex;
    };

    const getHeaderWidth = (index: number) => {
        const column = columns[index];

        if (column) {
            const expandedColumn = expandedColumns && expandedColumns[column.key];

            if (expandedColumn && expandedColumn.isExpanded) {
                return itemWidth + expandedColumn.maxWidth + EXPANDED_COLUMN_PADDING * 2;
            }
        }

        return itemWidth;
    };

    const renderColumn = (column: HangingGardenColumn<T>, index: number) => {
        const startRow = Math.floor(scrollTop / itemHeight);
        const offSetHeigth = container.current?.offsetHeight || 0;
        const endRow = Math.min(
            column.data.length,
            Math.ceil((scrollTop + offSetHeigth) / itemHeight)
        );

        for (let i = startRow; i < endRow; i++) {
            renderItem(column.data[i], i, index);
        }

        renderHeader(column.key, index);
    };

    const getRenderedItemDescription = (item: T) => {
        const description = getItemDescription(item);
        let container = getTextureKeyFromCache(TEXTURE_CACHE_KEYS.DESCRIPTIONS, item[itemKeyProp]);
        if (!container) {
            container = new PIXI.Container();
            container.cacheAsBitmap = true;
            const textNode = createTextNode(description, 0x243746);

            // Adding a "transparent" background graphic improves the quality of the description text
            const graphics = new PIXI.Graphics();
            graphics.beginFill(backgroundColor);
            graphics.drawRect(0, 0, textNode.width, textNode.height);
            container.addChild(graphics);
            container.addChild(textNode);
            addTextureToCache(TEXTURE_CACHE_KEYS.DESCRIPTIONS, item[itemKeyProp], container);
        }

        return container;
    };

    const onHeaderClick = (key: string, index: number) => {
        if (expandedColumns && expandedColumns[key]) {
            setExpandedColumns({
                ...expandedColumns,
                [key]: {
                    ...expandedColumns[key],
                    isExpanded: !expandedColumns[key].isExpanded,
                },
            });

            return;
        }

        const column = columns[index];

        const renderedDescriptions = column.data.map(getRenderedItemDescription);

        const maxWidth = Math.max.apply(
            Math,
            renderedDescriptions.map((container) => container.width)
        );

        setExpandedColumns({
            ...expandedColumns,
            [key]: {
                isExpanded: true,
                maxWidth,
                index,
            },
        });
    };

    const renderHeader = (key: string, index: number) => {
        let renderedHeader = getTextureKeyFromCache(
            TEXTURE_CACHE_KEYS.HEADERS,
            key
        ) as PIXI.Container;

        if (!renderedHeader) {
            const headerWidth = getHeaderWidth(index);
            const isHighlighted = highlightedColumnKey === key;
            renderedHeader = new PIXI.Container();
            renderedHeader.buttonMode = true;
            renderedHeader.interactive = true;
            renderedHeader.on('click', () => onHeaderClick(key, index));
            renderedHeader.on('tap', () => onHeaderClick(key, index));

            // Header container position and size
            const x = getColumnX(index);
            renderedHeader.x = x;
            renderedHeader.y = 0;
            renderedHeader.width = headerWidth;
            renderedHeader.height = headerHeight;

            // Render header
            const graphicsContext = new PIXI.Graphics();
            graphicsContext.cacheAsBitmap = true;
            renderedHeader.addChild(graphicsContext);
            graphicsContext.beginFill(isHighlighted ? 0x007079 : 0xf7f7f7);
            graphicsContext.drawRect(1, 1, headerWidth - 2, headerHeight - 2);
            graphicsContext.endFill();

            renderHeaderTemplate(key, {
                container: renderedHeader,
                width: headerWidth,
                height: headerHeight,
                graphics: graphicsContext,
                createTextNode: createTextNode,
                isHighlighted,
            });

            const mask = getHeaderMask(index);
            graphicsContext.mask = mask;

            addTextureToCache(TEXTURE_CACHE_KEYS.HEADERS, key, renderedHeader);
        }

        // Fixed header when scrolling
        renderedHeader.y = scrollTop;

        // Ensure the header is on top (zIndex)
        stage.removeChild(renderedHeader);
        stage.addChild(renderedHeader);
    };

    const renderHighlightedItem = () => {
        if (!highlightedItem) {
            const renderedHighlightedItem = getTextureKeyFromCache(
                TEXTURE_CACHE_KEYS.ITEMS,
                HIGHLIGHTED_ITEM_KEY
            ) as PIXI.Container;

            if (renderedHighlightedItem) {
                stage.removeChild(renderedHighlightedItem);
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
    };

    const renderItemDescription = (item: T, index: number, columnIndex: number) => {
        const column = columns[columnIndex];
        const expandedColumn = expandedColumns && expandedColumns[column.key];

        if (!expandedColumn || !expandedColumn.isExpanded) {
            return;
        }

        const pixiContainer = getRenderedItemDescription(item) as PIXI.Container;
        pixiContainer.y =
            headerHeight + index * itemHeight + (itemHeight / 2 - pixiContainer.height / 2);
        pixiContainer.x = getColumnX(columnIndex) + itemWidth + EXPANDED_COLUMN_PADDING;
        stage.removeChild(pixiContainer);
        stage.addChild(pixiContainer);
    };

    const renderQueue: RenderItem[] = [];
    const enqueueRenderer = (
        key: string,
        render: (context: ItemRenderTemplateData) => void,
        context: ItemRenderTemplateData
    ) => {
        renderQueue.push({
            key,
            render,
            context,
        });
    };

    let isRendering = false;
    const processRenderQueue = () => {
        if (isRendering || !renderQueue.length) {
            if (!renderQueue.length) {
                pixiApp.render();
            }

            return;
        }

        isRendering = true;

        const renderers = renderQueue.splice(0, 100);
        renderers.forEach(processRenderer);
        pixiApp.render();
        isRendering = false;
        window.requestAnimationFrame(processRenderQueue);
    };

    const processRenderer = (renderer: RenderItem) => {
        let container = getTextureKeyFromCache(
            TEXTURE_CACHE_KEYS.GRAPHICS,
            renderer.key
        ) as PIXI.RenderTexture;

        if (!container) {
            const graphics = new PIXI.Graphics();
            graphics.cacheAsBitmap = false;
            renderer.render({
                ...renderer.context,
                graphics,
            });

            container = PIXI.RenderTexture.create({
                width: renderer.context.width,
                height: renderer.context.height,
            });
            pixiApp.renderer.render(graphics, container);
            addTextureToCache(TEXTURE_CACHE_KEYS.GRAPHICS, renderer.key, container);
        }

        renderer.context.container.addChild(new PIXI.Sprite(container));
    };

    let processRenderQueueAnimationFrame: number = 0;
    const renderItem = (item: T, index: number, columnIndex: number) => {
        const x = getColumnX(columnIndex);
        const y = headerHeight + index * itemHeight;

        let renderedItem = getTextureKeyFromCache(
            TEXTURE_CACHE_KEYS.ITEMS,
            item[itemKeyProp]
        ) as PIXI.Container;
        if (!renderedItem) {
            renderedItem = new PIXI.Container();
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

            const itemRenderContext: ItemRenderTemplateData = {
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

            renderItemTemplate(item, itemRenderContext);

            window.cancelAnimationFrame(processRenderQueueAnimationFrame);
            processRenderQueueAnimationFrame = window.requestAnimationFrame(processRenderQueue);

            const mask = getItemMask();
            graphicsContext.mask = mask;

            addTextureToCache(TEXTURE_CACHE_KEYS.ITEMS, item[itemKeyProp], renderedItem);
        }

        if (highlightedItem && highlightedItem[itemKeyProp] === item[itemKeyProp]) {
            let renderedHighlightedItem = getTextureKeyFromCache(
                TEXTURE_CACHE_KEYS.ITEMS,
                HIGHLIGHTED_ITEM_KEY
            ) as PIXI.Graphics;
            if (!renderedHighlightedItem) {
                renderedHighlightedItem = new PIXI.Graphics();
                renderedHighlightedItem.cacheAsBitmap = true;
                renderedHighlightedItem.lineStyle(4, 0x243746);
                renderedHighlightedItem.drawRoundedRect(1, 1, itemWidth - 2, itemHeight - 2, 4);
            }

            renderedHighlightedItem.x = x;
            renderedHighlightedItem.y = y;
            stage.addChild(renderedHighlightedItem);
        }

        renderItemDescription(item, index, columnIndex);

        renderedItem.x = x;
        renderedItem.y = y;
        stage.addChild(renderedItem);
    };

    const getCalculatedWidth = () => {
        let expandedWidth = 0;
        for (const key in expandedColumns) {
            const expandedColumn = expandedColumns[key];
            if (expandedColumn.isExpanded) {
                expandedWidth =
                    expandedWidth + expandedColumn.maxWidth + EXPANDED_COLUMN_PADDING * 2;
            }
        }

        return columns.length * itemWidth + expandedWidth;
    };

    const getCalculatedHeight = () => {
        if (!maxRowCount) {
            return 0;
        }

        return headerHeight + itemHeight * maxRowCount;
    };

    let isScrolling = false;
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (isScrolling || !canvas.current) {
            return;
        }

        isScrolling = true;

        SetScrollLeft(e.currentTarget.scrollLeft);
        SetScrollTop(e.currentTarget.scrollTop);
        canvas.current.style.transform = `translate(${e.currentTarget.scrollLeft}px, ${e.currentTarget.scrollTop}px)`;

        window.requestAnimationFrame(() => {
            console.log('render garden 6', columns);
            renderGarden();
            isScrolling = false;
        });
    };

    const RenderPopover: React.FC = () => {
        if (!popover) return null;

        const [popOverRef] = usePopoverRef(popover.render());

        return <span className={styles.popoverContainer} ref={popOverRef} />;
    };

    return (
        <div className={styles.container} ref={container} onScroll={handleScroll}>
            <div
                style={{
                    width: getCalculatedWidth(),
                    height: getCalculatedHeight(),
                    minWidth: '100%',
                    minHeight: '100%',
                }}
            >
                <canvas ref={canvas} />
            </div>
            <RenderPopover />
        </div>
    );
}

export default HangingGarden;
