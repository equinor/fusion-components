import React, { useContext, useCallback, useMemo } from 'react';
import { OrgChartContextReducer, OrgChartContext } from '../store';
import { OrgNode } from '../orgChartTypes';

import styles from './styles.less';
import classNames from 'classnames';

const Labels = () => {
    const {
        state: {
            allNodes,
            rowMargin,
            cardWidth,
            asideLabel,
            childrenLabel,
            centerX,
            numberOfCardsPerRow,
            asideRows,
            childrenRows,
        },
    } = useContext<OrgChartContextReducer<any>>(OrgChartContext);

    const labelRectClassnames = classNames(styles.labelObject, {
        [styles.oneCardRow]: numberOfCardsPerRow === 1,
    });

    const getOneCardRowNode = useCallback((label: string, firstNode: OrgNode<any>) => {
        return {
            data: label,
            id: label,
            x: firstNode.x === null ? null : firstNode.x + 10,
            y: firstNode.y === null ? null : firstNode.y - 18,
        } as OrgNode<string>;
    }, []);

    const childLabelNode = useMemo(() => {
        const childNodes = allNodes.filter(node => !node.aside && node.parentId);
        const firstChildNode = childNodes.length && childNodes[0];
        const marginY = childNodes.length === 1 ? 8 : 28
        if (firstChildNode && childrenLabel && numberOfCardsPerRow === 1) {
            return getOneCardRowNode(childrenLabel, firstChildNode);
        }
        return {
            data: childrenLabel,
            id: childrenLabel,
            x: centerX - cardWidth - 25,
            y: firstChildNode && firstChildNode.y !== null && firstChildNode.y - marginY ,
        } as OrgNode<string>;
    }, [allNodes, centerX, childrenLabel]);

    const asideLabelNode = useMemo(() => {
        const asideNodes = allNodes.filter(node => node.aside && node.parentId);
        const firstAsideNode = asideNodes.length && asideNodes[0];

        if (firstAsideNode && asideLabel && numberOfCardsPerRow === 1) {
            return getOneCardRowNode(asideLabel, firstAsideNode);
        }
        return {
            data: asideLabel,
            id: asideLabel,
            x: firstAsideNode && firstAsideNode.x !== null && firstAsideNode.x - 15,
            y: firstAsideNode && firstAsideNode.y !== null && firstAsideNode.y - 8,
        } as OrgNode<string>;
    }, [allNodes, asideLabel]);

    const renderLabel = useCallback(
        (node: OrgNode<any>) => {
            if (node.x === null || node.y === null) {
                return null;
            }

            return (
                <>
                    <rect
                        x={node.x}
                        y={node.y}
                        width={cardWidth}
                        height={24}
                        className={styles.labelRect}
                    />
                    <foreignObject x={node.x} y={node.y} width={cardWidth} height={24}>
                        <div className={labelRectClassnames}>{node.data}</div>
                    </foreignObject>
                </>
            );
        },
        [cardWidth, rowMargin, labelRectClassnames]
    );

    return (
        <g className="label">
            {asideLabelNode && asideRows && renderLabel(asideLabelNode)}
            {childLabelNode && childrenRows && renderLabel(childLabelNode)}
        </g>
    );
};

export default Labels;
