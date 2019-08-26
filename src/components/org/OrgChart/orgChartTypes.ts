export type OrgChartItemProps<T> = {
    item: T;
} 

export type OrgChartProps<T> = {
    structure: T[];
    component: React.FC<OrgChartItemProps<T>> | null
    cardWidth?: number;
    cardHeight?: number;
    cardMargin?: number;
    rowMargin?: number;
    asideLabel?: string;
    childrenLabel?: string;
};

export type OrgStructure = {
    id: string;
    parentId?: string;
    aside?: boolean;
    parentLink?: React.FC
}

export type OrgNode<T> = OrgStructure & {
    x:number;
    y:number;
    data: T;
}