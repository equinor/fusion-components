import { useContext, useCallback, useMemo } from 'react';
import { ReportingPathContextReducer, ReportingPathContext } from '../store';
import { OrgNode, LinkIcon, styling } from '@equinor/fusion-components';

import styles from './styles.less';

function LinkedIndicator<T>() {
    const {
        state: { allNodes, cardMargin },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const likedNodes = useMemo(() => allNodes.filter((node) => node.linked), [allNodes]);

    const renderLinkedIndicator = useCallback(
        (node: OrgNode<T>) => {
            if (node.x === null || node.y === null) {
                return null;
            }
            return (
                <>
                    <rect
                        x={node.x - cardMargin}
                        y={node.y + cardMargin}
                        width={16}
                        height={16}
                        className={styles.linkedIndicator}
                    />
                    <foreignObject
                        x={node.x - cardMargin}
                        y={node.y + cardMargin}
                        width={16}
                        height={16}
                    >
                        <LinkIcon color={styling.colors.blackAlt2} height={16} width={16} />
                    </foreignObject>
                </>
            );
        },
        [cardMargin]
    );

    return <g className="children">{likedNodes.map((node) => renderLinkedIndicator(node))}</g>;
}
export default LinkedIndicator;
