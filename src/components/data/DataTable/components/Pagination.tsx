import React from 'react';
import { DataTablePaginationProps } from '../dataTableTypes';
import styles from '../styles.less';
import { Pagination, PaginationSkeleton } from '@equinor/fusion-components';

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
    pagination,
    onChange,
    showSkeleton,
}) => {
    return (
        <div className={styles.pagination}>
            {showSkeleton && !pagination.pageCount ? (
                <PaginationSkeleton pagination={pagination} />
            ) : (
                <Pagination pagination={pagination} onChange={onChange} />
            )}
        </div>
    );
};

export default DataTablePagination;
