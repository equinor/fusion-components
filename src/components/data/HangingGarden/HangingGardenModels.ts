import * as PIXI from 'pixi.js';

export type ExpandedColumn = {
    isExpanded: boolean;
    maxWidth: number;
    index: number;
};

export type ExpandedColumns = { [key: string]: ExpandedColumn };

export type RenderContext = {
    container: PIXI.Container;
    width: number;
    height: number;
    graphics: PIXI.Graphics;
    createTextNode: (text: string, color: number) => PIXI.Sprite;
};

export type HeaderRenderContext = RenderContext & {
    isHighlighted: boolean;
};

export type ItemRenderContext = RenderContext & {
    createRect: (x: number, y: number, width: number, height: number, color: number) => void;
    addDot: (color: number, x: number, y?: number, borderColor?: number) => void;
    addPopover: (hitArea: any, renderPopover: () => JSX.Element) => void;
    enquedRender: (key: string, render: (context: ItemRenderContext) => void) => void;
};

export type RenderItem = {
    key: string;
    render: (context: ItemRenderContext) => void;
    context: ItemRenderContext;
};

export type HangingGardenColumn<T> = {
    key: string;
    data: T[];
};

export type HangingGardenColumnIndex = { [key: string]: any };

export type HangingGardenProps<T extends HangingGardenColumnIndex> = {
    columns: HangingGardenColumn<T>[];
    highlightedColumnKey: string;
    highlightedItem: T | null;
    itemKeyProp: keyof T;
    itemWidth: number;
    itemHeight: number;
    getItemDescription: (item: T) => string;
    onItemClick: (item: T) => void;
    headerHeight: number;
    renderItemContext: (item: T, context: ItemRenderContext) => void;
    renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
    provideController?: any;
    backgroundColor?: number;
};
