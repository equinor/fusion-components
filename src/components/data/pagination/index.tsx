import React, { useContext, Fragment, ReactNode } from 'react';
import classnames from 'classnames';

import ComponentDisplayContext, {
    componentDisplayTypeClassNames,
} from '../../contexts/ComponentDisplayContext';
import PrevPageButton from './components/PrevPageButton';
import NextPageButton from './components/NextPageButton';
import PageButton from './components/PageButton';
import Truncation from './components/Truncation';
import RowsPerPage from './components/RowsPerPage';

import styles from './styles/index.less';

type OnChangeProps = {
    newPerPage: number;
    currentPageIndex: number;
};

type PaginationProps = {
    perPage?: number;
    totalCount: number;
    currentPageIndex: number;
    onChange: (onChangeProps: OnChangeProps) => void;
};

const Pagination = ({ perPage, totalCount, currentPageIndex, onChange }: PaginationProps) => {
    const displayType = useContext<string>(ComponentDisplayContext);

    if (!totalCount || !perPage) {
        return null;
    }

    const className = classnames(
        styles.container,
        componentDisplayTypeClassNames(displayType, styles)
    );

    const getPageCount = () => {
        return Math.ceil(totalCount / perPage);
    };

    const setPerPage = (newPerPage: number) => {
        onChange({ newPerPage, currentPageIndex });
    };

    const gotoPrevPage = () => {
        if (currentPageIndex === 0) {
            return;
        }

        onChange({ currentPageIndex: currentPageIndex - 1, newPerPage: perPage });
    };

    const gotoNextPage = () => {
        const pageCount = getPageCount();
        if (currentPageIndex === pageCount - 1) {
            return;
        }

        onChange({ currentPageIndex: currentPageIndex + 1, newPerPage: perPage });
    };

    const gotoPage = (newPageIndex: number) => {
        onChange({ newPerPage: perPage, currentPageIndex: newPageIndex });
    };

    const renderPaginationButtons = (pages: number[]) => {
        return pages.map(pageIndex => (
            <PageButton
                key={pageIndex.toString()}
                pageIndex={pageIndex}
                currentPageIndex={currentPageIndex}
                onClick={() => gotoPage(pageIndex)}
            />
        ));
    };

    const renderTruncatedPagination = () => {
        const pageCount = getPageCount();
        const pages = new Array(pageCount).fill(1).map((x, i) => i);
        const lastPageIndex = pageCount - 1;
        const firstPage = pages.slice(0, 1);
        const lastPage = pages.slice(-1);

        if (currentPageIndex < 3) {
            return (
                <Fragment>
                    {renderPaginationButtons(pages.slice(0, 3))}
                    <Truncation />
                    {renderPaginationButtons(lastPage)}
                </Fragment>
            );
        }

        if (currentPageIndex > 2 && currentPageIndex < lastPageIndex - 2) {
            return (
                <Fragment>
                    {renderPaginationButtons(firstPage)}
                    <Truncation />
                    {renderPaginationButtons(
                        pages.slice(currentPageIndex - 1, currentPageIndex + 2)
                    )}
                    <Truncation />
                    {renderPaginationButtons(lastPage)}
                </Fragment>
            );
        }

        if (currentPageIndex > lastPageIndex - 3) {
            return (
                <Fragment>
                    {renderPaginationButtons(firstPage)}
                    <Truncation />
                    {renderPaginationButtons(pages.slice(lastPageIndex - 2, lastPageIndex + 1))}
                </Fragment>
            );
        }
    };

    const renderPaginationPages = () => {
        const pageCount = getPageCount();
        const pages = new Array(pageCount).fill(1).map((x, i) => i);

        if (pageCount > 0 && pageCount < 6) {
            return renderPaginationButtons(pages);
        }

        return renderTruncatedPagination();
    };

    return (
        <div className={className}>
            <div className={styles.rowsPerPage}>
                <RowsPerPage
                    perPage={perPage}
                    currentPageIndex={currentPageIndex}
                    totalCount={totalCount}
                    onSelect={(onSelectPerPage: number) => setPerPage(onSelectPerPage)}
                />
            </div>
            <PrevPageButton onClick={() => gotoPrevPage()} disabled={currentPageIndex === 0} />
            {renderPaginationPages()}
            <NextPageButton
                onClick={() => gotoNextPage()}
                disabled={currentPageIndex === getPageCount() - 1}
            />
        </div>
    );
};

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {
    perPage: 20,
};

export default Pagination;
