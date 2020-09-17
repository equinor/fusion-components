import * as React from 'react';
import * as PIXI from 'pixi.js';
import { useHangingGardenContext } from '../hooks/useHangingGardenContext';
import { HIGHLIGHTED_ITEM_KEY } from '../utils';
import { HangingGardenColumnIndex } from '../models/HangingGarden';
import useRenderItem from './useItem';

const useHightLightedItem = <T extends HangingGardenColumnIndex>() => {
    const {
        columns,
        itemKeyProp,
        stage,
        highlightedItem,
        textureCaches: { getTextureFromCache, addTextureToCache },
    } = useHangingGardenContext();

    const { renderItem } = useRenderItem();

    const renderHighlightedItem = React.useCallback(() => {
        if (!highlightedItem) {
            const renderedHighlightedItem = getTextureFromCache(
                'items',
                HIGHLIGHTED_ITEM_KEY
            ) as PIXI.Container;

            if (renderedHighlightedItem) {
                stage.current.removeChild(renderedHighlightedItem);
            }

            return;
        }

        const column = (columns as T).find((column) =>
            column.data.find(
                (item) => item[itemKeyProp as keyof T] === highlightedItem[itemKeyProp as keyof T]
            )
        );

        if (column) {
            renderItem(
                highlightedItem,
                column.data.findIndex(
                    (item) =>
                        item[itemKeyProp as keyof T] === highlightedItem[itemKeyProp as keyof T]
                ),
                (columns as T).indexOf(column)
            );
        }
    }, [highlightedItem, getTextureFromCache, addTextureToCache, stage.current, columns]);

    return { renderHighlightedItem };
};

export default useHightLightedItem;
