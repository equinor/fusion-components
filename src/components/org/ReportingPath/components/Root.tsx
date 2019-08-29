import React, { useContext, useEffect } from 'react';

import Card from './Card';
import { ReportingPathContext, ReportingPathContextReducer } from '../store';

function Root<T>() {
    const {
        state: { allNodes, width, initialCardWidth },
        dispatch,
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);


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
    const x = 0;
    return <g className="root">{root && <Card node={root} x={x} />}</g>;
}

export default Root;
