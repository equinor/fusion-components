import * as React from 'react';
import * as PIXI from 'pixi.js';
import * as styles from './styles.less';
import useTextureCaches from './hooks/useTextureCaches';
import { HangingGardenColumnIndex, HangingGardenProps } from './models/HangingGarden';
import { DEFAULT_ITEM_HEIGHT, DEFAULT_HEADER_HEIGHT } from './utils';
import useHangingGardenData from './hooks/useHangingGardenData';
import Garden from './Garden';
import HangingGardenContext from './hooks/useHangingGardenContext';
import { ExpandedColumns } from './models/ExpandedColumn';
import useScrolling from './hooks/useScrolling';
import usePixiApp from './renderHooks/usePixiApp';
import usePopover from './hooks/usePopover';

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

    const container = React.useRef<HTMLDivElement>(null);
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const stage = React.useRef<PIXI.Container>(new PIXI.Container());

    const scroll = useScrolling<T>(canvas, container, itemKeyProp);
    const textureCaches = useTextureCaches();
    const popover = usePopover();

    const { pixiApp } = usePixiApp(canvas, container, backgroundColor);

    React.useEffect(() => {
        textureCaches.clearItemTextureCaches();
    }, [itemHeight, itemWidth]);

    return (
        <div className={styles.container}>
            {columns.length && (
                <HangingGardenContext.Provider
                    value={{
                        container,
                        canvas,
                        stage,
                        pixiApp,
                        scroll,
                        maxRowCount,
                        setMaxRowCount,
                        expandedColumns,
                        setExpandedColumns,
                        textureCaches,
                        backgroundColor,
                        columns,
                        itemKeyProp,
                        itemHeight,
                        itemWidth,
                        headerHeight,
                        highlightedItem,
                        highlightedColumnKey,
                        getItemDescription,
                        onItemClick,
                        renderItemContext,
                        renderHeaderContext,
                        popover,
                    }}
                >
                    <Garden<T> provideController={provideController} />
                </HangingGardenContext.Provider>
            )}
        </div>
    );
}

export { HangingGardenProps, HangingGardenColumn } from './models/HangingGarden';
export { ItemRenderContext, RenderItem } from './models/RenderContext';
export { useHangingGardenData };
export default HangingGarden;
