import { FC } from 'react';

export type OrgChartItemProps<TChart> = {
    item: TChart;
};

export type BreadCrumbView = 'collapsed' | 'horizontal' | 'vertical';

export type OrgChartProps<TChart, TBreadCrumb> = {
    structure: TChart[];
    component: FC<OrgChartItemProps<TChart>> | null;
    cardWidth?: number;
    cardHeight?: number;
    cardMargin?: number;
    rowMargin?: number;
    asideLabel?: string;
    childrenLabel?: string;
    breadCrumbComponent?: FC<BreadCrumb<TBreadCrumb>>;
    breadCrumbs?: BreadCrumb<TBreadCrumb>[];
    breadCrumbWidth?: number;
    breadCrumbHeight?: number;
    breadCrumbMargin?: number;
    breadCrumbBorder?: number;
    bredCrumbView?: BreadCrumbView;
};

export type OrgStructure = {
    id: string;
    parentId?: string;
    aside?: boolean;
    linked?: boolean;
    numberOfAssignees?: number;
};

export type OrgNode<TChart = unknown> = OrgStructure & {
    x: number | null;
    y: number | null;
    data: TChart;
};

export type BreadCrumb<TBreadCrumb = unknown> = {
    childId: string;
    label?: string;
    id?: string;
    linked?: boolean;
    content?: JSX.Element;
    breadCrumbItem?: TBreadCrumb;
};
