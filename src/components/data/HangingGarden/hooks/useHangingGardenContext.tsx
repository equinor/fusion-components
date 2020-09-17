import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js';

import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { ItemRenderContext, HeaderRenderContext } from '../models/RenderContext';
import { Scroll } from './useScrolling';
import { UsePopover } from './usePopover';

export interface IHangingGardenContext {
    container: MutableRefObject<HTMLDivElement>;
    canvas: MutableRefObject<HTMLCanvasElement>;
    stage: MutableRefObject<PIXI.Container>;
    pixiApp: PIXI.Application;
    scroll: Scroll<unknown>;
    maxRowCount: number;
    setMaxRowCount: Dispatch<React.SetStateAction<number>>;
    expandedColumns: ExpandedColumns;
    setExpandedColumns: Dispatch<SetStateAction<Record<string, ExpandedColumn>>>;
    textureCaches: Caches;
    backgroundColor: number;
    columns: unknown;
    itemKeyProp: unknown;
    itemHeight: number;
    itemWidth: number;
    headerHeight: number;
    highlightedItem: unknown;
    highlightedColumnKey: unknown;
    getItemDescription: (item: unknown) => string;
    onItemClick: (item: unknown) => void;
    renderItemContext: (item: unknown, context: ItemRenderContext) => void;
    renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
    popover: UsePopover;
}

const HangingGardenContext = createContext<IHangingGardenContext>({} as IHangingGardenContext);

export const useHangingGardenContext = () =>
    useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;
