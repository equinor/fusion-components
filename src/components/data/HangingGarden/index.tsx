import * as React from 'react';
import * as styles from './styles.less';
import * as PIXI from 'pixi.js';
import useTextureCaches from './hooks/useTextureCaches';
import {
    HangingGardenColumnIndex,
    HangingGardenProps,
    ExpandedColumns,
    HangingGardenColumn,
    ItemRenderContext,
    RenderItem,
    Size,
    Position,
} from './HangingGardenModels';
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
    DEFAULT_ITEM_TEXT_STYLE,
    EXPANDED_COLUMN_PADDING,
    HIGHLIGHTED_ITEM_KEY,
} from './utils';
import useScrolling from './hooks/useScrolling';
import usePopover from './hooks/usePopover';
import useHangingGardenData from './hooks/useHangingGardenData';
import Garden from './Garden';
import HangingGardenContext from './hooks/useHangingGardenContext';

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
    PIXI.utils.skipHello(); // Don't output the pixi message to the console
    PIXI.Ticker.shared.autoStart = false;
    PIXI.settings.ROUND_PIXELS = true;

    const [maxRowCount, setMaxRowCount] = React.useState(0);
    const [expandedColumns, setExpandedColumns] = React.useState<ExpandedColumns>({});

    const textureCaches = useTextureCaches();

    const container = React.useRef<HTMLDivElement>(null);
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const stage = React.useRef<PIXI.Container>(new PIXI.Container());
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

    return (
        <div style={{ display: 'flex', flex: '1 1 auto', height: '100%', minWidth: 0 }}>
            {columns.length && (
                <HangingGardenContext.Provider
                    value={{
                        container,
                        canvas,
                        stage,
                        checkRendererSizeAnimationframe,
                        renderQueue,
                        isRendering,
                        pixiApp,
                        maxRowCount,
                        setMaxRowCount,
                        expandedColumns,
                        setExpandedColumns,
                        textureCaches,
                    }}
                >
                    <Garden<T>
                        columns={columns}
                        highlightedColumnKey={highlightedColumnKey}
                        highlightedItem={highlightedItem}
                        itemKeyProp={itemKeyProp}
                        itemWidth={itemWidth}
                        itemHeight={itemHeight}
                        renderItemContext={renderItemContext}
                        getItemDescription={getItemDescription}
                        onItemClick={onItemClick}
                        headerHeight={headerHeight}
                        renderHeaderContext={renderHeaderContext}
                        provideController={provideController}
                        backgroundColor={backgroundColor}
                    />
                </HangingGardenContext.Provider>
            )}
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
