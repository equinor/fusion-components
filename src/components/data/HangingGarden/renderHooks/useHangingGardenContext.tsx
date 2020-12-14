import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js-legacy';

import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { ItemRenderContext, HeaderRenderContext } from '../models/RenderContext';
import { Scroll } from './useScrolling';
import { UsePopover } from './usePopover';

export interface IHangingGardenContext {
    container: MutableRefObject<HTMLDivElement | null>;
    canvas: MutableRefObject<HTMLCanvasElement | null>;
    stage: MutableRefObject<PIXI.Container>;
    pixiApp: MutableRefObject<PIXI.Application | null>;
    scroll: Scroll<any>;
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
    highlightedColumnKey: string | null;
    getItemDescription: (item: any) => string;
    onItemClick: (item: any) => void;
    renderItemContext: (item: any, context: ItemRenderContext) => void;
    renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
    popover: UsePopover;
}

const HangingGardenContext = createContext<IHangingGardenContext>({} as IHangingGardenContext);

export const useHangingGardenContext = () =>
    useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;
