import React, { useContext, useMemo, useCallback } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgStructure, OrgNode } from '../orgChartTypes';

import styles from './styles.less';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes, cardWidth, cardHeight, centerX, cardMargin, numberOfCardsPerRow, width },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const allChildren = useMemo(() => allNodes.filter(node => !node.aside && node.parentId), [
        allNodes,
    ]);

    const allAside = useMemo(() => allNodes.filter(node => node.aside && node.parentId), [
        allNodes,
    ]);

    const centerHeight = cardHeight / 2;
    const centerWidth = cardWidth / 2;

    const getAsidePath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }

            if (node.x > centerX) {
                return `
                    M ${node.x + centerWidth} ${node.y + (cardMargin + 16)}
                    L ${centerX} ${node.y + (cardMargin + 16)}
                    L ${parent.x + centerWidth} ${parent.y + centerHeight}
                    `;
            }
            return `
                M ${node.x + centerWidth} ${node.y + (cardMargin + 16)}
                L ${centerX} ${node.y + (cardMargin + 16)}
                L ${parent.x + centerWidth} ${parent.y + centerHeight}
                `;
        },
        [centerX, cardHeight, cardWidth]
    );

    const getChildPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>, index: number) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }

            if (index !== 0 && index / numberOfCardsPerRow >= 1 && numberOfCardsPerRow % 2 !== 0) {
                // Children row that will align left
                const firstChild = allChildren[0];

                if (firstChild.x === null || firstChild.y === null) {
                    return '';
                }

                return `
                    M ${node.x + centerWidth} ${node.y + centerHeight}
                    V ${node.y - 10}
                    H ${firstChild.x + cardWidth + cardMargin / 2}
                    V ${firstChild.y - 10}
                    H ${centerX}
                    L ${parent.x + centerWidth} ${parent.y + centerHeight}
                    `;
            }
            return `
                M ${node.x + centerWidth} ${node.y + centerHeight}
                V ${node.y - 10}
                H ${centerX}
                L ${parent.x + centerWidth} ${parent.y + centerHeight}
                `;
        },
        [centerX, cardHeight, cardWidth, numberOfCardsPerRow, allChildren]
    );

    const getSingleCardRowPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }

            if (width < cardWidth + 30) {
                return `
                    M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                    H ${node.x - 10}
                    L ${parent.x + 20} ${parent.y + centerHeight}
                    `;
            }
            if (width < cardWidth * 1.5 + 10) {
                const range = width - cardWidth - 10;
                return `
                    M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                    H ${node.x - 10}
                    L ${parent.x + range} ${parent.y + centerHeight}
                    `;
            }
            return `
                M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                H ${node.x - 10}
                L ${parent.x + centerWidth} ${parent.y + centerHeight}
                `;
        },
        [allChildren, cardHeight, cardWidth, width]
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
        [allNodes, width]
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
