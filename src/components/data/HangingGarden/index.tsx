import { useState, useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js-legacy';
import styles from './styles.less';
import useTextureCaches from './renderHooks/useTextureCaches';
import { HangingGardenColumnIndex, HangingGardenProps } from './models/HangingGarden';
import { DEFAULT_ITEM_HEIGHT, DEFAULT_HEADER_HEIGHT } from './utils';
import useHangingGardenData from './hooks/useHangingGardenData';
import useHangingGardenErrorMessage from './hooks/useHangingGardenErrorMessage';
import useHangingGardenGetData from './hooks/useHangingGardenGetData';
import Garden from './Garden';
import HangingGardenContext from './renderHooks/useHangingGardenContext';
import { ExpandedColumns } from './models/ExpandedColumn';
import useScrolling from './renderHooks/useScrolling';
import usePixiApp from './renderHooks/usePixiApp';
import usePopover from './renderHooks/usePopover';

/**
 * The Hanging Garden component renders you a Garden based on supplied parameters.
 *
 * @param columns The data to be used by the Garden, sorted into Columns.
 * @param highlightedColumnKey The Header key of the column that should be highlighted.
 * @param highlightedItem The item object of the Item that should be highlighted.
 * @param itemKeyProp An key in the item object that should be used as an identifier. preferably unique.
 * @param itemHeight The height of items in the garden. All items will be same height. Defaults to 24
 * @param itemWidth  The width of items in the garden. All items will be same widht.
 * @param renderHeaderContext Instructions telling the garden how the headers should look.
 * @param renderItemContext Instructions telling the garden how the items should look.
 * @param getItemDescription Instruction telling the garden how to get what is shown in expanded columns
 * @param onItemClick click handler that will be attached to each item in the garden.
 * @param headerHeight The height of the column header. Defaults to 32,
 * @param provideController Returns a ref. this contains the renderGarden function. Used to trigger rerenders at will.
 * @param backgroundColor Backgroun color for the garden. Defaults to  white(0xffffff),
 */

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
    const [maxRowCount, setMaxRowCount] = useState(0);
    const [expandedColumns, setExpandedColumns] = useState<ExpandedColumns>({});

    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const stage = useRef<PIXI.Container>(new PIXI.Container());

    const scroll = useScrolling<T>(canvas, container, itemKeyProp);
    const textureCaches = useTextureCaches();
    const popover = usePopover();

    const { pixiApp } = usePixiApp(canvas, container, backgroundColor);

    useEffect(() => {
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
export { useHangingGardenData, useHangingGardenErrorMessage, useHangingGardenGetData, PIXI };
export default HangingGarden;
