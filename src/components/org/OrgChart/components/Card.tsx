import { useMemo, useEffect, useContext, useCallback } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';

import styles from './styles.less';

type CardProps<TChart> = {
    node: OrgNode<TChart>;
    x?: number;
    y?: number;
};

function Card<TChart>({ node, x = 0, y = 0 }: CardProps<TChart>): JSX.Element {
    const { state, dispatch } = useContext<OrgChartContextReducer<TChart>>(OrgChartContext);

    const { cardWidth, cardHeight, component, numberOfCardsPerRow, rowMargin } = state;

    const updatePositions = useCallback(() => {
        if (node && (node.x !== x || node.y !== y)) {
            dispatch({
                type: 'UPDATE_POSITION',
                node,
                x,
                y,
            });
        }
    }, [node, x, y]);

    useEffect(() => {
        const timer = setTimeout(updatePositions, 20);
        return () => clearTimeout(timer);
    }, [updatePositions]);

    const Component = component;

    const additionalCardHeight = useMemo(
        () =>
            node.numberOfAssignees
                ? Math.ceil(node.numberOfAssignees / 3) *
                  (numberOfCardsPerRow === 1 ? rowMargin - 20 : rowMargin)
                : 0,
        [rowMargin, numberOfCardsPerRow, node.numberOfAssignees]
    );

    if (node.x === null || node.y == null) {
        return null;
    }
    return (
        <g className="card">
            <rect
                x={node.x}
                y={node.y}
                width={cardWidth}
                height={cardHeight + additionalCardHeight}
                className={styles.card}
            />
            <foreignObject
                x={node.x}
                y={node.y}
                width={cardWidth}
                height={cardHeight + additionalCardHeight}
                id={node.id}
            >
                {Component && <Component item={node.data} />}
            </foreignObject>
        </g>
    );
}

export default Card;
