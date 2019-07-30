import React, { useState, useEffect } from 'react';
import {
    DataItemPropertyAccessor,
    DataItemPropertyAccessorFunction,
    DataTableColumn,
    DataItemBooleanAccessor,
    DataItemBooleanAccessorFunction,
} from './dataTableTypes';
import { useEventListener } from '@equinor/fusion-components';

export const getString = <T>(item: T, accessor: DataItemPropertyAccessor<T>): string => {
    if (typeof accessor === 'string') {
        return (item[accessor] as any).toString();
    }

    const accessorFunction = accessor as DataItemPropertyAccessorFunction<T>;

    return accessorFunction(item);
};

export const getBoolean = <T>(item: T, accessor: DataItemBooleanAccessor<T>): boolean => {
    if (typeof accessor === 'boolean') {
        return accessor;
    }

    const accessorFunction = accessor as DataItemBooleanAccessorFunction<T>;

    return accessorFunction(item);
};

export const getCellContent = <T>(
    item: T,
    column: DataTableColumn<T>,
    rowIndex: number
): React.ReactElement | string => {
    const CustomComponent = column.component;
    if (CustomComponent) {
        return React.createElement(CustomComponent, { item, rowIndex });
    }

    return getString(item, column.accessor);
};

const toCssUnit = (value: number | string) => {
    if (typeof value === 'number') {
        return value + 'px';
    }

    return value;
};

export const generateColumnTemplate = <T>(columns: DataTableColumn<T>[]) =>
    'max-content ' +
    columns.map(c => toCssUnit(`minmax(max-content, ${c.width || 'auto'})`)).join(' ');

const rowTemplate = 'calc(var(--grid-unit) * var(--row-height-multiplier))';
export const generateRowTemplate = <T>(rows: T[], expandedRows: T[], skeletonRows: number) => {
    if (!rows.length) {
        // Skeleton rows + header
        return `repeat(${skeletonRows + 1}, ${rowTemplate})`;
    }

    return (
        rowTemplate +
        ' ' +
        rows
            .map(row => {
                const isExpanded = expandedRows.findIndex(r => r === row) > -1;

                if (!isExpanded) {
                    return rowTemplate;
                }

                return `${rowTemplate} auto`;
            })
            .join(' ')
    );
};

const hasNarrowerParent = (node: HTMLElement, width?: number): boolean => {
    width = width || node.offsetWidth;
    const parent = node.parentElement;

    if (!parent) {
        return false;
    }

    if (parent.offsetWidth < width) {
        return true;
    }

    return hasNarrowerParent(parent, width);
};

/**
 * Calculates which columns can fit (and be visible) in a table.
 * It works by reacting to the resize event on the window
 * and checking if the current table is to wide for its parent.
 * @param columns All columns
 * @param ref A ref to the table wrapper
 */
export const useVisibleColumns = <T>(
    columns: DataTableColumn<T>[],
    ref: React.RefObject<HTMLDivElement>,
    deps: any[]
) => {
    const [collapsedColumns, setCollapsedColumns] = useState<DataTableColumn<T>[]>([]);
    const [testCollapsedColumns, setTestCollapsedColumns] = useState<DataTableColumn<T>[]>([]);
    const [shouldRecalculateColumns, setShouldRecalculateColumns] = useState(false);
    const [shouldTestColumns, setShouldTestColumns] = useState(false);
    const [resize, setResize] = useState({ from: 0, to: 0 });

    useEffect(() => {
        // We don't need to recalculate columns
        if (!shouldRecalculateColumns) {
            return;
        }

        // Remove already collapsed columns
        // Sort the columns by priority
        const sortedColumns = columns
            .filter(c => !collapsedColumns.find(cc => cc.key === c.key))
            .sort((a, b) => {
                if (!a.priority) {
                    return -1;
                } else if (!b.priority) {
                    return 1;
                }

                return b.priority - a.priority;
            });

        // Add the first of the sorted columns (worst priority) to the collapsed columns
        setCollapsedColumns([...collapsedColumns, sortedColumns[0]]);
    }, [shouldRecalculateColumns]);

    useEffect(() => {
        // We just collapsed a column, no need to continue collapsing until the checkParentWidth functions says so
        setShouldRecalculateColumns(false);
    }, [collapsedColumns]);

    const checkParentWidth = () => {
        if (!ref.current || shouldRecalculateColumns) {
            return;
        }

        // Check if the parent is narrower than the table
        const isNarrower = hasNarrowerParent(ref.current);

        const columnsLeft = columns.length - collapsedColumns.length;

        if (
            isNarrower &&
            (resize.from > resize.to || resize.from === resize.to) &&
            columnsLeft > 2
        ) {
            // The table is wider that the parent, and the user is making the window smaller
            // so we need to recalculate columns
            setShouldRecalculateColumns(true);
        } else if (!isNarrower && collapsedColumns.length && resize.from < resize.to) {
            // The table is not wider than the parend, the user is making the window bigger
            // and we have collapsed a couple of columns
            // so we test if we can expand one column without while keeping the table narrower than the parent
            const newCollapsedColumns =
                collapsedColumns.length > 1 ? collapsedColumns.slice(0, -1) : [];
            setTestCollapsedColumns(newCollapsedColumns);
            setShouldTestColumns(true);
        }
    };

    useEffect(() => {
        if (!ref.current || !shouldTestColumns) {
            return;
        }

        // Lets test if it worked with one less expanded column
        const isNarrower = hasNarrowerParent(ref.current);

        if (isNarrower) {
            // Nope!
            setTestCollapsedColumns([]);
        } else {
            // Yes! Apply the test to the actual collapsed columns
            setCollapsedColumns(testCollapsedColumns);
            setTestCollapsedColumns([]);
        }

        // We're done testing for now
        setShouldTestColumns(false);
    }, [testCollapsedColumns, shouldTestColumns, ref.current]);

    useEffect(checkParentWidth, [
        columns,
        ref.current,
        shouldRecalculateColumns,
        collapsedColumns,
        resize,
        ...deps,
    ]);

    const onResize = () => {
        if (!ref.current) {
            return;
        }

        const from = resize.to;
        const to = window.innerWidth;
        setResize({ from, to });
    };

    useEventListener(window, 'resize', onResize, [resize]);

    // Remove the collapsed columns, or the columns we're testing from all the columns before returning
    const visibleColumns = columns.filter(
        c =>
            !(testCollapsedColumns.length ? testCollapsedColumns : collapsedColumns).find(
                cc => cc.key === c.key
            )
    );

    return {
        visibleColumns,
        collapsedColumns,
    };
};
