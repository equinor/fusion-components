import React, { useContext, useCallback, useMemo } from 'react';
import { OrgChartContextReducer, OrgChartContext } from '../store';
import { OrgNode } from '../orgChartTypes';

import styles from './styles.less';

const Labels = () => {
    const {
        state: { allNodes, rowMargin, cardWidth, asideLabel, childrenLabel, centerX },
    } = useContext<OrgChartContextReducer<any>>(OrgChartContext);

    const childLabelNode = useMemo(() => {
        const childNodes = allNodes.filter(node => !node.aside && node.parentId);
        const firstChildNode = childNodes.length && childNodes[0];
        return {
            data: childrenLabel,
            id: childrenLabel,
            x: centerX - cardWidth - 15,
            y: firstChildNode && firstChildNode.y - 34,
        } as OrgNode<string>;
    }, [allNodes, centerX, childrenLabel]);

    const asideLabelNode = useMemo(() => {
        const asideNodes = allNodes.filter(node => node.aside && node.parentId);
        const firstAsideNode = asideNodes.length && asideNodes[0];
        return {
            data: asideLabel,
            id: asideLabel,
            x: firstAsideNode && firstAsideNode.x - 15,
            y: firstAsideNode && firstAsideNode.y - 18,
        } as OrgNode<string>;
    }, [allNodes, asideLabel]);

    const renderLabel = useCallback(
        (node: OrgNode<any>) => {
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
                        <div className={styles.labelObject}>{node.data}</div>
                    </foreignObject>
                </>
            );
        },
        [cardWidth, rowMargin]
    );

    return (
        <g className="label">
            {asideLabelNode && renderLabel(asideLabelNode)}
            {childLabelNode && renderLabel(childLabelNode)}
        </g>
    );
};

export default Labels;
