import { DataTablePaginationProps } from '../dataTableTypes';
import styles from '../styles.less';
import { Pagination, PaginationSkeleton } from '@equinor/fusion-components';
import { FC } from 'react';

const DataTablePagination: FC<DataTablePaginationProps> = ({
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
