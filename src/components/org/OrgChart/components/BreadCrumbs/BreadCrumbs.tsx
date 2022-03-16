import { FC, useContext, useEffect } from 'react';

import { OrgChartContextReducer, OrgChartContext } from '../../store';
import BreadCrumbItem from './BreadCrumbItem';
import { HorizontalBreadCrumbLink, VerticalBreadCrumbLink } from './links';

function BreadCrumbs<TChart, TBreadCrumb>(): JSX.Element {
    const {
        state: {
            breadCrumbs,
            centerX,
            cardWidth,
            breadCrumbView,
            breadCrumbHeight,
            breadCrumbMargin,
            startYPosition,
        },
        dispatch,
    } = useContext<OrgChartContextReducer<TChart, TBreadCrumb>>(OrgChartContext);

    const fullWidthBreadCrumbs =
        breadCrumbView === 'collapsed' ? breadCrumbs?.slice(0, 1) : breadCrumbs;
    const collapsedBreadCrumbs = breadCrumbView === 'collapsed' ? breadCrumbs?.slice(1) : [];

    useEffect(() => {
        const verticalBreadCrumbSpace =
            breadCrumbView === 'vertical'
                ? (breadCrumbs?.length || 0) * (breadCrumbHeight + breadCrumbMargin)
                : 0;
        dispatch({ type: 'UPDATE_START_Y_POSITION', startY: verticalBreadCrumbSpace });
    }, [breadCrumbs, breadCrumbView, breadCrumbHeight, breadCrumbMargin]);

    const startXCoordinate = centerX - cardWidth / 2;
    const startYCoordinate = startYPosition;

    if (!breadCrumbs) {
        return null;
    }

    return (
        <g className="bread-crumbs">
            {fullWidthBreadCrumbs.map((breadCrumb, index, allBreadCrumbs) =>
                breadCrumb.linked ? null : breadCrumbView === 'vertical' ? (
                    <VerticalBreadCrumbLink
                        index={index}
                        key={`${index} - link`}
                        totalBreadCrumbsLength={allBreadCrumbs.length}
                    />
                ) : (
                    <HorizontalBreadCrumbLink index={index} key={`${index} - link`} />
                )
            )}
            {fullWidthBreadCrumbs.map((crumb, index) => (
                <BreadCrumbItem
                    breadCrumb={crumb}
                    index={index}
                    key={`${index} - crumb`}
                    startXCoordinate={startXCoordinate}
                    startYCoordinate={startYCoordinate}
                    collapsedBreadCrumbs={
                        index + 1 === fullWidthBreadCrumbs.length ? collapsedBreadCrumbs : null
                    }
                />
            ))}
        </g>
    );
}

export default BreadCrumbs;
