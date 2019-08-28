import React, { useContext, useMemo, useCallback } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgStructure, OrgNode } from '../orgChartTypes';

import styles from './styles.less';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes, cardWidth, cardHeight, centerX, cardMargin, numberOfCardsPerRow },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const allChildren = useMemo(() => allNodes.filter(node => !node.aside && node.parentId), [
        allNodes,
    ]);

    const allAside = useMemo(() => allNodes.filter(node => node.aside && node.parentId), [
        allNodes,
    ]);

    const getAsidePath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x > centerX) {
                return `
                    M ${node.x + 10} ${node.y + cardHeight / 2}
                    L ${centerX} ${node.y + cardHeight / 2}
                    L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                    `;
            }
            return `
                M ${node.x + cardWidth - 10} ${node.y + cardHeight / 2}
                L ${centerX} ${node.y + cardHeight / 2}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                `;
        },
        [centerX, cardHeight, cardWidth]
    );

    const getChildPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>, index: number) => {
            if (index !== 0 && index / numberOfCardsPerRow >= 1 && numberOfCardsPerRow % 2 !== 0) {
                // Children row that will align left
                const firstChild = allChildren[0];
                return `
                    M ${node.x + cardWidth / 2} ${node.y + 10}
                    V ${node.y - 10}
                    H ${firstChild.x + cardWidth + cardMargin / 2}
                    V ${firstChild.y - 10}
                    H ${centerX}
                    L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                    `;
            }
            return `
                M ${node.x + cardWidth / 2} ${node.y + 10}
                V ${node.y - 10}
                H ${centerX}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                `;
        },
        [centerX, cardHeight, cardWidth, numberOfCardsPerRow, allChildren]
    );

    const getSingleCardRowPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            return `
                M ${node.x + 10} ${node.y + cardHeight / 4}
                H ${node.x - 10}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                `;
        },
        [allChildren, cardHeight, cardWidth]
    );

    const renderLink = useCallback(
        (node: OrgNode<T>, index: number) => {
            if (!node.parentId) {
                return null;
            }

            const parentId = node.parentId;
            const parent = allNodes.find(d => d.id === parentId);

            if (!parent) {
                return null;
            }

            const path =
                numberOfCardsPerRow === 1
                    ? getSingleCardRowPath(node, parent)
                    : node.aside
                    ? getAsidePath(node, parent)
                    : getChildPath(node, parent, index);

            return <path d={path} className={styles.link} />;
        },
        [allNodes]
    );

    return (
        <g className="links">
            {allChildren.map((node, index) => (
                <React.Fragment key={node.id}>{renderLink(node, index)}</React.Fragment>
            ))}
            {allAside.map((node, index) => (
                <React.Fragment key={node.id}>{renderLink(node, index)}</React.Fragment>
            ))}
        </g>
    );
};

export default Links;
