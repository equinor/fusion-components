import { Fragment } from 'react';
import { DataTableSkeletonProps, DataTableColumn } from '../dataTableTypes';
import styles from '../styles.less';
import { SkeletonBar } from '@equinor/fusion-components';

function DataTableSkeleton<T>({ columns, rowCount }: DataTableSkeletonProps<T>) {
    const rows: number[] = [];
    for (let i = 0; i < rowCount; i++) {
        rows.push(i);
    }

    const renderSkeleton = (column: DataTableColumn<T>, rowIndex: number) => {
        const CustomSkeletonComponent = column.skeleton;

        if (CustomSkeletonComponent) {
            return <CustomSkeletonComponent rowIndex={rowIndex} />;
        }

        return <SkeletonBar />;
    };

    return (
        <>
            {rows.map((row, rowIndex) => (
                <Fragment key={rowIndex.toString()}>
                    <div />
                    <div />
                    {columns.map((column) => (
                        <div key={column.key} className={styles.cell}>
                            {renderSkeleton(column, rowIndex)}
                        </div>
                    ))}
                </Fragment>
            ))}
        </>
    );
}

export default DataTableSkeleton;
