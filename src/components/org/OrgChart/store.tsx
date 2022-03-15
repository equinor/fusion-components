import { OrgNode, OrgChartItemProps, BreadCrumb, BreadCrumbView } from './orgChartTypes';
import { FC, useReducer, Reducer, Context, createContext, Dispatch } from 'react';

type Action<TChart, TBreadCrumb> =
    | { type: 'UPDATE_SIZE'; width?: number; height?: number }
    | { type: 'UPDATE_CENTER'; x?: number; y?: number }
    | {
          type: 'UPDATE_CARD_SIZE';
          width?: number;
          height?: number;
          margin?: number;
          initialWidth?: number;
      }
    | { type: 'UPDATE_ROW_MARGIN'; margin: number }
    | { type: 'UPDATE_NODES'; nodes: OrgNode<TChart>[] }
    | {
          type: 'UPDATE_COMPONENTS';
          component?: FC<OrgChartItemProps<TChart>>;
          breadCrumbComponent?: FC<BreadCrumb<TBreadCrumb>>;
      }
    | { type: 'UPDATE_ASIDE_ROWS'; rows: number }
    | { type: 'UPDATE_CHILDREN_ROWS'; rows: number }
    | { type: 'UPDATE_POSITION'; node: OrgNode<TChart>; x: number; y: number }
    | { type: 'UPDATE_LABELS'; childrenLabel?: string; asideLabel?: string }
    | { type: 'UPDATE_BREADCRUMBS'; breadcrumbs: BreadCrumb<TBreadCrumb>[] | null }
    | { type: 'UPDATE_BREADCRUMBS_SIZE'; height?: number; width?: number; margin?: number }
    | { type: 'UPDATE_NUMBER_OF_CARDS_PER_ROW'; numberOfCardsPerRow: number }
    | {
          type: 'UPDATE_ADDITIONAL_ROW_HEIGHT';
          additionalChildRowHeight?: number;
          additionalAsideRowHeight?: number;
          additionalRootRowHeight?: number;
      }
    | { type: 'UPDATE_BREADCRUMB_VIEW'; breadCrumbView: BreadCrumbView }
    | { type: 'UPDATE_START_Y_POSITION'; startY: number };

export type OrgChartContextType<TChart, TBreadCrumb> = {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    cardWidth: number;
    cardHeight: number;
    cardMargin: number;
    initialCardWidth: number;
    rowMargin: number;
    allNodes: OrgNode<TChart>[];
    component: FC<OrgChartItemProps<TChart>> | null;
    asideRows: number;
    childrenRows: number;
    childrenLabel: string | null;
    asideLabel: string | null;
    breadCrumbs: BreadCrumb<TBreadCrumb>[] | null;
    breadCrumbComponent: FC<BreadCrumb<TBreadCrumb>> | null;
    numberOfCardsPerRow: number;
    breadCrumbWidth: number;
    breadCrumbHeight: number;
    breadCrumbMargin: number;
    breadCrumbView: BreadCrumbView;
    additionalChildRowHeight: number;
    additionalAsideRowHeight: number;
    additionalRootRowHeight: number;
    startYPosition: number;
};

export type OrgChartContextReducer<TChart = unknown, TBreadCrumb = unknown> = {
    state: OrgChartContextType<TChart, TBreadCrumb>;
    dispatch: Dispatch<Action<TChart, TBreadCrumb>>;
};

export const OrgChartContext: Context<OrgChartContextReducer<any, any>> = createContext<
    OrgChartContextReducer<any, any>
>({} as OrgChartContextReducer<any, any>);

function reducer<TChart, TBreadCrumb>(
    state: OrgChartContextType<TChart, TBreadCrumb>,
    action: Action<TChart, TBreadCrumb>
): OrgChartContextType<TChart, TBreadCrumb> {
    switch (action.type) {
        case 'UPDATE_SIZE':
            return {
                ...state,
                width: action.width || state.width,
                height: action.height || state.height,
            };
        case 'UPDATE_CENTER':
            return {
                ...state,
                centerX: action.x || state.centerX,
                centerY: action.x || state.centerY,
            };
        case 'UPDATE_CARD_SIZE':
            return {
                ...state,
                cardWidth: action.width || state.cardWidth,
                cardHeight: action.height || state.cardHeight,
                cardMargin: action.margin || state.cardMargin,
                initialCardWidth: action.initialWidth || state.initialCardWidth,
            };
        case 'UPDATE_ROW_MARGIN':
            return {
                ...state,
                rowMargin: action.margin,
            };
        case 'UPDATE_NODES':
            return {
                ...state,
                allNodes: action.nodes,
            };
        case 'UPDATE_COMPONENTS':
            return {
                ...state,
                component: action.component || state.component,
                breadCrumbComponent: action.breadCrumbComponent || state.breadCrumbComponent,
            };
        case 'UPDATE_ASIDE_ROWS':
            return {
                ...state,
                asideRows: action.rows,
            };
        case 'UPDATE_CHILDREN_ROWS':
            return {
                ...state,
                childrenRows: action.rows,
            };
        case 'UPDATE_POSITION':
            return {
                ...state,
                allNodes: state.allNodes.map((prevNode) => {
                    if (prevNode.id === action.node.id) {
                        return {
                            ...action.node,
                            x: action.x,
                            y: action.y,
                        };
                    } else {
                        return prevNode;
                    }
                }),
            };
        case 'UPDATE_LABELS':
            return {
                ...state,
                childrenLabel: action.childrenLabel || state.childrenLabel,
                asideLabel: action.asideLabel || state.asideLabel,
            };
        case 'UPDATE_BREADCRUMBS':
            return {
                ...state,
                breadCrumbs: action.breadcrumbs,
            };
        case 'UPDATE_BREADCRUMBS_SIZE':
            return {
                ...state,
                breadCrumbWidth: action.width || state.breadCrumbWidth,
                breadCrumbHeight: action.height || state.breadCrumbHeight,
                breadCrumbMargin: action.margin || state.breadCrumbMargin,
            };
        case 'UPDATE_NUMBER_OF_CARDS_PER_ROW':
            return {
                ...state,
                numberOfCardsPerRow: action.numberOfCardsPerRow,
            };
        case 'UPDATE_ADDITIONAL_ROW_HEIGHT':
            return {
                ...state,
                additionalChildRowHeight:
                    action.additionalChildRowHeight !== undefined
                        ? action.additionalChildRowHeight
                        : state.additionalChildRowHeight,
                additionalAsideRowHeight:
                    action.additionalAsideRowHeight !== undefined
                        ? action.additionalAsideRowHeight
                        : state.additionalAsideRowHeight,
                additionalRootRowHeight:
                    action.additionalRootRowHeight !== undefined
                        ? action.additionalRootRowHeight
                        : state.additionalRootRowHeight,
            };
        case 'UPDATE_BREADCRUMB_VIEW':
            return {
                ...state,
                breadCrumbView: action.breadCrumbView,
            };

        case 'UPDATE_START_Y_POSITION':
            return {
                ...state,
                startYPosition: action.startY,
            };
    }
}

export function OrgChartContextProvider<TChart, TBreadCrumb>({ children }: any) {
    const initialState: OrgChartContextType<TChart, TBreadCrumb> = {
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
        cardWidth: 0,
        cardHeight: 0,
        cardMargin: 0,
        initialCardWidth: 0,
        rowMargin: 0,
        allNodes: [],
        asideRows: 0,
        childrenRows: 0,
        component: null,
        childrenLabel: null,
        asideLabel: null,
        breadCrumbs: null,
        breadCrumbComponent: null,
        numberOfCardsPerRow: 0,
        breadCrumbWidth: 0,
        breadCrumbHeight: 0,
        breadCrumbMargin: 0,
        additionalChildRowHeight: 0,
        additionalAsideRowHeight: 0,
        additionalRootRowHeight: 0,
        breadCrumbView: 'collapsed',
        startYPosition: 0,
    };

    const [state, dispatch] = useReducer<
        Reducer<OrgChartContextType<TChart, TBreadCrumb>, Action<TChart, TBreadCrumb>>
    >(reducer, initialState);
    const value = { state, dispatch };

    return <OrgChartContext.Provider value={value}>{children}</OrgChartContext.Provider>;
}
