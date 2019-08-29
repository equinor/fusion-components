import React, { useEffect, useContext, useMemo, useCallback } from 'react';

import Card from './Card';
import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgNode } from '@equinor/fusion-components';

function Children<T>() {
    const {
        state: { allNodes, childrenRows, rowMargin },
        dispatch,
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const childrenNodes = useMemo(() => allNodes.filter(d => d.parentId), [allNodes]);

    useEffect(() => {
        if (childrenNodes.length !== childrenRows) {
            dispatch({
                type: 'UPDATE_CHILDREN_ROWS',
                rows: childrenNodes.length,
            });
        }
    }, [childrenRows, childrenNodes]);

    const renderRow = useCallback(
        (card: OrgNode<T>, rowNo: number) => {
            return (
                <React.Fragment key={card.id}>
                    <Card
                        node={card}
                        x={0}
                        y={(rowNo + 1) * (rowMargin)}
                    />
                </React.Fragment>
            );
        },
        [rowMargin]
    );

    return (
        <g className="children">
            {childrenNodes.map((cards, rowNo) => (
                <React.Fragment key={rowNo}>{renderRow(cards, rowNo)}</React.Fragment>
            ))}
        </g>
    );
}

export default Children;
