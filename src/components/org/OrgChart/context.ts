import React from 'react';
import { OrgNode, OrgChartItemProps } from './orgChartTypes';

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
    component: React.FC<OrgChartItemProps<T>>
    asideRows: number;
    childrenRows: number;
    updateAsideRows: (rows: number) => void;
    updateChildrenRows: (rows: number) => void;
    updatePosition: (node: OrgNode<T>, x: number, y: number) => void;
};

export const OrgChartContext: React.Context<OrgChartContextType<any>> = React.createContext<OrgChartContextType<any>>({} as OrgChartContextType<any>);

