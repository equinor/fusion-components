import React from 'react';
import { ExpandedContentProps } from '../types';
import styles from '../styles.less';
import { getCellContent } from '../utils';

function DataTableExpandedContent<T>({
    isExpanded,
    expandedComponent,
    item,
    rowIndex,
    collapsedColumns,
}: ExpandedContentProps<T>) {
    if (!isExpanded) {
        return null;
    }

    const renderExpandedContent = () => {
        const ExpandedComponent = expandedComponent;
        if (ExpandedComponent) {
            return <ExpandedComponent item={item} rowIndex={rowIndex} />;
        }

        return (
            <table>
                <tbody>
                    {collapsedColumns.map(column => (
                        <tr key={column.key}>
                            <td><strong>{column.label}</strong></td>
                            <td>{getCellContent(item, column, rowIndex)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return <div className={styles.expandedContent}>{renderExpandedContent()}</div>;
}

export default DataTableExpandedContent;
