import React, { useContext } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextReducer } from '../store';

function Root<T>() {
    const {
        state: { allNodes, cardWidth, centerX },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);
    
    const root = allNodes.find(n => !n.parentId);
    const x = centerX - cardWidth / 2;
    return <g className="root">{root && <Card node={root} x={x} />}</g>;
}

export default Root;
