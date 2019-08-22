import React, { useEffect, useContext, useCallback, useMemo } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextType } from '../context';
import { OrgNode } from '../orgChartTypes';

function Children<T>() {
    const {
        allNodes,
        childrenRows,
        width,
        rowMargin,
        cardMargin,
        cardWidth,
        centerX,
        updateChildrenRows,
        asideRows,
        updateAsideRows,
    } = useContext<OrgChartContextType<T>>(OrgChartContext);

    const getRows = useCallback(
        (nodes: OrgNode<T>[], numberOfCardsPerRow: number) =>
            nodes.reduce(
                (prevValue, currentValue, currentIndex): OrgNode<T>[][] => {
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
        []
    );

    const childrenStructure = useMemo(() => {
        const numberOfCardsPerRow = Math.floor((width + cardMargin) / (cardWidth + cardMargin));
        const childrenNodes = allNodes.filter(d => !d.aside && d.parentId);
        return getRows(childrenNodes, numberOfCardsPerRow);
    }, [allNodes]);

    const asideStructure = useMemo(() => {
        const asideNodes = allNodes.filter(d => d.aside);
        return getRows(asideNodes, 2);
    }, [allNodes]);

    const childrenInitialMargin = useMemo(() => {
        const asideMultiplier = asideStructure ? asideStructure.length : 1;
        return rowMargin * asideMultiplier;
    }, [rowMargin, asideStructure]);

    useEffect(() => {
        if (childrenStructure.length !== childrenRows) {
            updateChildrenRows(childrenStructure.length);
        }
        if (asideStructure.length !== asideRows) {
            updateAsideRows(asideStructure.length);
        }
    }, [childrenRows, asideRows]);

    const renderRow = (cards: OrgNode<T>[], rowNo: number, extraYMargin: number) => {
        const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardMargin;
        const startX = centerX - totalWidth / 2;

        return cards.map((card, i) => (
            <React.Fragment key={card.id}>
                <Card
                    node={card}
                    x={startX + i * (cardWidth + cardMargin)}
                    y={extraYMargin + (rowNo + 1) * rowMargin}
                />
            </React.Fragment>
        ));
    };

    const renderColumns = useCallback(
        (structure: OrgNode<T>[][], extraYMargin) =>
            structure.map((row, rowNo) => (
                <React.Fragment key={rowNo}>{renderRow(row, rowNo, extraYMargin)}</React.Fragment>
            )),
        []
    );
    return (
        <>
            <g className="aside">{renderColumns(asideStructure, 0)}</g>
            <g className="children">{renderColumns(childrenStructure, childrenInitialMargin)}</g>
        </>
    );
}

export default Children;
