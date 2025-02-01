import { Fragment, useContext, useMemo, useCallback } from 'react';

import { ReportingPathContext, ReportingPathContextReducer } from '../store';
import { OrgStructure, OrgNode } from '@equinor/fusion-components';

import { useStyles } from './style';
import classNames from 'classnames';

const Links = <T extends OrgStructure>() => {
    const styles = useStyles();
    const {
        state: { allNodes, cardHeight, width, cardMargin, cardWidth },
    } = useContext<ReportingPathContextReducer<T>>(ReportingPathContext);

    const allChildren = useMemo(() => allNodes.filter((node) => node.parentId), [allNodes]);

    const getPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }
            return `
                    M ${node.x + cardMargin * 2} ${node.y + cardHeight / 2}
                    L ${parent.x + cardMargin * 2} ${parent.y + cardHeight / 2}
                    `;
        },
        [cardHeight, cardMargin]
    );

    const getLinkedPath = useCallback(
        (node: OrgNode<T>, parent: OrgNode<T>) => {
            if (node.x === null || node.y === null || parent.x === null || parent.y === null) {
                return '';
            }
            return `
                    M ${node.x + cardWidth / 2} ${node.y + cardMargin * 2}
                    H ${node.x - cardMargin}
                    V ${parent.y + cardHeight / 2}
                    `;
        },
        [cardHeight, cardMargin]
    );

    const renderLink = useCallback(
        (node: OrgNode<T>) => {
            if (!node.parentId || node.x === null || node.y === null) {
                return null;
            }

            const parentId = node.parentId;
            const parent = allNodes.find((d) => d.id === parentId);

            if (!parent) {
                return null;
            }

            const path = node.linked ? getLinkedPath(node, parent) : getPath(node, parent);
            const linkClassNames = classNames(styles.link, {
                [styles.isLinked]: node.linked,
            });

            return <path d={path} className={linkClassNames} />;
        },
        [allNodes, width]
    );

    return (
        <g className="links">
            {allChildren.map((node) => (
                <Fragment key={node.id}>{renderLink(node)}</Fragment>
            ))}
        </g>
    );
};

export default Links;
