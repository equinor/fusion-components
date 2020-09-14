import React, { useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgNode } from 'components/org/OrgChart/orgChartTypes';

function Children<T>() {
    const {
        state: { allNodes, childrenRows, rowMargin, width, initialCardWidth },
        dispatch,
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const childrenNodes = useMemo(() => allNodes.filter(d =>!d.linked), [allNodes]);

    useEffect(() => {
        if (childrenNodes.length !== childrenRows) {
            dispatch({
                type: 'UPDATE_CHILDREN_ROWS',
                rows: childrenNodes.length,
            });
        }
    }, [childrenRows, childrenNodes]);

    const renderCard = useCallback(
        (card: OrgNode<T>, rowNo: number): React.ReactNode => (
            <React.Fragment key={card.id}>
                <Card node={card} x={card.linked ? 72 : 0} y={(rowNo)* rowMargin} />
            </React.Fragment>
        ),
        [rowMargin]
    );
    useEffect(() => {
        if (width <= initialCardWidth + 30) {
            dispatch({
                type: 'UPDATE_CARD_SIZE',
                width: width - 30,
            });
        } else if (width !== initialCardWidth) {
            dispatch({
                type: 'UPDATE_CARD_SIZE',
                width: initialCardWidth,
            });
        }
    }, [width]);

    const children = childrenNodes.reduce(
        (previousChildren, currentChild) => {
            const linkedNodes = allNodes.filter(node => node.parentId === currentChild.id && node.linked);
            const linkedNodesComponents = linkedNodes.length
                ? linkedNodes.map((node, index) => renderCard(node, previousChildren.length + index))
                : null;

            if (linkedNodesComponents) {
                previousChildren.push(...linkedNodesComponents);
            }
            const childComponent = renderCard(
                currentChild,
                previousChildren.length
            );
            previousChildren.push(childComponent);

            return previousChildren;
        },
        [] as React.ReactNode[]
    );

    return (
        <g className="children">
            {children}
        </g>
    );
}

export default Children;
