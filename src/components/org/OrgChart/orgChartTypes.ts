export type OrgChartItemProps<T> = {
    item: T;
};

export type BreadCrumbProps = {
    label: string;
    childId?: string;
    id?: string;
};

export type OrgChartProps<T> = {
    structure: T[];
    component: React.FC<OrgChartItemProps<T>> | null;
    cardWidth?: number;
    cardHeight?: number;
    cardMargin?: number;
    rowMargin?: number;
    asideLabel?: string;
    childrenLabel?: string;
    breadCrumbComponent?: React.FC<BreadCrumbProps>
};

export type OrgStructure = {
    id: string;
    parentId?: string;
    aside?: boolean;
    breadCrumbs?: BreadCrumb[];
};

export type OrgNode<T> = OrgStructure & {
    x: number;
    y: number;
    data: T;
};

export type BreadCrumb = {
    childId: string;
    label: string;
    onClick?: any;
    id: string;
};
