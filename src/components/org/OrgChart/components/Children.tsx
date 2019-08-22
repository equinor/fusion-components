import React, { useEffect, useContext } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextType } from '../context';
import { OrgNode } from '../orgChartTypes';

function Children<T>() {
    const {
        allNodes,
        childrenRows,
        asideRows,
        width,
        rowMargin,
        cardMargin,
        cardWidth,
        centerX,
        updateChildrenRows,
    } = useContext<OrgChartContextType<T>>(OrgChartContext);

    const numberOfCardsPerRow = Math.floor((width + cardMargin) / (cardWidth + cardMargin));
    const childrenNodes = allNodes.filter(d => !d.aside && d.parentId);

    const rows = childrenNodes.reduce(
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
    );

    const initialMargin = rowMargin * 2

    useEffect(() => {
        if (rows.length !== childrenRows) {
            updateChildrenRows(rows.length);
        }
    }, [childrenRows]);

    const renderRow = (cards: OrgNode<T>[], rowNo: number) => {
        const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardMargin;
        const totalWidthFirstRow = rows[0].length * cardWidth + (rows[0].length - 1) * cardMargin;
        const startX = rowNo >=1 ? centerX - totalWidthFirstRow / 2 : centerX - totalWidth / 2;

        return cards.map((card, i) => (
            <React.Fragment key={card.id}>
                <Card
                    node={card}
                    x={startX + i * (cardWidth + cardMargin)}
                    y={initialMargin + (rowNo + 1) * rowMargin}
                />
            </React.Fragment>
        ));
    };

    return (
        <g className="children">
            {rows.map((cards, rowNo) => (
                <React.Fragment key={rowNo}>{renderRow(cards, rowNo)}</React.Fragment>
            ))}
        </g>
    );
}

export default Children;
