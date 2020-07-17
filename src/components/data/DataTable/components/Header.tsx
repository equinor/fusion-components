import React from 'react';
import { DataTableHeaderProps, DataTableColumn, DataTableSortedBy } from '../dataTableTypes';
import styles from '../styles.less';
import classnames from 'classnames';
import { SortDirection } from '@equinor/fusion';
import { SortIcon, useTooltipRef } from '@equinor/fusion-components';
import SelectionCell from './SelectionCell';
import '../../../../customElements/applicationGuidance/Anchor';

function getCellClassNames<T>(base: string, column: DataTableColumn<T>, isInAnchor: boolean) {
    return classnames(base, {
        [styles.isSortable]: column.sortable,
        [styles.isInAnchor]: isInAnchor,
    });
}

type SortIndicatorProps = {
    isSortedBy: boolean;
    direction: SortDirection | null;
};
const SortIndicator: React.FC<SortIndicatorProps> = ({ isSortedBy, direction }) => {
    return (
        <span className={styles.sortIndicator}>
            <SortIcon direction={isSortedBy ? direction : null} />
        </span>
    );
};

type HeaderCellProps<T> = {
    column: DataTableColumn<T>;
    handleOnClick: (column: DataTableColumn<T>) => void;
    cellClassName: string;
    isSortedBy: (column: DataTableColumn<T>) => boolean;
    sortedBy?: DataTableSortedBy<T>;
    isInAnchor: boolean;
};

function DataTableHeaderCell<T>({
    column,
    handleOnClick,
    cellClassName,
    isSortedBy,
    sortedBy,
    isInAnchor,
}: HeaderCellProps<T>) {
    return (
        <div
            onClick={() => handleOnClick(column)}
            className={getCellClassNames(cellClassName, column, isInAnchor)}
        >
            <span className={styles.label}>{column.label}</span>
            {column.sortable && sortedBy && (
                <SortIndicator isSortedBy={isSortedBy(column)} direction={sortedBy.direction} />
            )}
        </div>
    );
}

function DataTableHeader<T>({
    columns,
    onSortChange,
    sortedBy,
    isSelectable,
    isAllSelected,
    isSomeSelected,
    onSelectAll,
    quickFactScope,
}: DataTableHeaderProps<T>) {
    const cellClassName = classnames(styles.cell, styles.header);

    const handleOnClick = (column: DataTableColumn<T>) => {
        if (!column.sortable || !onSortChange) {
            return;
        }

        onSortChange(column);
    };

    const isSortedBy = (column: DataTableColumn<T>): boolean => {
        return !!sortedBy && column === sortedBy.column;
    };

    const selectableTooltipRef = useTooltipRef(
        isAllSelected ? 'Unselect all' : 'Select all',
        'above'
    );

    return (
        <>
            <div className={classnames(cellClassName, styles.expand)} />
            <SelectionCell
                isSelectable={!!isSelectable}
                isSelected={isAllSelected}
                onChange={onSelectAll}
                className={classnames(cellClassName)}
                indeterminate={isSomeSelected}
                ref={selectableTooltipRef}
            />
            {columns.map((column) => {
                const cell = (
                    <DataTableHeaderCell
                        key={column.key}
                        column={column}
                        handleOnClick={handleOnClick}
                        cellClassName={cellClassName}
                        isSortedBy={isSortedBy}
                        sortedBy={sortedBy}
                        isInAnchor={!!quickFactScope}
                    />
                );

                if (quickFactScope) {
                    return (
                        <app-guide-anchor
                            key={column.key}
                            scope={quickFactScope}
                            id={column.key}
                            snug-fit
                        >
                            {cell}
                        </app-guide-anchor>
                    );
                }

                return cell;
            })}
        </>
    );
}

export default DataTableHeader;
