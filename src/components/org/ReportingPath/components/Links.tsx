import React, { useContext, useMemo, useCallback } from 'react';

import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgStructure, OrgNode } from '@equinor/fusion-components';

import styles from './styles.less';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes,  cardHeight, width },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const allChildren = useMemo(() => allNodes.filter(node => node.parentId), [
        allNodes,
    ]);

    const getSingleCardRowPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            return `
                    M ${node.x + 20} ${node.y+ 20}
                    L ${parent.x + 20} ${parent.y + cardHeight - 10}
                    `;
        },

        [cardHeight]
    );

    const renderLink = useCallback(
        (node: OrgNode<T>) => {
            if (!node.parentId) {
                return null;
            }

            const parentId = node.parentId;
            const parent = allNodes.find(d => d.id === parentId);

            if (!parent) {
                return null;
            }

            const path = getSingleCardRowPath(node, parent)
                    
            return <path d={path} className={styles.link} />;
        },
        [allNodes, width]
    );

    return (
        <g className="links">
            {allChildren.map(node => (
                <React.Fragment key={node.id}>{renderLink(node)}</React.Fragment>
            ))}
        </g>
    );
};

export default Links;
