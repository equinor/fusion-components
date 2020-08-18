import React from 'react';
import { Pagination, SortDirection } from '@equinor/fusion';
import { PaginationChangeHandler } from '@equinor/fusion-components';

export type DataItemPropertyAccessorFunction<T> = (item: T) => string;
export type DataItemPropertyAccessor<T> = keyof T | DataItemPropertyAccessorFunction<T>;
export type DataItemBooleanAccessorFunction<T> = (item: T) => boolean;
export type DataItemBooleanAccessor<T> = boolean | DataItemBooleanAccessorFunction<T>;
export type DataItemSkeletonComponentProps = { rowIndex: number };
export type DataItemComponentProps<T> = DataItemSkeletonComponentProps & {
    item: T;
    collapsedColumns?: DataTableColumn<T>[];
};
export type SortChangeHandler<T> = (column: DataTableColumn<T>) => void;
export type OnDataTableRowClickHandler<T> = (item: T, rowIndex: number) => void;
export type OnSelectionChange<T> = (selectedItems: T[]) => void;

export type DataTableColumn<T> = {
    key: string;
    label: string;
    accessor: DataItemPropertyAccessor<T>;
    component?: React.FC<DataItemComponentProps<T>>;
    width?: number | string;
    skeleton?: React.FC<DataItemSkeletonComponentProps>;
    style?: React.CSSProperties;
    sortable?: DataItemBooleanAccessor<T>;

    /** High value or falsy value will be collapsed first when there's no space for all columns */
    priority?: number;
};

export type DataTableSkeletonProps<T> = {
    columns: DataTableColumn<T>[];
    rowCount: number;
};

export type DataTableSortedBy<T> = {
    column: DataTableColumn<T> | null;
    direction: SortDirection | null;
};

export type DataTableProps<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
    rowIdentifier: DataItemPropertyAccessor<T>;
    isFetching: boolean;
    isSelectable?: boolean;
    onSelectionChange?: OnSelectionChange<T>;
    selectedItems?: T[];
    pagination?: Pagination;
    onPaginationChange?: PaginationChangeHandler;
    onSortChange?: SortChangeHandler<T>;
    sortedBy?: DataTableSortedBy<T>;
    isExpandable?: DataItemBooleanAccessor<T>;
    expandedComponent?: React.FC<DataItemComponentProps<T>>;
    onRowClick?: OnDataTableRowClickHandler<T>;
    onExpand?: (item: T) => void;
    listComponent?: React.FC<DataItemComponentProps<T>>;
    listSkeleton?: React.FC;
    noColumnsCollapse?: boolean;
    quickFactScope?: string;
};

export type DataTableTableProps<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
    rowIdentifier: DataItemPropertyAccessor<T>;
    showSkeleton: boolean;
    isSelectable?: boolean;
    onSelectionChange?: OnSelectionChange<T>;
    selectedItems?: T[];
    pagination?: Pagination;
    onPaginationChange?: PaginationChangeHandler;
    onSortChange?: SortChangeHandler<T>;
    sortedBy?: DataTableSortedBy<T>;
    isExpandable?: DataItemBooleanAccessor<T>;
    expandedComponent?: React.FC<DataItemComponentProps<T>>;
    onRowClick?: OnDataTableRowClickHandler<T>;
    onExpand?: (item: T) => void;
    noColumnsCollapse?: boolean;
    quickFactScope?: string;
};

export type DataTableListProps<T> = {
    data: T[];
    rowIdentifier: DataItemPropertyAccessor<T>;
    showSkeleton: boolean;
    skeleton?: React.FC<DataItemSkeletonComponentProps>;
    isSelectable?: boolean;
    onSelectionChange?: OnSelectionChange<T>;
    selectedItems?: T[];
    pagination?: Pagination;
    onPaginationChange?: PaginationChangeHandler;
    onSortChange?: SortChangeHandler<T>;
    sortedBy?: DataTableSortedBy<T>;
    listComponent: React.FC<DataItemComponentProps<T>>;
    listSkeleton?: React.FC;
};

export type DataTableHeaderProps<T> = {
    columns: DataTableColumn<T>[];
    onSortChange?: SortChangeHandler<T>;
    sortedBy?: DataTableSortedBy<T>;
    isSelectable?: boolean;
    onSelectAll: () => void;
    isAllSelected: boolean;
    isSomeSelected: boolean;
    quickFactScope?: string;
};

export type DataTableBodyProps<T> = {
    columns: DataTableColumn<T>[];
    rowIdentifier: DataItemPropertyAccessor<T>;
    data: T[];
    isExpandable?: DataItemBooleanAccessor<T>;
    expandedComponent?: React.FC<DataItemComponentProps<T>>;
    onExpand: (item: T, rowIndex: number) => void;
    expandedItems: T[];
    collapsedColumns: DataTableColumn<T>[];
    isSelectable?: boolean;
    onSelectionChange: OnSelectionChange<T>;
    selectedItems?: T[];
    onRowClick?: OnDataTableRowClickHandler<T>;
};

export type DataTableRowProps<T> = {
    columns: DataTableColumn<T>[];
    item: T;
    index: number;
    isExpandable: boolean;
    expandedComponent?: React.FC<DataItemComponentProps<T>>;
    isExpanded: boolean;
    onExpand: () => void;
    collapsedColumns: DataTableColumn<T>[];
    isSelectable?: boolean;
    isSelected: boolean;
    onSelectionChange: (item: T) => void;
    onClick?: OnDataTableRowClickHandler<T>;
};

export type DataTableCellProps<T> = {
    column: DataTableColumn<T>;
    item: T;
    rowIndex: number;
    isExpanded: boolean;
    isHovering: boolean;
    isSelected: boolean;
    onMouseOver: () => void;
    onMouseOut: () => void;
    onClick?: OnDataTableRowClickHandler<T>;
};

export type DataTablePaginationProps = {
    pagination: Pagination;
    onChange: PaginationChangeHandler;
    showSkeleton: boolean;
};

export type ExpandCellProps = {
    isExpandable: boolean;
    isExpanded: boolean;
    onClick: () => void;
    isHovering: boolean;
    isSelected: boolean;
    onMouseOver: () => void;
    onMouseOut: () => void;
    className: string;
};

export type ExpandedContentProps<T> = {
    item: T;
    rowIndex: number;
    isExpanded: boolean;
    expandedComponent?: React.FC<DataItemComponentProps<T>>;
    collapsedColumns: DataTableColumn<T>[];
};

export type SelectionCellProps = {
    isSelectable: boolean;
    isSelected: boolean;
    onChange: () => void;
    isHovering?: boolean;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    className: string;
    indeterminate?: boolean;
};
