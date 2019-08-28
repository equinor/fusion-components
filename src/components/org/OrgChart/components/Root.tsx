import React, { useContext, useMemo, useEffect } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';

function Root<T>() {
    const {
        state: { allNodes, cardWidth, centerX, width, cardMargin, numberOfCardsPerRow, initialCardWidth },
        dispatch,
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const cardsPerRow = useMemo(() => {
        const cards = Math.floor((width + cardMargin) / (cardWidth + cardMargin));
        return cards < 1 ? 1 : cards;
    }, [width, cardMargin, cardWidth]);

    useEffect(() => {
        if (cardsPerRow !== numberOfCardsPerRow) {
            dispatch({
                type: 'UPDATE_NUMBER_OF_CARDS_PER_ROW',
                numberOfCardsPerRow: cardsPerRow,
            });
        }
    });

    useEffect(() => {
        if(width <= initialCardWidth + 30){
            dispatch({
                type: 'UPDATE_CARD_SIZE',
                width: width - 30
            });
        }
        else if(width !== initialCardWidth){
            dispatch({
                type:'UPDATE_CARD_SIZE',
                width: initialCardWidth
            })
        }
    },[width])

    const root = allNodes.find(n => !n.parentId);
    const x = cardsPerRow !== 1 ? centerX - cardWidth / 2 : 0;
    return <g className="root">{root && <Card node={root} x={x} />}</g>;
}

export default Root;
