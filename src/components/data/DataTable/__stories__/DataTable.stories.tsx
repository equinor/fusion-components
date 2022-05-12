import { useCallback, useState } from 'react';

import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import DataTable from '../index';
import data, { fakeFetchAsync, DataItem } from './storyData';
import columns, { simpleColumns, DataItemProps, wordWrapColumns } from './columns';
import {
    Page,
    usePagination,
    useAsyncPagination,
    useAppSettings,
    useSorting,
    Pagination,
} from '@equinor/fusion';
import { DataTableColumn } from '../dataTableTypes';
import { FC } from 'react';

const emptyArray = [];
const WithSkeleton: FC = () => {
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

    const sortedByColumn = columns.find((c) => c.accessor === sortBy) || null;

    return (
        <DataTable
            id='with-skeleton-table'
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
            quickFactScope={'storybook'}
        />
    );
};

const ExpandedItem: FC<DataItemProps> = ({ item }) => {
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

const WithoutSkeleton: FC = () => {
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

    const sortedByColumn = columns.find((c) => c.accessor === sortBy) || null;

    return (
        <DataTable
            id='default-table'
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
            quickFactScope={'storybook'}
        />
    );
};
const DefaultWithOwnStyle: FC = () => {
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

    const sortedByColumn = columns.find((c) => c.accessor === sortBy) || null;

    return (
        <DataTable
            id='default-table'
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
            quickFactScope={'storybook'}
            styleTableRows={"minmax(48px, 1fr)"}
        />
    );
};

const NoColumnsCollapse: FC = () => {
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

    const sortedByColumn = columns.find((c) => c.accessor === sortBy) || null;

    return (
        <DataTable
            id='no-columns-collapse-table'
            noColumnsCollapse
            columns={wordWrapColumns}
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
            quickFactScope={'storybook'}
        />
    );
};

const Selectable: FC = () => {
    const [appSettings, setAppSetting] = useAppSettings();
    const perPage = parseInt(appSettings['perPage'], 10) || 20;

    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
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

    const sortedByColumn = columns.find((c) => c.accessor === sortBy) || null;

    return (
        <DataTable
            id='multi-selectable-table'
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
            isSelectable
            onSelectionChange={setSelectedItems}
            selectedItems={selectedItems}
            quickFactScope={'storybook'}
        />
    );
};

const SingleSelectable: FC = () => {
    const [appSettings, setAppSetting] = useAppSettings();
    const perPage = parseInt(appSettings['perPage'], 10) || 20;

    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
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

    const sortedByColumn = simpleColumns.find((c) => c.accessor === sortBy) || null;

    const handleClick = useCallback(
        (item) => {
            if (selectedItems.findIndex((i) => i.id === item.id) !== -1) {
                setSelectedItems([]);
            } else {
                setSelectedItems([item]);
            }
        },
        [selectedItems]
    );

    return (
        <DataTable
            id='single-selectable-table'
            columns={simpleColumns}
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
            onRowClick={handleClick}
            selectedItems={selectedItems}
            quickFactScope={'storybook'}
        />
    );
};

const ExpandableRows: FC = () => {
    const [appSettings, setAppSetting] = useAppSettings();
    const perPage = parseInt(appSettings['perPage'], 10) || 20;

    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
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

    const sortedByColumn = simpleColumns.find((c) => c.accessor === sortBy) || null;

    const handleClick = useCallback(
        (item) => {
            if (selectedItems.findIndex((i) => i.id === item.id) !== -1) {
                setSelectedItems([]);
            } else {
                setSelectedItems([item]);
            }
        },
        [selectedItems]
    );

    return (
        <DataTable
            id='expandable-rows-table'
            columns={simpleColumns}
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
            isExpandable={true}
            expandedComponent={ExpandedItem}
            listComponent={ExpandedItem}
            onRowClick={handleClick}
            selectedItems={selectedItems}
            quickFactScope={'storybook'}
        />
    );
};

storiesOf('Data/Data Table', module)
    .addParameters({ jest: ['DataTable.stories.jsx'] })
    .addDecorator(withFusionStory('Data Table'))
    .add('Default with own row styles', () => <DefaultWithOwnStyle />)
    .add('Default', () => <WithoutSkeleton />)
    .add('With skeleton', () => <WithSkeleton />)
    .add('Single selectable', () => <SingleSelectable />)
    .add('Multi selectable', () => <Selectable />)
    .add('No Columns Collapse', () => <NoColumnsCollapse />)
    .add('With expandable rows', () => <ExpandableRows />);
