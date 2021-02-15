import { FC } from 'react';

export type OrgChartItemProps<T> = {
    item: T;
};

export type OrgChartProps<T> = {
    structure: T[];
    component: FC<OrgChartItemProps<T>> | null;
    cardWidth?: number;
    cardHeight?: number;
    cardMargin?: number;
    rowMargin?: number;
    asideLabel?: string;
    childrenLabel?: string;
    breadCrumbComponent?: FC<BreadCrumb>;
    breadCrumbs?: BreadCrumb[];
    breadCrumbWidth?: number;
    breadCrumbHeight?: number;
    breadCrumbMargin?: number;
};

export type OrgStructure = {
    id: string;
    parentId?: string;
    aside?: boolean;
    linked?: boolean;
    numberOfAssignees?: number;
};

export type OrgNode<T> = OrgStructure & {
    x: number | null;
    y: number | null;
    data: T;
};

export type BreadCrumb = {
    childId: string;
    label?: string;
    id?: string;
};
