import React, { useCallback, useContext } from 'react';
import { BreadCrumb } from '../orgChartTypes';

import styles from './styles.less';
import { OrgChartContextReducer, OrgChartContext } from '../store';

const BreadCrumbs = () => {
    const {
        state: { breadCrumbComponent, breadCrumbs, centerX, cardWidth, numberOfCardsPerRow },
    } = useContext<OrgChartContextReducer<any>>(OrgChartContext);

    const componentWidth = 194;
    const componentHeight = 52;
    const x = centerX - cardWidth / 2;
    const y = 0;

    const renderLink = useCallback(
        (index: number) => {
            const path = `
            M ${x - componentWidth * (index + 1)} ${y + componentHeight / 2}
            L ${x + 10} ${y + componentHeight / 2}
            `;
            return <path d={path} className={styles.link} />;
        },
        [componentHeight, componentWidth, x, y]
    );

    const renderComponent = useCallback(
        (breadCrumb: BreadCrumb, index: number) => {
            const componentX = x - (componentWidth + 10) * (index + 1);
            const componentY = y;

            const BreadCrumbComponent = breadCrumbComponent;
            return (
                <React.Fragment key={index + 'bread-crumb'}>
                    <rect
                        x={componentX}
                        y={componentY}
                        width={componentWidth}
                        height={componentHeight}
                        className={styles.breadCrumbRect}
                    />
                    <foreignObject
                        x={componentX}
                        y={componentY}
                        width={componentWidth}
                        height={componentHeight}
                    >
                        {BreadCrumbComponent && (
                            <BreadCrumbComponent
                                label={breadCrumb.label}
                                id={breadCrumb.id}
                                childId={breadCrumb.childId}
                            />
                        )}
                    </foreignObject>
                </React.Fragment>
            );
        },
        [breadCrumbs, x, y, breadCrumbComponent]
    );

    if (!breadCrumbs || numberOfCardsPerRow === 1) {
        return null;
    }

    return (
        <g className="bread-crumbs">
            {breadCrumbs.map((crumb, index) => {
                return renderLink(index);
            })}
            {breadCrumbs.map((crumb, index) => {
                return renderComponent(crumb, index);
            })}
        </g>
    );
};

export default BreadCrumbs;
