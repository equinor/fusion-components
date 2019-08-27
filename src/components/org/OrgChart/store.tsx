import { OrgNode, OrgChartItemProps, BreadCrumb, BreadCrumbProps } from './orgChartTypes';
import React, { FC, useReducer, Reducer, Context, createContext, Dispatch } from 'react';

type Action<T> =
    | { type: 'UPDATE_SIZE'; width?: number; height?: number }
    | { type: 'UPDATE_CENTER'; x?: number; y?: number }
    | { type: 'UPDATE_CARD_SIZE'; width?: number; height?: number; margin?: number }
    | { type: 'UPDATE_ROW_MARGIN'; margin: number }
    | { type: 'UPDATE_NODES'; nodes: OrgNode<T>[] }
    | { type: 'UPDATE_COMPONENTS'; component?: FC<OrgChartItemProps<T>>, breadCrumbComponent?:FC<BreadCrumbProps> }
    | { type: 'UPDATE_ASIDE_ROWS'; rows: number }
    | { type: 'UPDATE_CHILDREN_ROWS'; rows: number }
    | { type: 'UPDATE_POSITION'; node: OrgNode<T>; x: number; y: number }
    | { type: 'UPDATE_LABELS'; childrenLabel?: string; asideLabel?: string }

export type OrgChartContextType<T> = {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    cardWidth: number;
    cardHeight: number;
    cardMargin: number;
    rowMargin: number;
    allNodes: OrgNode<T>[];
    component: React.FC<OrgChartItemProps<T>> | null;
    asideRows: number;
    childrenRows: number;
    childrenLabel: string | null;
    asideLabel: string | null;
    breadCrumbs: BreadCrumb[] | null;
    breadCrumbComponent: React.FC<BreadCrumbProps> | null;
};

export type OrgChartContextReducer<T> = {
    state: OrgChartContextType<T>;
    dispatch: Dispatch<Action<T>>;
};

export const OrgChartContext: Context<OrgChartContextReducer<any>> = createContext<
    OrgChartContextReducer<any>
>({} as OrgChartContextReducer<any>);

function reducer<T>(state: OrgChartContextType<T>, action: Action<T>): OrgChartContextType<T> {
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
                allNodes: state.allNodes.map(prevNode => {
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
    }
}

export function OrgChartContextProvider<T>({ children }: any) {
    const initialState: OrgChartContextType<T> = {
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
        cardWidth: 0,
        cardHeight: 0,
        cardMargin: 0,
        rowMargin: 0,
        allNodes: [],
        asideRows: 0,
        childrenRows: 0,
        component: null,
        childrenLabel: null,
        asideLabel: null,
        breadCrumbs: null,
        breadCrumbComponent: null,
    };

    const [state, dispatch] = useReducer<Reducer<OrgChartContextType<T>, Action<T>>>(
        reducer,
        initialState
    );
    const value = { state, dispatch };

    return <OrgChartContext.Provider value={value}>{children}</OrgChartContext.Provider>;
}
