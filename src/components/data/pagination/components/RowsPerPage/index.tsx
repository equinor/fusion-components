import React, { Fragment } from 'react';

const perPageOptions = [5, 10, 20, 50, 100];

type RowsPerPageProps = {
    perPage: number;
    currentPageIndex: number;
    totalCount: number;
    onSelect: (value: number) => void;
};

const RowsPerPage = ({ perPage, currentPageIndex, totalCount, onSelect }: RowsPerPageProps) => (
    <Fragment>
        Items per page
        <select onChange={e => onSelect(parseInt(e.target.value, 10))} value={perPage.toString()}>
            {perPageOptions.map(option => (
                <option key={option.toString()}>{option}</option>
            ))}
        </select>
        <span>
            {currentPageIndex * perPage + 1} -{' '}
            {Math.min(currentPageIndex * perPage + perPage, totalCount)} of {totalCount}
        </span>
    </Fragment>
);

export default RowsPerPage;
