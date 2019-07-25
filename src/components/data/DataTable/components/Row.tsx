import React, { useState } from 'react';
import { DataTableRowProps } from '../types';
import Cell from './Cell';
import ExpandCell from './ExpandCell';
import ExpandedContent from './ExpandedContent';
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
}: DataTableRowProps<T>) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <ExpandCell
                isExpandable={isExpandable}
                isExpanded={isExpanded}
                isHovering={isHovering}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                onClick={onExpand}
            />
            {columns.map(column => (
                <Cell
                    key={column.key}
                    column={column}
                    item={item}
                    rowIndex={index}
                    isExpanded={isExpanded}
                    isHovering={isHovering}
                    onMouseOver={() => setIsHovering(true)}
                    onMouseOut={() => setIsHovering(false)}
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
