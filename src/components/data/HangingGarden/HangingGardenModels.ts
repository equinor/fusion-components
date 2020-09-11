import * as PIXI from 'pixi.js';

export type ExpandedColumn = {
    isExpanded: boolean;
    maxWidth: number;
    index: number;
};

export type ExpandedColumns = Record<string, ExpandedColumn>;

export type RenderContext = {
    container: PIXI.Container;
    width: number;
    height: number;
    graphics: PIXI.Graphics;
    createTextNode: (text: string, color: number) => PIXI.Sprite;
};

export type HeaderRenderContext = RenderContext & {
    isHighlighted: boolean;
    isExpanded: boolean;
};

export type Position = {
    x: number;
    y: number;
};

export type Size = {
    width: number;
    height: number;
};

export type ItemRenderContext = RenderContext & {
    createRect: (position: Position, size: Size, color: number) => void;
    addDot: (color: number, position: Position, borderColor?: number) => void;
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

export type HangingGardenColumnIndex = Record<string, any>;

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
