import React, { useContext } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgStructure, OrgNode } from '../orgChartTypes';

const Links = <T extends OrgStructure>() => {
    const {
        state: { allNodes, cardWidth, cardHeight, centerX, width, cardMargin },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const numberOfCardsPerRow = Math.floor((width + cardMargin) / (cardWidth + cardMargin));
    const allChildren = allNodes.filter(node => !node.aside && node.parentId);
    const allAside = allNodes.filter(node => node.aside && node.parentId);

    const renderLink = (node: OrgNode<T>, index: number) => {
        if (!node.parentId) {
            return null;
        }

        const parentId = node.parentId;
        const parent = allNodes.find(d => d.id === parentId);

        if (!parent) {
            return null;
        }

        let path = '';
        if (node.aside) {
            if (node.x > centerX) {
                path = `
                    M ${node.x + 10} ${node.y + cardHeight / 2}
                    L ${centerX} ${node.y + cardHeight / 2}
                    L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
                    `;
            } else {
                path = `
                M ${node.x + cardWidth - 10} ${node.y + cardHeight / 2}
                L ${centerX} ${node.y + cardHeight / 2}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
            `;
            }
        } else if (index !== 0 && index / numberOfCardsPerRow >= 1) {
            // Children row that will align left
            const firstChild = allChildren[0];
            path = `
                M ${node.x + cardWidth / 2} ${node.y + 10}
                V ${node.y - 10}
                H ${firstChild.x + cardWidth + cardMargin / 2}
                V ${firstChild.y - 10}
                H ${centerX}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
            `;
        } else {
            path = `
                M ${node.x + cardWidth / 2} ${node.y + 10}
                V ${node.y - 10}
                H ${centerX}
                L ${parent.x + cardWidth / 2} ${parent.y + cardHeight - 10}
            `;
        }

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
    };

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
