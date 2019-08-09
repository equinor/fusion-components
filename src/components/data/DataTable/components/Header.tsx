import React from 'react';
import { DataTableHeaderProps, DataTableColumn } from '../dataTableTypes';
import styles from '../styles.less';
import classnames from 'classnames';
import { SortDirection } from '@equinor/fusion';
import { SortIcon } from '@equinor/fusion-components';

function getCellClassNames<T>(base: string, column: DataTableColumn<T>) {
    return classnames(base, {
        [styles.isSortable]: column.sortable,
    });
}

type SortIndicatorProps = {
    isSortedBy: boolean;
    direction: SortDirection | null;
}
const SortIndicator: React.FC<SortIndicatorProps> = ({ isSortedBy, direction }) => {
    return <span className={styles.sortIndicator}><SortIcon direction={isSortedBy ? direction : null} /></span>;
};

function DataTableHeader<T>({ columns, onSortChange, sortedBy }: DataTableHeaderProps<T>) {
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

    return (
        <>
            <div className={classnames(cellClassName, styles.expand)}></div>
            {columns.map(column => (
                <div
                    key={column.key}
                    onClick={() => handleOnClick(column)}
                    className={getCellClassNames(cellClassName, column)}
                >
                    <span className={styles.label}>{column.label}</span>
                    {column.sortable && sortedBy && (
                        <SortIndicator
                            isSortedBy={isSortedBy(column)}
                            direction={sortedBy.direction}
                        />
                    )}
                </div>
            ))}
        </>
    );
}

export default DataTableHeader;
