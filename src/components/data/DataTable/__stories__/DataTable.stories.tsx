import React, { useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import DataTable from '../index';
import data, { fakeFetchAsync, DataItem } from './storyData';
import columns, { DataItemProps } from './columns';
import {
    Page,
    usePagination,
    useAsyncPagination,
    useAppSettings,
    useSorting,
    Pagination,
} from '@equinor/fusion';
import { DataTableColumn } from '@equinor/fusion-components';;

const emptyArray = [];
const WithSkeleton: React.FC = () => {
    const [appSettings, setAppSetting] = useAppSettings();
    const perPage = parseInt(appSettings['perPage'], 10) || 20;

    const { setSortBy, sortBy, direction } = useSorting<DataItem>(emptyArray, null, null);
    const { isFetching, pagination, pagedData, setCurrentPage } = useAsyncPagination(
        async (pagination: Pagination) => await fakeFetchAsync(pagination, sortBy, direction),
        perPage,
        0,
        3,
        [sortBy, direction]
    );

    const onPaginationChange = useCallback((newPage: Page, perPage: number) => {
        setCurrentPage(newPage.index, perPage);
        setAppSetting('perPage', perPage);
    }, []);

    const onSortChange = useCallback(
        (column: DataTableColumn<DataItem>) => {
            setSortBy(column.accessor, null);
        },
        [sortBy, direction]
    );

    const sortedByColumn = columns.find(c => c.accessor === sortBy) || null;

    return (
        <DataTable
            columns={columns}
            data={pagedData}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            isFetching={isFetching}
            rowIdentifier={'id'}
            onSortChange={onSortChange}
            sortedBy={{
                column: sortedByColumn,
                direction,
            }}
            listComponent={ExpandedItem}
        />
    );
};

const ExpandedItem: React.FC<DataItemProps> = ({ item }) => {
    return (
        <>
            <h3>
                {item.firstName} {item.lastName} (#{item.id})
            </h3>
            <a href={`mailto:${item.email}`}>
                Send a mail to {item.gender === 'Female' ? 'her' : 'him'}
            </a>
        </>
    );
};

const WithoutSkeleton: React.FC = () => {
    const [appSettings, setAppSetting] = useAppSettings();
    const perPage = parseInt(appSettings['perPage'], 10) || 20;

    const { sortedData, setSortBy, sortBy, direction } = useSorting(data, null, null);
    const { pagination, pagedData, setCurrentPage } = usePagination(
        sortedData as DataItem[],
        perPage
    );

    const onPaginationChange = useCallback((newPage: Page, perPage: number) => {
        setCurrentPage(newPage.index, perPage);
        setAppSetting('perPage', perPage);
    }, []);

    const onSortChange = useCallback(
        (column: DataTableColumn<DataItem>) => {
            setSortBy(column.accessor, null);
        },
        [sortBy, direction]
    );

    const sortedByColumn = columns.find(c => c.accessor === sortBy) || null;

    return (
        <DataTable
            columns={columns}
            data={pagedData}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            isFetching={false}
            rowIdentifier={'id'}
            onSortChange={onSortChange}
            sortedBy={{
                column: sortedByColumn,
                direction,
            }}
            expandedComponent={ExpandedItem}
            listComponent={ExpandedItem}
        />
    );
};

storiesOf('Data|Data Table', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default', () => <WithoutSkeleton />)
    .add('With skeleton', () => <WithSkeleton />);
