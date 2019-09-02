import React, { useEffect, useContext } from 'react';

import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgNode } from '@equinor/fusion-components';

import styles from './styles.less';

type CardProps<T> = {
    node: OrgNode<T>;
    x?: number;
    y?: number;
};

function Card<T>({ node, x = 0, y = 0 }: CardProps<T>) {
    const {
        state: { cardWidth, cardHeight, component },
        dispatch,
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

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

    if(node.x === null || node.y === null) {
        return null;
    }

    return (
        <g className="card">
            <rect
                x={node.x}
                y={node.y}
                width={cardWidth}
                height={cardHeight}
                className={styles.card}
            />
            <foreignObject x={node.x} y={node.y} width={cardWidth} height={cardHeight}>
                {Component && <Component item={node.data} />}
            </foreignObject>
        </g>
    );
}

export default Card;
