import React, { useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';
import useAdditionalRowHeight from '../useAdditionalRowHeight';

function Children<T>() {
    const {
        state: {
            allNodes,
            childrenRows,
            asideRows,
            rowMargin,
            cardMargin,
            cardWidth,
            centerX,
            numberOfCardsPerRow,
            width,
            additionalChildRowHeight,
        },
        dispatch,
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const childrenNodes = useMemo(() => allNodes.filter(d => !d.aside && d.parentId), [allNodes]);

    const rows = useMemo(
        () =>
            childrenNodes.reduce(
                (
                    prevValue: OrgNode<T>[][],
                    currentValue: OrgNode<T>,
                    currentIndex: number
                ): OrgNode<T>[][] => {
                    if (numberOfCardsPerRow) {
                        const index = Math.floor(currentIndex / numberOfCardsPerRow);
                        if (!prevValue[index]) {
                            prevValue[index] = [];
                        }
                        prevValue[index].push(currentValue);
                    }
                    return prevValue;
                },
                [] as OrgNode<T>[][]
            ),
        [childrenNodes, numberOfCardsPerRow]
    );

    useEffect(() => {
        if (rows.length !== childrenRows) {
            dispatch({
                type: 'UPDATE_CHILDREN_ROWS',
                rows: rows.length,
            });
        }
    }, [childrenRows, rows]);

    const additionalRowHeight = useAdditionalRowHeight(rows);

    useEffect(() => {
        const maxAdditionalRowHeight = additionalRowHeight[additionalRowHeight.length - 1];
        if (maxAdditionalRowHeight !== additionalChildRowHeight) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_ROW_HEIGHT',
                additionalChildRowHeight: maxAdditionalRowHeight,
            });
        }
    }, [additionalRowHeight]);

    const initialMargin = (rowMargin - 20) * asideRows + (numberOfCardsPerRow === 1 ? 40 : 50);

    const getStartXPosition = (cards: OrgNode<T>[], rowNo: number) => {
        if (numberOfCardsPerRow === 1) {
            if (width < cardWidth * 1.5 + 10) {
                return width - cardWidth;
            }
            return cardWidth / 2 + 10;
        }
        const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardMargin;
        const totalWidthFirstRow = rows[0].length * cardWidth + (rows[0].length - 1) * cardMargin;
        return rowNo >= 1 ? centerX - totalWidthFirstRow / 2 : centerX - totalWidth / 2;
    };

    const renderRow = useCallback(
        (cards: OrgNode<T>[], rowNo: number, additionalRowHeight: number) => {
            const startX = getStartXPosition(cards, rowNo);
            return cards.map((card, i) => (
                <React.Fragment key={card.id}>
                    <Card
                        node={card}
                        x={startX + i * (cardWidth + cardMargin)}
                        y={
                            initialMargin +
                            additionalRowHeight +
                            (rowNo + 1) * (numberOfCardsPerRow === 1 ? rowMargin - 20 : rowMargin)
                        }
                    />
                </React.Fragment>
            ));
        },
        [centerX, cardWidth, cardMargin, rowMargin, initialMargin, rows, width]
    );

    return (
        <g className="children">
            {rows.map((cards, rowNo) => (
                <React.Fragment key={rowNo}>
                    {renderRow(cards, rowNo, additionalRowHeight[rowNo])}
                </React.Fragment>
            ))}
        </g>
    );
}

export default Children;
