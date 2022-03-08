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
        if (breadCrumbView === 'vertical' && fullWidthBreadCrumbs?.length > 0) {
            //Calculate new startY position to make room for vertical breadcrumbs
            const verticalBreadCrumbSpace =
                fullWidthBreadCrumbs.length * (breadCrumbHeight + breadCrumbMargin);
            dispatch({ type: 'UPDATE_START_Y_POSITION', startY: verticalBreadCrumbSpace });
        } else {
            dispatch({ type: 'UPDATE_START_Y_POSITION', startY: 0 });
        }
    }, [fullWidthBreadCrumbs, breadCrumbView, breadCrumbHeight, breadCrumbMargin]);

    const startXCoordinate = centerX - cardWidth / 2;
    const startYCoordinate = startYPosition;

    if (!breadCrumbs) {
        return null;
    }

    return (
        <g className="bread-crumbs">
            {fullWidthBreadCrumbs.map((_, index) =>
                breadCrumbView === 'vertical' ? (
                    <VerticalBreadCrumbLink index={index} key={`${index} - link`} />
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
