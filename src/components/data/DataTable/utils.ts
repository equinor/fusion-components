import React, { useState, useEffect } from 'react';
import {
    DataItemPropertyAccessor,
    DataItemPropertyAccessorFunction,
    DataTableColumn,
    DataItemBooleanAccessor,
    DataItemBooleanAccessorFunction,
} from './dataTableTypes';

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
    'max-content max-content ' +
    columns.map((c) => toCssUnit(`minmax(max-content, ${c.width || 'auto'})`)).join(' ');

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
            .map((row) => {
                const isExpanded = expandedRows.findIndex((r) => r === row) > -1;

                if (!isExpanded) {
                    return `minmax(${rowTemplate},min-content)`;
                }

                return `${rowTemplate} min-content`;
            })
            .join(' ')
    );
};

const nodeIsTooWide = (node: HTMLElement): boolean => {
    return node.scrollWidth > node.offsetWidth;
};

const getNextColumnToCollapse = <T>(
    columns: DataTableColumn<T>[],
    collapsedColumns: DataTableColumn<T>[]
) => {
    // Remove already collapsed columns
    // Sort the columns by priority
    const sortedColumns = columns
        .filter((c) => !collapsedColumns.find((cc) => cc.key === c.key))
        .sort((a, b) => {
            if (!a.priority) {
                return -1;
            } else if (!b.priority) {
                return 1;
            }

            return b.priority - a.priority;
        });

    return sortedColumns[0];
};

/**
 * Calculates which columns can fit (and be visible) in a table.
 * It works by continuously checking if the current table is to wide for its parent.
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
    const [shouldTestColumns, setShouldTestColumns] = useState(false);
    const [resize, setResize] = useState({ from: 0, to: 0 });

    const checkParentWidth = () => {
        if (!ref.current) {
            return;
        }

        // Check if the table is too wide
        const isTooWide = nodeIsTooWide(ref.current);

        const columnsLeft = columns.length - collapsedColumns.length;
        if (
            isTooWide &&
            (resize.from > resize.to || resize.from === resize.to) &&
            columnsLeft > 2
        ) {
            // The table is wider that the parent, and the user is making the window smaller
            // so we need to recalculate columns
            const columnToCollapse = getNextColumnToCollapse(columns, collapsedColumns);
            setCollapsedColumns([...collapsedColumns, columnToCollapse]);
        } else if (!isTooWide && collapsedColumns.length && resize.from < resize.to) {
            // The table is not wider than the parent, the user is making the window bigger
            // and we have collapsed a couple of columns
            // so we test if we can expand one column without while keeping the table narrower than the parent
            const newCollapsedColumns =
                collapsedColumns.length > 1 ? collapsedColumns.slice(0, -1) : [];
            setTestCollapsedColumns(newCollapsedColumns);
            setShouldTestColumns(true);
        }
    };

    useEffect(checkParentWidth, [columns, ref.current, collapsedColumns, resize, ...deps]);

    useEffect(() => {
        if (!ref.current || !shouldTestColumns) {
            return;
        }

        // Lets test if it worked with one less expanded column
        const isTooWide = nodeIsTooWide(ref.current);

        if (isTooWide) {
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

    // We can't rely on the window resize event since expanding/collapsing/resizing other elements on the page
    // might affect the size of the table/it's parent. Therefore we use requestAnimationFrame to check periodically
    let animationFrame: number = 0;
    const checkResize = () => {
        window.cancelAnimationFrame(animationFrame);

        if (!ref.current) {
            animationFrame = window.requestAnimationFrame(checkResize);
            return;
        }

        const width = ref.current.offsetWidth;
        const didResize = width !== resize.to;

        if (didResize) {
            setResize({ from: resize.to || width, to: width });
        } else {
            animationFrame = window.requestAnimationFrame(checkResize);
        }

        return () => window.cancelAnimationFrame(animationFrame);
    };

    useEffect(checkResize, [resize, columns, ref.current, ...deps]);

    // Remove the collapsed columns, or the columns we're testing from all the columns before returning
    const visibleColumns = columns.filter(
        (c) =>
            !(testCollapsedColumns.length ? testCollapsedColumns : collapsedColumns).find(
                (cc) => cc.key === c.key
            )
    );

    return {
        visibleColumns,
        collapsedColumns,
    };
};
