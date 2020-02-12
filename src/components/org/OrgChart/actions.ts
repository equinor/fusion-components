import { OrgNode, OrgChartProps, OrgStructure } from './orgChartTypes';
import { useEffect, useContext } from 'react';
import { OrgChartContextReducer, OrgChartContext } from './store';

type OrgChartActionProps<T> = OrgChartProps<T> & {
    parentHeight: number;
    parentWidth: number;
};

const useOrgChartActions = <T extends OrgStructure>({
    structure,
    cardWidth = 340,
    cardHeight = 132,
    cardMargin = 16,
    rowMargin = 148,
    component,
    childrenLabel,
    asideLabel,
    breadCrumbComponent,
    parentHeight,
    parentWidth,
    breadCrumbs,
    breadCrumbWidth = 194,
    breadCrumbHeight = 52,
    breadCrumbMargin = 16,
}: OrgChartActionProps<T>) => {
    const { dispatch } = useContext<OrgChartContextReducer<T>>(OrgChartContext);

    const generateNodes = (structure: T[]): OrgNode<T>[] => {
        return structure.map(item => {
            return {
                id: item.id,
                parentId: item.parentId,
                x: null,
                y: null,
                data: item,
                aside: item.aside,
                linked: item.linked,
                numberOfAssignees: item.numberOfAssignees
            };
        });
    };

    useEffect(() => {
        dispatch({
            type: 'UPDATE_LABELS',
            asideLabel: asideLabel,
            childrenLabel: childrenLabel,
        });
    }, [asideLabel, childrenLabel]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_NODES',
            nodes: generateNodes(structure),
        });
    }, [structure]);

    useEffect(() => {
        if (component || breadCrumbComponent) {
            dispatch({
                type: 'UPDATE_COMPONENTS',
                component: component || undefined,
                breadCrumbComponent: breadCrumbComponent || undefined,
            });
        }
    }, [component, breadCrumbComponent]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_CARD_SIZE',
            height: cardHeight,
            width: cardWidth,
            margin: cardMargin,
            initialWidth: cardWidth,
        });
    }, [cardHeight, cardWidth, cardMargin]);

    useEffect(() => {
        if (rowMargin) {
            dispatch({
                type: 'UPDATE_ROW_MARGIN',
                margin: rowMargin,
            });
        }
    }, [rowMargin]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_SIZE',
            height: parentHeight,
            width: parentWidth,
        });
        dispatch({
            type: 'UPDATE_CENTER',
            x: parentWidth / 2,
            y: parentHeight / 2,
        });
    }, [parentHeight, parentWidth]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_BREADCRUMBS',
            breadcrumbs: breadCrumbs || null,
        });
    }, [breadCrumbs]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_BREADCRUMBS_SIZE',
            width: breadCrumbWidth,
            height: breadCrumbHeight,
            margin: breadCrumbMargin,
        });
    }, [breadCrumbHeight, breadCrumbMargin, breadCrumbWidth]);
};

export default useOrgChartActions;
