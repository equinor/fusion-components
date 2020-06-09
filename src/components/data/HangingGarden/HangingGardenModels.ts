import * as PIXI from 'pixi.js';

export type ExpandedColumn = {
    isExpanded: boolean;
    maxWidth: number;
    index: number;
};

export type ExpandedColumns = { [key: string]: ExpandedColumn };

export type RenderTemplate = {
    container: PIXI.Container;
    width: number;
    height: number;
    graphics: PIXI.Graphics;
    createTextNode: (text: string, color: number) => PIXI.Sprite;
};

export type HeaderRenderTemplate = RenderTemplate & {
    isHighlighted: boolean;
};

export type ItemRenderTemplate = RenderTemplate & {
    createRect: (x: number, y: number, width: number, height: number, color: number) => void;
    addDot: (color: number, x: number, y?: number, borderColor?: number) => void;
    addPopover: (hitArea: any, renderPopover: () => JSX.Element) => void;
    enquedRender: (key: string, render: (context: ItemRenderTemplate) => void) => void;
};

export type RenderItem = {
    key: string;
    render: (context: ItemRenderTemplate) => void;
    context: ItemRenderTemplate;
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
    renderItemTemplate: (item: T, context: ItemRenderTemplate) => void;
    renderHeaderTemplate: (key: string, context: HeaderRenderTemplate) => void;
    provideController?: any;
    backgroundColor?: number;
};
