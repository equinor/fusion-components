import React from 'react';
import { DataTableBodyProps } from '../types';
import Row from './Row';
import { getString, getBoolean } from '../utils';

function DataTableBody<T>({
    data,
    columns,
    collapsedColumns,
    rowIdentifier,
    isExpandable,
    expandedComponent,
    onExpand,
    expandedItems,
}: DataTableBodyProps<T>) {
    return (
        <>
            {data.map((item, index) => (
                <Row
                    key={getString(item, rowIdentifier)}
                    item={item}
                    columns={columns}
                    collapsedColumns={collapsedColumns}
                    index={index}
                    isExpandable={isExpandable ? getBoolean(item, isExpandable) : false}
                    isExpanded={expandedItems.findIndex(i => i === item) > -1}
                    expandedComponent={expandedComponent}
                    onExpand={() => onExpand(item, index)}
                />
            ))}
        </>
    );
}

export default DataTableBody;
