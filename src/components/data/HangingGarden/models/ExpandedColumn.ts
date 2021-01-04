export type ExpandedColumn = {
    isExpanded: boolean;
    maxWidth: number;
    index: number;
};

export type ExpandedColumns = Record<string, ExpandedColumn>;