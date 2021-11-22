import { Fragment, useCallback, useContext } from 'react';
import { BreadCrumb } from '../orgChartTypes';

import styles from './styles.less';
import { OrgChartContextReducer, OrgChartContext } from '../store';

const BreadCrumbs = () => {
    const {
        state: {
            breadCrumbComponent,
            breadCrumbs,
            centerX,
            cardWidth,
            numberOfCardsPerRow,
            breadCrumbWidth,
            breadCrumbHeight,
            breadCrumbMargin,
            // extendedBreadCrumbLine,
        },
    } = useContext<OrgChartContextReducer<any>>(OrgChartContext);

    const x = centerX - cardWidth / 2;
    const y = 0;

    const renderLink = useCallback(
        (index: number, extendedBreadCrumbLine?: boolean) => {
            const mx = extendedBreadCrumbLine ? 0 : x - breadCrumbWidth * (index + 1);
            const my = y + breadCrumbHeight / 2 + 0.5;

            const path = `
            M ${mx} ${my}
            H ${x + cardWidth / 2}
            `;
            return <path d={path} className={styles.link} />;
        },
        [breadCrumbHeight, breadCrumbWidth, x, y]
    );

    const renderComponent = useCallback(
        (breadCrumb: BreadCrumb, index: number) => {
            const componentX = x - (breadCrumbWidth + breadCrumbMargin) * (index + 1);
            const componentY = y;

            const BreadCrumbComponent = breadCrumbComponent;
            return (
                <Fragment key={index + 'bread-crumb'}>
                    <rect
                        x={componentX}
                        y={componentY}
                        width={breadCrumbWidth}
                        height={breadCrumbHeight}
                        className={styles.breadCrumbRect}
                    />
                    <foreignObject
                        x={componentX}
                        y={componentY}
                        width={breadCrumbWidth}
                        height={breadCrumbHeight}
                    >
                        {BreadCrumbComponent && (
                            <BreadCrumbComponent
                                label={breadCrumb.label}
                                id={breadCrumb.id}
                                childId={breadCrumb.childId}
                            />
                        )}
                    </foreignObject>
                </Fragment>
            );
        },
        [breadCrumbs, x, y, breadCrumbComponent]
    );

    if (!breadCrumbs || numberOfCardsPerRow === 1) {
        return null;
    }

    return (
        <g className="bread-crumbs">
            {breadCrumbs.map((_, index) => {
                return renderLink(index, true);
            })}
            {breadCrumbs.map((crumb, index) => {
                return renderComponent(crumb, index);
            })}
        </g>
    );
};

export default BreadCrumbs;
