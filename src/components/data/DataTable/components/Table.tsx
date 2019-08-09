import React, { useEffect, useState, useRef, useCallback } from 'react';
import { DataTableTableProps } from '../dataTableTypes';
import DataTableHeader from './Header';
import DataTableBody from './Body';
import DataTableSkeleton from './Skeleton';
import DataTablePagination from './Pagination';
import styles from '../styles.less';
import { generateColumnTemplate, generateRowTemplate, useVisibleColumns } from '../utils';
import { Page } from '@equinor/fusion';

// For now, this is the only way to create generic functional components with TS
function Table<T>({
    showSkeleton,
    columns,
    data,
    pagination,
    onPaginationChange,
    onSortChange,
    sortedBy,
    rowIdentifier,
    isExpandable,
    expandedComponent,
}: DataTableTableProps<T>) {
    const tableRef = useRef<HTMLDivElement>(null);
    const skeletonRows = pagination ? pagination.perPage : 10;

    const { visibleColumns, collapsedColumns } = useVisibleColumns(columns, tableRef, [data]);
    const columnTemplate = generateColumnTemplate(visibleColumns);
    const [expandedItems, setExpandedItems] = useState<T[]>([]);
    const rowTemplate = generateRowTemplate(data, expandedItems, skeletonRows);

    const handlePaginationChange = useCallback(
        (newPage: Page, perPage: number) => {
            if (onPaginationChange) {
                onPaginationChange(newPage, perPage);
            }

            if (tableRef.current) {
                tableRef.current.scrollTop = 0;
            }
        },
        [onPaginationChange, tableRef.current]
    );

    const handleOnExpand = useCallback(
        (item: T) => {
            const existing = expandedItems.find(i => i === item);

            if (existing) {
                setExpandedItems(expandedItems => expandedItems.filter(i => i !== existing));
            } else {
                setExpandedItems(expandedItems => [...expandedItems, item]);
            }
        },
        [expandedItems]
    );

    useEffect(() => {
        setExpandedItems([]);
    }, [data]);

    return (
        <>
            <div
                ref={tableRef}
                className={styles.table}
                style={{ gridTemplateColumns: columnTemplate, gridTemplateRows: rowTemplate }}
            >
                <DataTableHeader
                    columns={visibleColumns}
                    onSortChange={onSortChange}
                    sortedBy={sortedBy}
                />
                {showSkeleton ? (
                    <DataTableSkeleton columns={visibleColumns} rowCount={skeletonRows} />
                ) : (
                    <DataTableBody
                        columns={visibleColumns}
                        collapsedColumns={collapsedColumns}
                        data={data}
                        rowIdentifier={rowIdentifier}
                        isExpandable={visibleColumns.length !== columns.length || isExpandable}
                        expandedComponent={expandedComponent}
                        onExpand={handleOnExpand}
                        expandedItems={expandedItems}
                    />
                )}
            </div>
            {!!pagination && onPaginationChange && (
                <DataTablePagination
                    pagination={pagination}
                    onChange={handlePaginationChange}
                    showSkeleton={showSkeleton}
                />
            )}
        </>
    );
}

export default Table;
