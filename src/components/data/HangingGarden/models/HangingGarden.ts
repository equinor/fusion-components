import { MutableRefObject } from 'react';
import { ItemRenderContext, HeaderRenderContext } from './RenderContext';

export type HangingGardenColumn<T> = {
    key: string;
    data: T[];
};

export type HangingGardenColumnIndex = Record<string, any>;

export type GardenController = {
    clearGarden: () => void;
};

export type HangingGardenProps<T extends HangingGardenColumnIndex> = {
    columns: HangingGardenColumn<T>[];
    highlightedColumnKey: string | null;
    highlightedItem: T | null;
    itemKeyProp: keyof T;
    itemWidth: number;
    itemHeight: number;
    getItemDescription: (item: T) => string;
    onItemClick: (item: T) => void;
    headerHeight: number;
    renderItemContext: (item: T, context: ItemRenderContext) => void;
    renderHeaderContext: (key: string, context: HeaderRenderContext) => void;
    provideController?: MutableRefObject<GardenController | null>;
    backgroundColor?: number;
};