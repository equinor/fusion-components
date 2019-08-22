import React, { useEffect, useContext } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextType } from '../context';
import { OrgNode } from '../orgChartTypes';

function Aside<T>() {
    const {
        allNodes,
        asideRows,
        rowMargin,
        cardMargin,
        centerX,
        cardWidth,
        updateAsideRows,
    } = useContext<OrgChartContextType<T>>(OrgChartContext);

    const asideNodes = allNodes.filter(d => d.aside);

    const rows = asideNodes.reduce(
        (
            prevValue: OrgNode<T>[][],
            currentValue: OrgNode<T>,
            currentIndex: number
        ): OrgNode<T>[][] => {
            const index = Math.floor(currentIndex / 2);
            if (!prevValue[index]) {
                prevValue[index] = [];
            }
            prevValue[index].push(currentValue);
            return prevValue;
        },
        [] as OrgNode<T>[][]
    );

    useEffect(() => {
        if (rows.length !== asideRows) {
            updateAsideRows(rows.length);
        }
    }, [asideRows]);

    const renderRow = (cards: OrgNode<T>[], rowNo: number) => {
        const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardMargin;
        const startX = centerX - totalWidth / 2;

        return cards.map((card, i) => (
            <Card
                key={card.id}
                node={card}
                x={startX + i * (cardWidth + cardMargin)}
                y={(rowNo + 1) * rowMargin}
            />
        ));
    };
    return (
        <g className="aside">
            {rows.map((cards, rowNo) => (
                <React.Fragment key={rowNo}>{renderRow(cards, rowNo)}</React.Fragment>
            ))}
        </g>
    );
}

export default Aside;
