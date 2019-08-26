import React, { useState, useCallback } from 'react';
import { DataTableRowProps } from '../dataTableTypes';
import Cell from './Cell';
import ExpandCell from './ExpandCell';
import ExpandedContent from './ExpandedContent';
import SelectionCell from './SelectionCell';
import classNames from 'classnames';
import styles from '../styles.less';

function DataTableRow<T>({
    item,
    columns,
    collapsedColumns,
    index,
    isExpandable,
    isExpanded,
    onExpand,
    expandedComponent,
    isSelectable,
    isSelected,
    onSelectionChange,
}: DataTableRowProps<T>) {
    const [isHovering, setIsHovering] = useState(false);

    const setIsHoveringTrue = useCallback(() => setIsHovering(true), []);
    const setIsHoveringFalse = useCallback(() => setIsHovering(false), []);

    const onSelect = useCallback(() => {
        onSelectionChange(item);
    }, [item, onSelectionChange]);

    return (
        <>
            <ExpandCell
                isExpandable={isExpandable}
                isExpanded={isExpanded}
                isHovering={isHovering}
                isSelected={isSelected}
                onMouseOver={setIsHoveringTrue}
                onMouseOut={setIsHoveringFalse}
                onClick={onExpand}
                className={classNames(styles.cell)}
            />
            <SelectionCell
                isSelectable={!!isSelectable}
                isSelected={isSelected}
                onChange={onSelect}
                isHovering={isHovering}
                onMouseOver={setIsHoveringTrue}
                onMouseOut={setIsHoveringFalse}
                className={classNames(styles.cell)}
            />
            {columns.map(column => (
                <Cell
                    key={column.key}
                    column={column}
                    item={item}
                    rowIndex={index}
                    isExpanded={isExpanded}
                    isHovering={isHovering}
                    isSelected={isSelected}
                    onMouseOver={setIsHoveringTrue}
                    onMouseOut={setIsHoveringFalse}
                />
            ))}
            <ExpandedContent
                item={item}
                rowIndex={index}
                isExpanded={isExpanded}
                expandedComponent={expandedComponent}
                collapsedColumns={collapsedColumns}
            />
        </>
    );
}

export default DataTableRow;
