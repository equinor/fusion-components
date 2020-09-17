import * as React from 'react';
import * as PIXI from 'pixi.js';
import { useHangingGardenContext } from '../hooks/useHangingGardenContext';
import { getHeaderWidth, isHeaderExpanded, getColumnX } from '../utils';
import useItemDescription from './useItemDescription';
import { HangingGardenColumnIndex } from '../models/HangingGarden';
import useTextNode from './useTextNode';

const useHeader = <T extends HangingGardenColumnIndex>() => {
    const {
        stage,
        expandedColumns,
        setExpandedColumns,
        columns,
        highlightedColumnKey,
        itemWidth,
        headerHeight,
        renderHeaderContext,
        scroll: { scrollTop },
        textureCaches: { getTextureFromCache, addTextureToCache },
    } = useHangingGardenContext();

    const { getRenderedItemDescription } = useItemDescription<T>();

    const { createTextNode } = useTextNode();

    const onHeaderClick = React.useCallback(
        (key: string, index: number) => {
            if (expandedColumns && expandedColumns[key]) {
                setExpandedColumns((prevColumns) => ({
                    ...prevColumns,
                    [key]: {
                        ...prevColumns[key],
                        isExpanded: !prevColumns[key].isExpanded,
                    },
                }));

                return;
            }

            const column = columns[index];

            const renderedDescriptions = column.data.map(getRenderedItemDescription);

            const maxWidth = Math.max.apply(
                Math,
                renderedDescriptions.map((description) => description.width)
            );

            setExpandedColumns((prevColumns) => ({
                ...prevColumns,
                [key]: {
                    isExpanded: true,
                    maxWidth,
                    index,
                },
            }));
        },
        [expandedColumns, columns, setExpandedColumns, getRenderedItemDescription]
    );

    const renderHeader = React.useCallback(
        (key: string, index: number) => {
            let renderedHeader = getTextureFromCache('headers', key) as PIXI.Container;

            if (!renderedHeader) {
                const headerWidth = getHeaderWidth(columns[index]?.key, expandedColumns, itemWidth);
                const isHighlighted = highlightedColumnKey === key;
                const isExpanded = isHeaderExpanded(key, expandedColumns);
                renderedHeader = new PIXI.Container();
                renderedHeader.buttonMode = true;
                renderedHeader.interactive = true;
                renderedHeader.on('click', () => onHeaderClick(key, index));
                renderedHeader.on('tap', () => onHeaderClick(key, index));

                // Header container position and size
                const x = getColumnX(index, expandedColumns, itemWidth);
                renderedHeader.x = x;
                renderedHeader.y = 0;
                renderedHeader.width = headerWidth;
                renderedHeader.height = headerHeight;

                // Render header
                const graphicsContext = new PIXI.Graphics();
                graphicsContext.cacheAsBitmap = true;

                renderedHeader.addChild(graphicsContext);
                graphicsContext.beginFill(isHighlighted ? 0x007079 : 0xf7f7f7);
                graphicsContext.drawRoundedRect(0, 0, headerWidth - 2, headerHeight - 2, 4);
                graphicsContext.endFill();

                renderHeaderContext(key, {
                    container: renderedHeader,
                    width: headerWidth,
                    height: headerHeight,
                    graphics: graphicsContext,
                    createTextNode: createTextNode,
                    isHighlighted,
                    isExpanded,
                });

                addTextureToCache('headers', key, renderedHeader);
            }

            // Fixed header when scrolling
            renderedHeader.y = scrollTop.current;

            // Ensure the header is on top (zIndex)
            stage.current.removeChild(renderedHeader);
            stage.current.addChild(renderedHeader);
        },
        [
            getTextureFromCache,
            addTextureToCache,
            onHeaderClick,
            highlightedColumnKey,
            expandedColumns,
            columns,
            itemWidth,
            headerHeight,
            renderHeaderContext,
            stage.current,
            createTextNode,
            scrollTop.current,
        ]
    );

    return { renderHeader };
};

export default useHeader;
