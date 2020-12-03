import * as React from 'react';
import * as PIXI from 'pixi.js';

import { useHangingGardenContext } from './useHangingGardenContext';
import useTextNode from './useTextNode';
import { createRenderedItemDescription, getColumnX, EXPANDED_COLUMN_PADDING } from '../utils';
import { HangingGardenColumn, HangingGardenColumnIndex } from '../models/HangingGarden';

/**
 * Handles extended descriptions for item when columns is expanded.
 * Only apply if expanded columns are in use.
 *
 *
 * This hook is used by the Garden and is not intended to be used or implemented
 * outside the Garden component.
 */
const useItemDescription = <T extends HangingGardenColumnIndex>() => {
    const {
        stage,
        backgroundColor,
        columns,
        expandedColumns,
        headerHeight,
        itemHeight,
        itemWidth,
        itemKeyProp,
        getItemDescription,
        textureCaches: { getTextureFromCache, addTextureToCache },
    } = useHangingGardenContext();

    const { createTextNode } = useTextNode();

    const getRenderedItemDescription = React.useCallback(
        (item: T) => {
            let itemDescription = getTextureFromCache('descriptions', item[itemKeyProp as keyof T]);

            if (!itemDescription) {
                const description = getItemDescription(item);
                const textNode = createTextNode(description, 0x243746);
                itemDescription = createRenderedItemDescription(backgroundColor, textNode);
                addTextureToCache('descriptions', item[itemKeyProp as keyof T], itemDescription);
            }
            return itemDescription as PIXI.Container;
        },
        [backgroundColor, getTextureFromCache, addTextureToCache, getItemDescription]
    );

    const renderItemDescription = React.useCallback(
        (item: T, index: number, columnIndex: number) => {
            const column = (columns as HangingGardenColumn<T>[])[columnIndex];
            const expandedColumn = expandedColumns && expandedColumns[column.key];

            if (!expandedColumn || !expandedColumn.isExpanded) {
                return;
            }

            const pixiContainer = getRenderedItemDescription(item);
            pixiContainer.y =
                headerHeight + index * itemHeight + (itemHeight / 2 - pixiContainer.height / 2);
            pixiContainer.x =
                getColumnX(columnIndex, expandedColumns, itemWidth) +
                itemWidth +
                EXPANDED_COLUMN_PADDING;
            stage.current.removeChild(pixiContainer);
            stage.current.addChild(pixiContainer);
        },
        [
            headerHeight,
            columns,
            expandedColumns,
            getColumnX,
            itemHeight,
            itemWidth,
            getRenderedItemDescription,
            stage.current,
        ]
    );

    return { renderItemDescription, getRenderedItemDescription };
};

export default useItemDescription;
