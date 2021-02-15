import { DataTableProps } from './dataTableTypes';
import Table from './components/Table';
import List from './components/List';
import styles from './styles.less';
import classnames from 'classnames';
import { useComponentDisplayClassNames } from '@equinor/fusion';
import { useHorizontalBreakpoint } from '@equinor/fusion-components';

enum Breakpoints {
    medium = 'medium',
    small = 'small',
}

const breakpoints = [
    {
        key: Breakpoints.medium,
        width: 500,
    },
    {
        key: Breakpoints.small,
        width: 0,
    },
];

// For now, this is the only way to create generic functional components with TS
function DataTable<T>({
    isFetching,
    columns,
    data,
    isSelectable,
    onSelectionChange,
    selectedItems,
    pagination,
    onPaginationChange,
    onSortChange,
    sortedBy,
    rowIdentifier,
    isExpandable,
    expandedComponent,
    listComponent,
    listSkeleton,
    onRowClick,
    noColumnsCollapse,
    quickFactScope,
}: DataTableProps<T>) {
    const showSkeleton = isFetching && !data.length;

    const containerClassNames = classnames(styles.container, useComponentDisplayClassNames(styles));

    const [breakpointRef, breakpointKey] = useHorizontalBreakpoint(breakpoints);

    // Perform initial render with empty div to prevent flashing table header etc. on smaller devices
    if (!breakpointKey) {
        return <div className={containerClassNames} ref={breakpointRef} />;
    }

    return (
        <div className={containerClassNames} ref={breakpointRef}>
            {breakpointKey === 'small' && listComponent ? (
                <List
                    showSkeleton={showSkeleton}
                    data={data}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                    onSortChange={onSortChange}
                    sortedBy={sortedBy}
                    rowIdentifier={rowIdentifier}
                    listComponent={listComponent}
                    listSkeleton={listSkeleton}
                    isSelectable={isSelectable}
                    onSelectionChange={onSelectionChange}
                    selectedItems={selectedItems}
                />
            ) : (
                <Table
                    showSkeleton={showSkeleton}
                    columns={columns}
                    data={data}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                    onSortChange={onSortChange}
                    sortedBy={sortedBy}
                    rowIdentifier={rowIdentifier}
                    isExpandable={isExpandable}
                    expandedComponent={expandedComponent}
                    isSelectable={isSelectable}
                    onSelectionChange={onSelectionChange}
                    selectedItems={selectedItems}
                    onRowClick={onRowClick}
                    noColumnsCollapse={noColumnsCollapse}
                    quickFactScope={quickFactScope}
                />
            )}
        </div>
    );
}

export { DataTableColumn } from './dataTableTypes';

export default DataTable;
