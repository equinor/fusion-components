import { Fragment, useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';
import useAdditionalRowHeight from '../useAdditionalRowHeight';

function Children<TChart>(): JSX.Element {
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
            startYPosition,
        },
        dispatch,
    } = useContext<OrgChartContextReducer<TChart>>(OrgChartContext);

    const childrenNodes = useMemo(() => allNodes.filter((d) => !d.aside && d.parentId), [allNodes]);

    const rows = useMemo(
        () =>
            childrenNodes.reduce(
                (
                    prevValue: OrgNode<TChart>[][],
                    currentValue: OrgNode<TChart>,
                    currentIndex: number
                ): OrgNode<TChart>[][] => {
                    if (numberOfCardsPerRow) {
                        const index = Math.floor(currentIndex / numberOfCardsPerRow);
                        if (!prevValue[index]) {
                            prevValue[index] = [];
                        }
                        prevValue[index].push(currentValue);
                    }
                    return prevValue;
                },
                [] as OrgNode<TChart>[][]
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

    const initialMargin = useMemo(
        () => (rowMargin - 20) * asideRows + (numberOfCardsPerRow === 1 ? 40 : 50) + startYPosition,
        [rowMargin, asideRows, numberOfCardsPerRow, startYPosition]
    );

    const getStartXPosition = useCallback(
        (cards: OrgNode<TChart>[], rowNo: number) => {
            if (numberOfCardsPerRow === 1) {
                if (width < cardWidth * 1.5 + 10) {
                    return width - cardWidth;
                }
                return cardWidth / 2 + 10;
            }
            const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardMargin;
            const totalWidthFirstRow =
                rows[0].length * cardWidth + (rows[0].length - 1) * cardMargin;
            return rowNo >= 1 ? centerX - totalWidthFirstRow / 2 : centerX - totalWidth / 2;
        },
        [numberOfCardsPerRow, width, cardWidth, cardMargin, centerX]
    );

    const renderRow = useCallback(
        (cards: OrgNode<TChart>[], rowNo: number, additionalRowHeight: number) => {
            const startX = getStartXPosition(cards, rowNo);
            return cards.map((card, i) => (
                <Fragment key={card.id}>
                    <Card
                        node={card}
                        x={startX + i * (cardWidth + cardMargin)}
                        y={
                            initialMargin +
                            additionalRowHeight +
                            (rowNo + 1) * (numberOfCardsPerRow === 1 ? rowMargin - 20 : rowMargin)
                        }
                    />
                </Fragment>
            ));
        },
        [centerX, cardWidth, cardMargin, rowMargin, initialMargin, rows, width, getStartXPosition]
    );

    useEffect(() => {
        console.log('additionalRowHeight', additionalRowHeight);
        console.log('rowMargin', rowMargin);
    }, [additionalRowHeight, rowMargin]);

    return (
        <g className="children">
            {rows.map((cards, rowNo) => (
                <Fragment key={rowNo}>
                    {renderRow(cards, rowNo, additionalRowHeight[rowNo])}
                </Fragment>
            ))}
        </g>
    );
}

export default Children;
