import { createContext, useContext, MutableRefObject, Dispatch, SetStateAction } from 'react';
import * as PIXI from 'pixi.js';

import { Caches } from './useTextureCaches';
import { ExpandedColumns, ExpandedColumn } from '../models/ExpandedColumn';
import { RenderItem } from '../models/RenderContext';

export interface IHangingGardenContext {
    container: MutableRefObject<HTMLDivElement>;
    canvas: MutableRefObject<HTMLCanvasElement>;
    stage: MutableRefObject<PIXI.Container>;
    checkRendererSizeAnimationframe: MutableRefObject<number>;
    renderQueue: MutableRefObject<RenderItem[]>;
    isRendering: MutableRefObject<boolean>;
    pixiApp: PIXI.Application;
    maxRowCount: number;
    setMaxRowCount: Dispatch<React.SetStateAction<number>>;
    expandedColumns: ExpandedColumns;
    setExpandedColumns: Dispatch<SetStateAction<Record<string, ExpandedColumn>>>;
    textureCaches: Caches;
}

const HangingGardenContext = createContext<IHangingGardenContext>({} as IHangingGardenContext);

export const useHangingGardenContext = () => useContext(HangingGardenContext);

export default HangingGardenContext;
