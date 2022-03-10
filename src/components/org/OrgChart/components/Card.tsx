import { useMemo, useEffect, useContext } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgNode } from '../orgChartTypes';

import { useStyles } from './componentsStyle';

type CardProps<T> = {
    node: OrgNode<T>;
    x?: number;
    y?: number;
};

function Card<T>({ node, x = 0, y = 0 }: CardProps<T>) {
    const {
        state: { cardWidth, cardHeight, component, numberOfCardsPerRow, rowMargin },
        dispatch,
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const styles = useStyles();

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
            >
                {Component && <Component item={node.data} />}
            </foreignObject>
        </g>
    );
}

export default Card;
