import { Fragment, useContext, useMemo, useCallback } from 'react';

import { OrgChartContext, OrgChartContextReducer } from '../store';
import { OrgStructure, OrgNode } from '../orgChartTypes';

import { useStyles } from './style';
import classNames from 'classnames';

const Links = <T extends OrgStructure>() => {
    const styles = useStyles();
    const {
        state: { allNodes, cardWidth, cardHeight, centerX, cardMargin, numberOfCardsPerRow, width },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const allChildren = useMemo(() => allNodes.filter((node) => !node.aside && node.parentId), [
        allNodes,
    ]);

    const allAside = useMemo(() => allNodes.filter((node) => node.aside && node.parentId), [
        allNodes,
    ]);

    const centerHeight = cardHeight / 2;
    const centerWidth = cardWidth / 2;
    const pixelPusher = 0.5; //Needed for overlapping svg paths in Edge

    const getAsidePath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }
            return `
                M ${node.x + centerWidth} ${node.y + cardMargin + pixelPusher}
                H ${Math.floor(centerX) + pixelPusher}
                V ${parent.y + centerHeight + pixelPusher}
                `;
        },
        [centerX, cardHeight, cardWidth, pixelPusher]
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
                    M ${Math.floor(node.x + centerWidth) + pixelPusher} ${node.y + centerHeight}
                    V ${node.y - 10 + pixelPusher}
                    H ${Math.floor(firstChild.x + cardWidth + cardMargin / 2) + pixelPusher}
                    V ${firstChild.y - 10 + pixelPusher}
                    H ${Math.floor(centerX) + pixelPusher}
                    V ${parent.y + centerHeight + pixelPusher}
                    `;
            }
            return `
                M ${Math.floor(node.x + centerWidth) + pixelPusher} ${node.y + centerHeight}
                V ${node.y - 10 + pixelPusher}
                H ${Math.floor(centerX) + pixelPusher}
                V ${parent.y + centerHeight + pixelPusher}
                `;
        },
        [centerX, cardHeight, cardWidth, numberOfCardsPerRow, allChildren, pixelPusher]
    );

    const getSingleCardRowPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }

            if (width < cardWidth + 30) {
                return `
                    M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                    H ${node.x - 10 + pixelPusher}
                    L ${parent.x + 20 + pixelPusher} ${parent.y + centerHeight}
                    `;
            }
            if (width < cardWidth * 1.5 + 10) {
                const range = width - cardWidth - 10;
                return `
                    M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                    H ${node.x - 10 + pixelPusher}
                    L ${parent.x + range + pixelPusher} ${parent.y + centerHeight}
                    `;
            }
            return `
                M ${node.x + centerWidth} ${node.y + cardHeight / 4}
                H ${node.x - 10 + pixelPusher}
                L ${parent.x + centerWidth + pixelPusher} ${parent.y + centerHeight}
                `;
        },
        [allChildren, cardHeight, cardWidth, width, pixelPusher]
    );

    const renderLink = useCallback(
        (node: OrgNode<T>, index: number) => {
            if (!node.parentId) {
                return null;
            }

            const parentId = node.parentId;
            const parent = allNodes.find((d) => d.id === parentId);

            if (!parent) {
                return null;
            }

            const linkClassnames = classNames(styles.link, {
                [styles.isLinked]: node.linked,
            });

            const path =
                numberOfCardsPerRow === 1
                    ? getSingleCardRowPath(node, parent)
                    : node.aside
                        ? getAsidePath(node, parent)
                        : getChildPath(node, parent, index);

            return <path d={path} className={linkClassnames} />;
        },
        [allNodes, width]
    );

    return (
        <g className="links">
            {allChildren.map((node, index) => (
                <Fragment key={node.id}>{renderLink(node, index)}</Fragment>
            ))}
            {allAside.map((node, index) => (
                <Fragment key={node.id}>{renderLink(node, index)}</Fragment>
            ))}
        </g>
    );
};

export default Links;
