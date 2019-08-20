import React from 'react';
import { DataTableCellProps } from '../dataTableTypes';
import { getCellContent } from '../utils';
import classNames from 'classnames';
import styles from '../styles.less';

function DataTableCell<T>({
    item,
    column,
    rowIndex,
    isExpanded,
    isHovering,
    onMouseOut,
    onMouseOver,
    isSelected,
}: DataTableCellProps<T>) {
    return (
        <div
            className={classNames(styles.cell, {
                [styles.isExpanded]: isExpanded,
                [styles.isHovering]: isHovering,
                [styles.isSelected]: isSelected,
            })}
            onMouseLeave={onMouseOut}
            onMouseEnter={onMouseOver}
            style={column.style}
        >
            {getCellContent(item, column, rowIndex)}
        </div>
    );
}

export default DataTableCell;
