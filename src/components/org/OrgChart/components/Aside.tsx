import { Fragment, useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';
import useAdditionalRowHeight from '../useAdditionalRowHeight';

function Aside<TChart>(): JSX.Element {
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
            startYPosition,
        },
        dispatch,
    } = useContext<OrgChartContextReducer<TChart>>(OrgChartContext);

    const asideNodes = useMemo(() => allNodes.filter((d) => d.aside), [allNodes]);

    const rows = useMemo(
        () =>
            asideNodes.reduce(
                (
                    prevValue: OrgNode<TChart>[][],
                    currentValue: OrgNode<TChart>,
                    currentIndex: number
                ): OrgNode<TChart>[][] => {
                    const index = Math.floor(currentIndex / (numberOfCardsPerRow === 1 ? 1 : 2));
                    if (!prevValue[index]) {
                        prevValue[index] = [];
                    }
                    prevValue[index].push(currentValue);
                    return prevValue;
                },
                [] as OrgNode<TChart>[][]
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

    const additionalRowHeight = useAdditionalRowHeight(rows, true);

    useEffect(() => {
        const maxAdditionalRowHeight = additionalRowHeight[additionalRowHeight.length - 1];
        if (maxAdditionalRowHeight !== additionalAsideRowHeight) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_ROW_HEIGHT',
                additionalAsideRowHeight: maxAdditionalRowHeight,
            });
        }
    }, [additionalRowHeight]);

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
        (cards: OrgNode<TChart>[], rowNo: number, additionalRowHeight: number) => {
            const startX = getStartXPosition();
            return cards.map((card, i) => (
                <Card
                    key={card.id}
                    node={card}
                    x={startX + i * (cardWidth + cardMargin)}
                    y={(rowNo + 1) * (rowMargin - 20) + 24 + additionalRowHeight + startYPosition}
                />
            ));
        },
        [centerX, cardWidth, cardMargin, rowMargin, numberOfCardsPerRow, startYPosition]
    );

    return (
        <g className="aside">
            {rows.map((cards, rowNo) => (
                <Fragment key={rowNo}>
                    {renderRow(cards, rowNo, additionalRowHeight[rowNo])}
                </Fragment>
            ))}
        </g>
    );
}

export default Aside;
