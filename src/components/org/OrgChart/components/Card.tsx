import React, { useEffect, useContext } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';

type CardProps<T> = {
    node: OrgNode<T>;
    x?: number;
    y?: number;
};

function Card<T>({ node, x = 0, y = 0 }: CardProps<T>) {
    const {
        state: { cardWidth, cardHeight, component },
        dispatch,
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    useEffect(() => {
        if (node && (node.x !== x || node.y !== y)) {
            dispatch({
                type: 'UPDATE_POSITION',
                node,
                x,
                y,
            });
        }
    }, [node, x, y]);

    const Component = component;

    return (
        <g className="card">
            <rect
                x={node.x}
                y={node.y}
                width={cardWidth}
                height={cardHeight}
                style={{ fill: 'none' }}
            />
            <foreignObject x={node.x} y={node.y} width={cardWidth} height={cardHeight}>
                {Component && <Component item={node.data} />}
            </foreignObject>
        </g>
    );
}

export default Card;
