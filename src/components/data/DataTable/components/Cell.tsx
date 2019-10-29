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
    onClick,
}: DataTableCellProps<T>) {
    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(item, rowIndex);
        }
    }, [onClick, item, rowIndex]);
    
    return (
        <div
            className={classNames(styles.cell, {
                [styles.isExpanded]: isExpanded,
                [styles.isHovering]: isHovering,
                [styles.isSelected]: isSelected,
                [styles.isClickable]: onClick !== undefined,
            })}
            onMouseLeave={onMouseOut}
            onMouseEnter={onMouseOver}
            style={column.style}
            onClick={handleClick}
        >
            {getCellContent(item, column, rowIndex)}
        </div>
    );
}

export default DataTableCell;
