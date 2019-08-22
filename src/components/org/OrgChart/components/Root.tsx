import React, { useContext } from 'react';

import Card from './Card';
import { OrgChartContext, OrgChartContextType } from '../context';

function Root<T> () {
    const { allNodes, cardWidth, centerX } = useContext<OrgChartContextType<T>>(OrgChartContext);
    const root = allNodes.find(n => !n.parentId);
    const x = centerX - cardWidth / 2;
    return <g className="root">{root && <Card node={root} x={x} />}</g>;
};

export default Root;
