import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FC, Fragment, useContext, useMemo } from 'react';
import { BreadCrumb } from '../../orgChartTypes';
import { OrgChartContext, OrgChartContextReducer } from '../../store';
import { DropdownContainer } from './dropDown';

type BreadCrumbItemProps<TBreadCrumb> = {
    breadCrumb: BreadCrumb<TBreadCrumb>;
    index: number;
    startXCoordinate: number;
    startYCoordinate: number;
    collapsedBreadCrumbs: BreadCrumb<TBreadCrumb>[] | null;
};
const useStyles = makeStyles(
    () =>
        createStyles({
            breadCrumbRect: {
                fill: 'none',
            },
        }),
    { name: 'bred-crumb-item-styles' }
);
function BreadCrumbItem<TChart, TBreadCrumb>({
    breadCrumb,
    index,
    startXCoordinate,
    collapsedBreadCrumbs,
}: BreadCrumbItemProps<TBreadCrumb>): JSX.Element {
    const {
        state: {
            breadCrumbComponent,
            breadCrumbWidth,
            breadCrumbHeight,
            breadCrumbMargin,
            cardMargin,
            startYPosition,
            breadCrumbView,
            centerX,
            numberOfCardsPerRow,
            cardWidth,
        },
    } = useContext<OrgChartContextReducer<TChart, TBreadCrumb>>(OrgChartContext);
    const componentX = useMemo(() => {
        if (breadCrumbView === 'vertical') {
            return numberOfCardsPerRow === 1
                ? cardWidth / 2 - (breadCrumbWidth + breadCrumbMargin) / 2
                : centerX - breadCrumbWidth / 2;
        }
        return centerX - cardWidth / 2 - (breadCrumbWidth + breadCrumbMargin) * (index + 1);
    }, [
        breadCrumbView,
        startXCoordinate,
        breadCrumbWidth,
        breadCrumbMargin,
        index,
        centerX,
        cardWidth,
        numberOfCardsPerRow,
    ]);

    const componentY = useMemo(() => {
        if (breadCrumbView === 'vertical') {
            return startYPosition - (index + 1) * (breadCrumbMargin + breadCrumbHeight);
        }
        return startYPosition + cardMargin / 2;
    }, [startYPosition, cardMargin, breadCrumbView, breadCrumbHeight, breadCrumbMargin, index]);

    const BreadCrumbComponent = breadCrumbComponent;
    const styles = useStyles();
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
                    <DropdownContainer items={collapsedBreadCrumbs} breadCrumb={breadCrumb}>
                        <BreadCrumbComponent
                            label={breadCrumb.label}
                            id={breadCrumb.id}
                            childId={breadCrumb.childId}
                            content={breadCrumb.content}
                            breadCrumbItem={breadCrumb.breadCrumbItem}
                            linked={breadCrumb.linked}
                        />
                    </DropdownContainer>
                )}
            </foreignObject>
        </Fragment>
    );
}
export default BreadCrumbItem;
