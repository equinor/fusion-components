import { OrgChartItemProps, OrgNode } from '@equinor/fusion-components';
import { FC, useReducer, Reducer, Context, createContext, Dispatch } from 'react';

type Action<T> =
    | { type: 'UPDATE_SIZE'; width?: number; height?: number }
    | {
          type: 'UPDATE_CARD_SIZE';
          width?: number;
          height?: number;
          margin?: number;
          initialWidth?: number;
      }
    | { type: 'UPDATE_ROW_MARGIN'; margin: number }
    | { type: 'UPDATE_NODES'; nodes: OrgNode<T>[] }
    | {
          type: 'UPDATE_COMPONENT';
          component: FC<OrgChartItemProps<T>>;
      }
    | { type: 'UPDATE_CHILDREN_ROWS'; rows: number }
    | { type: 'UPDATE_POSITION'; node: OrgNode<T>; x: number; y: number };

export type ReportingPathContextType<T> = {
    width: number;
    height: number;
    cardWidth: number;
    cardHeight: number;
    cardMargin: number;
    initialCardWidth: number;
    rowMargin: number;
    allNodes: OrgNode<T>[];
    component: FC<OrgChartItemProps<T>> | null;
    childrenRows: number;
};

export type ReportingPathContextReducer<T> = {
    state: ReportingPathContextType<T>;
    dispatch: Dispatch<Action<T>>;
};

export const ReportingPathContext: Context<ReportingPathContextReducer<any>> = createContext<
    ReportingPathContextReducer<any>
>({} as ReportingPathContextReducer<any>);

function reducer<T>(
    state: ReportingPathContextType<T>,
    action: Action<T>
): ReportingPathContextType<T> {
    switch (action.type) {
        case 'UPDATE_SIZE':
            return {
                ...state,
                width: action.width || state.width,
                height: action.height || state.height,
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
        case 'UPDATE_COMPONENT':
            return {
                ...state,
                component: action.component,
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
    }
}

export function ReportingPathContextProvider<T>({ children }: any) {
    const initialState: ReportingPathContextType<T> = {
        width: 0,
        height: 0,
        cardWidth: 0,
        cardHeight: 0,
        cardMargin: 0,
        initialCardWidth: 0,
        rowMargin: 0,
        allNodes: [],
        childrenRows: 0,
        component: null,
    };

    const [state, dispatch] = useReducer<Reducer<ReportingPathContextType<T>, Action<T>>>(
        reducer,
        initialState
    );
    const value = { state, dispatch };

    return <ReportingPathContext.Provider value={value}>{children}</ReportingPathContext.Provider>;
}
