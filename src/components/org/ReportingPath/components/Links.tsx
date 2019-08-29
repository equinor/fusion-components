import React, { useContext, useMemo, useCallback } from 'react';

import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgStructure, OrgNode } from '@equinor/fusion-components';

import styles from './styles.less';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes, cardHeight, width, cardMargin },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const allChildren = useMemo(() => allNodes.filter(node => node.parentId), [allNodes]);

    const getPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => `
                    M ${node.x + cardMargin * 2} ${node.y + cardHeight / 2}
                    L ${parent.x + cardMargin * 2} ${parent.y + cardHeight / 2}
                    `,
        [cardHeight, cardMargin]
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

            const path = getPath(node, parent);

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
