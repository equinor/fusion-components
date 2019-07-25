import React from 'react';
import { DataTableSkeletonProps, DataTableColumn } from '../types';
import styles from '../styles.less';
import { SkeletonBar } from 'index';

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
                <React.Fragment key={rowIndex.toString()}>
                    <div />
                    {columns.map(column => (
                        <div key={column.key} className={styles.cell}>
                            {renderSkeleton(column, rowIndex)}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}

export default DataTableSkeleton;
