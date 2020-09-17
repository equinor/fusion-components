import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js';

import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { HangingGardenColumn } from '../models/HangingGarden';

export interface IHangingGardenContext {
    container: MutableRefObject<HTMLDivElement>;
    canvas: MutableRefObject<HTMLCanvasElement>;
    stage: MutableRefObject<PIXI.Container>;
    checkRendererSizeAnimationframe: MutableRefObject<number>;
    pixiApp: PIXI.Application;
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
}

const HangingGardenContext = createContext<IHangingGardenContext>({} as IHangingGardenContext);

export const useHangingGardenContext = () =>
    useContext<IHangingGardenContext>(HangingGardenContext);

export default HangingGardenContext;
