import { ExpandedContentProps } from '../dataTableTypes';
import styles from '../styles.less';
import { getCellContent } from '../utils';

function DataTableExpandedContent<T>({
    isExpanded,
    expandedComponent,
    item,
    rowIndex,
    collapsedColumns,
    id,
}: ExpandedContentProps<T>) {
    if (!isExpanded) {
        return null;
    }

    const renderExpandedContent = () => {
        const ExpandedComponent = expandedComponent;
        if (ExpandedComponent) {
            return (
                <ExpandedComponent
                    item={item}
                    rowIndex={rowIndex}
                    collapsedColumns={collapsedColumns}
                />
            );
        }

        return (
            <table>
                <tbody>
                    {collapsedColumns.map((column) => (
                        <tr key={column.key}>
                            <td className={styles.expandedLabel}>
                                <strong>{column.label}</strong>
                            </td>
                            <td>{getCellContent(item, column, rowIndex)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return <div id={id} className={styles.expandedContent}>{renderExpandedContent()}</div>;
}

export default DataTableExpandedContent;
