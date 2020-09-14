import React, { useRef, useCallback } from 'react';
import { DataTableListProps } from '../dataTableTypes';
import styles from '../styles.less';
import { getString } from '../utils';
import { Page } from '@equinor/fusion';
import IconButton from 'components/general/IconButton';
import PaginationArrow from 'components/icons/components/navigation/PaginationArrow';
import SkeletonBar from 'components/feedback/Skeleton/Bar';

// For now, this is the only way to create generic functional components with TS
function List<T>({
    showSkeleton,
    data,
    listComponent,
    listSkeleton,
    pagination,
    onPaginationChange,
    onSortChange,
    sortedBy,
    rowIdentifier,
}: DataTableListProps<T>) {
    const listRef = useRef<HTMLUListElement | null>(null);

    const handlePaginationChange = useCallback((nextPage: Page, perPage: number) => {
        if(onPaginationChange) {
            onPaginationChange(nextPage, perPage);
        }

        if(listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [onPaginationChange, listRef.current]);

    const renderPagination = () => {
        if (!pagination || !onPaginationChange) {
            return null;
        }

        return (
            <div className={styles.listPagination}>
                <IconButton
                    disabled={!pagination.prevPage}
                    onClick={() =>
                        pagination.prevPage &&
                        handlePaginationChange(pagination.prevPage, pagination.perPage)
                    }
                >
                    <PaginationArrow prev />
                </IconButton>
                {pagination.currentPage.value} of {pagination.pageCount}
                <IconButton
                    disabled={!pagination.nextPage}
                    onClick={() =>
                        pagination.nextPage &&
                        handlePaginationChange(pagination.nextPage, pagination.perPage)
                    }
                >
                    <PaginationArrow next />
                </IconButton>
            </div>
        );
    };

    if (showSkeleton) {
        const rows: number[] = [];
        const skeletonRows = pagination ? pagination.perPage : 10;

        for (let i = 0; i < skeletonRows; i++) {
            rows.push(i);
        }

        return (
            <>
                <ul className={styles.list}>
                    {rows.map(i => {
                        const SkeletonComponent = listSkeleton || SkeletonBar;
                        return (
                            <li key={i.toString()}>
                                <SkeletonComponent />
                            </li>
                        );
                    })}
                </ul>
                {renderPagination()}
            </>
        );
    }

    return (
        <>
            <ul ref={listRef} className={styles.list}>
                {data.map((item, index) => {
                    const Component = listComponent;
                    return (
                        <li key={getString(item, rowIdentifier)}>
                            <Component item={item} rowIndex={index} />
                        </li>
                    );
                })}
            </ul>
            {renderPagination()}
        </>
    );
}

export default List;
