import * as PIXI from 'pixi.js';
import {
    ExpandedColumns,
    ItemRenderContext,
    HangingGardenColumn,
    ExpandedColumn,
    Position,
} from './HangingGardenModels';

export const DEFAULT_ITEM_HEIGHT = 24;
export const DEFAULT_HEADER_HEIGHT = 32;
export const POPOVER_MARGIN = 8;
export const EXPANDED_COLUMN_PADDING = 8;
export const HIGHLIGHTED_ITEM_KEY = 'highlighted-item';

export const DEFAULT_ITEM_TEXT_STYLE = new PIXI.TextStyle({
    fontFamily: 'Equinor',
    fill: 'white',
    fontSize: 13,
    align: 'center',
});

export const createTextStyle = (style: PIXI.TextStyle) => new PIXI.TextStyle(style);

export const getMaxRowCount = (columns: HangingGardenColumn<any>[]) => {
    return Math.max.apply(
        Math,
        columns.map((column) => column.data.length)
    );
};

export const getExpandedWith = (width: number, c: ExpandedColumn) =>
    (width += c.maxWidth + EXPANDED_COLUMN_PADDING * 2);

export const getColumnX = (
    index: number,
    currentExpandedColumns: ExpandedColumns,
    defaultWidth: number
) => {
    const expandedWidthBeforeIndex = Object.values(currentExpandedColumns)
        .filter((c) => c.index < index && c.isExpanded)
        .reduce(getExpandedWith, 0);

    return index * defaultWidth + expandedWidthBeforeIndex;
};

export const isHeaderExpanded = (columnKey: string, expandedColumns: ExpandedColumns) =>
    (expandedColumns && expandedColumns[columnKey])?.isExpanded;

export const getHeaderWidth = (
    columnKey: string,
    expandedColumns: ExpandedColumns,
    defaultWidth: number
) =>
    isHeaderExpanded(columnKey, expandedColumns)
        ? defaultWidth + expandedColumns[columnKey].maxWidth + EXPANDED_COLUMN_PADDING * 2
        : defaultWidth;

export const getCalculatedHeight = (
    headerHeight: number,
    itemHeight: number,
    maxRowCount: number
) => (maxRowCount ? headerHeight + itemHeight * maxRowCount : 0);

export const addDot = (
    context: ItemRenderContext,
    color: number,
    position: Position,
    borderColor = 0xffffff
) => {
    const circle = new PIXI.Circle(position.x, position.y, 2);

    context.graphics.lineStyle(1, borderColor, 1, 1);
    context.graphics.beginFill(color);
    context.graphics.drawShape(circle);
    context.graphics.endFill();
    context.graphics.lineStyle(0);
};

export const getCalculatedWidth = (
    currentExpandedColumns: ExpandedColumns,
    columnsLength: number,
    itemWidth: number
) => {
    const expandedWidth = Object.values(currentExpandedColumns)
        .filter((c) => c.isExpanded)
        .reduce(getExpandedWith, 0);
    return columnsLength * itemWidth + expandedWidth;
};

export const createRenderedItemDescription = (backgroundColor: number, textNode: PIXI.Sprite) => {
    const itemDescription = new PIXI.Container();
    itemDescription.cacheAsBitmap = true;

    // Adding a "transparent" background graphic improves the quality of the description text
    const graphics = new PIXI.Graphics();
    graphics.beginFill(backgroundColor);
    graphics.drawRect(0, 0, textNode.width, textNode.height);
    itemDescription.addChild(graphics);
    itemDescription.addChild(textNode);
    return itemDescription;
};
