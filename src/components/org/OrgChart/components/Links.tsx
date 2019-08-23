import React, { useContext, useMemo, useCallback } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgStructure, OrgNode } from '../orgChartTypes';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes, cardWidth, cardHeight, centerX, width, cardMargin },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const numberOfCardsPerRow = useMemo(
        () => Math.floor((width + cardMargin) / (cardWidth + cardMargin)),
        [width, cardMargin, cardWidth]
    );

    const allChildren = useMemo(() => allNodes.filter(node => !node.aside && node.parentId), [
        allNodes,
    ]);

    const allAside = useMemo(() => allNodes.filter(node => node.aside && node.parentId), []);

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
            if (index !== 0 && index / numberOfCardsPerRow >= 1) {
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

    const renderLink = useCallback((node: OrgNode<T>, index: number) => {
        if (!node.parentId) {
            return null;
        }

        const parentId = node.parentId;
        const parent = allNodes.find(d => d.id === parentId);

        if (!parent) {
            return null;
        }

        const path = node.aside ? getAsidePath(node, parent) : getChildPath(node, parent, index);

        return (
            <path
                d={path}
                style={{
                    stroke: '#b9b9b8',
                    strokeWidth: '1px',
                    fill: 'none',
                    shapeRendering: 'crispEdges',
                }}
            />
        );
    },[allNodes]);

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
