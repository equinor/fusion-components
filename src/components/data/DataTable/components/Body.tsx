import { useCallback } from 'react';
import { DataTableBodyProps } from '../dataTableTypes';
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
    isSelectable,
    onSelectionChange,
    selectedItems,
    onRowClick,
}: DataTableBodyProps<T>) {
    const toggleSelection = useCallback(
        (item: T) => {
            if (selectedItems && selectedItems.some((i) => i === item)) {
                onSelectionChange(selectedItems.filter((i) => i !== item));
            } else {
                onSelectionChange([...(selectedItems || []), item]);
            }
        },
        [selectedItems]
    );

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
                    isExpanded={expandedItems.findIndex((i) => i === item) > -1}
                    expandedComponent={expandedComponent}
                    onExpand={() => onExpand(item, index)}
                    isSelectable={isSelectable}
                    onSelectionChange={toggleSelection}
                    isSelected={!!selectedItems && selectedItems.some((i) => i === item)}
                    onClick={onRowClick}
                />
            ))}
        </>
    );
}

export default DataTableBody;
