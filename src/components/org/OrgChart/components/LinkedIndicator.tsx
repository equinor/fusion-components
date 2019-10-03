import React, { useContext, useCallback, useMemo } from 'react';
import { OrgChartContextReducer, OrgChartContext } from '../store';
import { OrgNode, LinkIcon, styling } from '@equinor/fusion-components';

import styles from './styles.less';

function LinkedIndicator<T>() {
    const {
        state: { allNodes, cardMargin, centerX, cardWidth, numberOfCardsPerRow },
    } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const likedNodes = useMemo(() => allNodes.filter(node => node.linked), [allNodes]);

    const getXCoordinate = useCallback(
        (node: OrgNode<T>) => {
            if (node.x === null || node.y === null) {
                return 0;
            }
            if (numberOfCardsPerRow === 1) {
                return node.x - cardMargin  / 4;
            }
            if (node.aside) {
                if (node.x < centerX) {
                    return node.x + cardWidth - cardMargin / 4;
                }
                return node.x - cardMargin / 4;
            }
            return node.x + cardWidth / 2 + cardMargin / 4;
        },
        [cardMargin, centerX, cardWidth, numberOfCardsPerRow, allNodes]
    );

    const getYCoordinate = useCallback(
        (node: OrgNode<T>) => {
            if (node.x === null || node.y === null) {
                return 0;
            }
            if (numberOfCardsPerRow === 1) {
                return node.y + cardMargin / 2;
            }
            if (node.aside) {
                return node.y + cardMargin / 2;
            }
            return node.y - cardMargin / 4;
        },
        [cardMargin, numberOfCardsPerRow]
    );

    const renderLinkedIndicator = useCallback(
        (node: OrgNode<T>) => {
            if (node.x === null || node.y === null) {
                return null;
            }

            const x = getXCoordinate(node);
            const y = getYCoordinate(node);

            return (
                <>
                    <rect x={x} y={y} width={16} height={16} className={styles.linkedIndicator} />
                    <foreignObject x={x} y={y} width={16} height={16}>
                        <LinkIcon color={styling.colors.blackAlt2} height={16} width={16} />
                    </foreignObject>
                </>
            );
        },
        [cardMargin, centerX, cardWidth, numberOfCardsPerRow, ]
    );

    return <g className="linked-indicator">{likedNodes.map(node => renderLinkedIndicator(node))}</g>;
}
export default LinkedIndicator;
