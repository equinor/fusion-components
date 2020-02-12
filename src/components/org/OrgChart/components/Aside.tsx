import React, { useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';

function Aside<T>() {
    const {
        state: {
            allNodes,
            asideRows,
            rowMargin,
            cardMargin,
            centerX,
            cardWidth,
            numberOfCardsPerRow,
            width,
            additionalAsideRowHeight,
        },
        dispatch,
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const asideNodes = useMemo(() => allNodes.filter(d => d.aside), [allNodes]);

    const rows = useMemo(
        () =>
            asideNodes.reduce(
                (
                    prevValue: OrgNode<T>[][],
                    currentValue: OrgNode<T>,
                    currentIndex: number
                ): OrgNode<T>[][] => {
                    const index = Math.floor(currentIndex / (numberOfCardsPerRow === 1 ? 1 : 2));
                    if (!prevValue[index]) {
                        prevValue[index] = [];
                    }
                    prevValue[index].push(currentValue);
                    return prevValue;
                },
                [] as OrgNode<T>[][]
            ),
        [asideNodes, numberOfCardsPerRow]
    );

    useEffect(() => {
        if (rows.length !== asideRows) {
            dispatch({
                type: 'UPDATE_ASIDE_ROWS',
                rows: rows.length,
            });
        }
    }, [asideRows, rows]);

    const getStartXPosition = () => {
        if (numberOfCardsPerRow === 1) {
            if (width < cardWidth * 1.5 + 10) {
                return width - cardWidth;
            }
            return cardWidth / 2 + 10;
        }
        const totalWidth = 2 * cardWidth + cardMargin;
        return centerX - totalWidth / 2;
    };

    const renderRow = useCallback(
        (cards: OrgNode<T>[], rowNo: number, additionalRowHeight: number) => {
            const startX = getStartXPosition();
            return cards.map((card, i) => (
                <Card
                    key={card.id}
                    node={card}
                    x={startX + i * (cardWidth + cardMargin)}
                    y={(rowNo + 1) * (rowMargin - 20) + 24 + additionalRowHeight}
                />
            ));
        },
        [centerX, cardWidth, cardMargin, rowMargin, numberOfCardsPerRow]
    );

    const getAdditionalRowHeight = useCallback(
        (cards: OrgNode<T>[]) => {
            const greatestAdditionPersons = cards.reduce((highest: number, card: OrgNode<T>) => {
                if (card.numberOfAssignees && card.numberOfAssignees > highest) {
                    return card.numberOfAssignees;
                }
                return highest;
            }, 0);
            if (greatestAdditionPersons === 0) {
                return 0;
            }
            return (
                Math.ceil(greatestAdditionPersons / 3) *
                (numberOfCardsPerRow === 1 ? rowMargin - 20 : rowMargin)
            );
        },
        [numberOfCardsPerRow, rowMargin]
    );

    const additionalRowHeight = rows.reduce(
        (additionalHeight: number[], _: OrgNode<T>[], index: number) => {
            const previousHeight = additionalHeight.reduce(
                (totalHeight: number, height: number) => totalHeight + height,
                0
            );
            if (index === 0) {
                return [...additionalHeight, 0];
            }
            const currentRowHeight = getAdditionalRowHeight(rows[index - 1]);
            return [...additionalHeight, previousHeight + currentRowHeight];
        },
        []
    );

    useEffect(() => {
        const maxAdditionalRowHeight = additionalRowHeight[additionalRowHeight.length - 1];
        if (maxAdditionalRowHeight !== additionalAsideRowHeight) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_ROW_HEIGHT',
                additionalAsideRowHeight: maxAdditionalRowHeight,
            });
        }
    }, [additionalRowHeight]);

    return (
        <g className="aside">
            {rows.map((cards, rowNo) => (
                <React.Fragment key={rowNo}>{renderRow(cards, rowNo, additionalRowHeight[rowNo])}</React.Fragment>
            ))}
        </g>
    );
}

export default Aside;
