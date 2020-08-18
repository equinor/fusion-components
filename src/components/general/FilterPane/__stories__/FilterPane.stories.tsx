import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import FilterPane, { FilterTypes, FilterSection, FilterTerm } from '../index';
import storyData, { DataItem } from './storyData';
import columns from './columns';
import { useAppSettings, useSorting, usePagination, Page } from '@equinor/fusion';
import { styling, DataTable, DataTableColumn, Button } from '@equinor/fusion-components';

type TableProps = {
    data: DataItem[];
};
const Table: React.FC<TableProps> = ({ data }) => {
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
        />
    );
};

const sections: FilterSection<DataItem>[] = [
    {
        key: 'search',
        title: '',
        filters: [
            {
                key: 'search',
                title: '',
                type: FilterTypes.Search,
                getValue: (item) => item.firstName + item.lastName + item.email,
            },
        ],
    },
    {
        key: 'custom-colors',
        title: 'Custom colors',
        isCollapsible: true,
        filters: [
            {
                key: 'custom-colors',
                title: '',
                type: FilterTypes.Radio,
                isVisibleWhenPaneIsCollapsed: true,
                getValue: (item) => '',
                options: [
                    {
                        key: 'papayawhip',
                        label: 'Papayawhip',
                        color: 'papayawhip',
                    },
                    {
                        key: 'tomato',
                        label: 'Tomato',
                        color: 'tomato',
                    },
                    {
                        key: 'default',
                        label: 'Default',
                    },
                ],
            },
        ],
    },
    {
        key: 'filters',
        title: 'Filters',
        isCollapsible: true,
        filters: [
            {
                key: 'gender',
                title: 'Gender',
                type: FilterTypes.Checkbox,
                getValue: (item) => item.gender,
                isVisibleWhenPaneIsCollapsed: true,
                isCollapsible: true,
                options: [
                    {
                        key: 'Male',
                        label: 'Male',
                    },
                    {
                        key: 'Female',
                        label: 'Female',
                        hideCount: true,
                    },
                ],
            },
            {
                key: 'id',
                title: 'Id - with custom colors and very very long title',
                type: FilterTypes.Checkbox,
                getValue: (item) => item.id.toString(),
                isCollapsible: true,
                isCollapsed: false,
                options: [
                    {
                        key: '1',
                        label: '1 - hotpink',
                        color: 'hotpink',
                    },
                    {
                        key: '2',
                        label: '2 - #bada55',
                        color: '#bada55',
                    },
                    {
                        key: '3',
                        label: '3 - palevioletred',
                        color: 'palevioletred',
                    },
                    {
                        key: '4',
                        label: '4 - some weird color with a super super long but awesome name',
                        color: 'mediumslateblue',
                    },
                ],
            },
        ],
    },
];

const FilterPaneStory: React.FC = () => {
    const [terms, setTerms] = useState<FilterTerm[]>([
        {
            key: 'custom-colors',
            value: 'papayawhip',
        },
    ]);
    const [filteredData, setFilteredData] = useState<DataItem[]>(storyData);
    const [filterScreenPlacement, setFilterScreenPlacement] = useState('right');

    const onChange = (filteredData: DataItem[], newTerms: FilterTerm[]) => {
        setTerms(newTerms);
        setFilteredData(filteredData);
    };

    const changeSide = () => {
        setFilterScreenPlacement(filterScreenPlacement === 'right' ? 'left' : 'right');
    };

    const filterHeaderComponent = (
        <div style={{ marginRight: '8px' }}>
            <Button frameless onClick={changeSide}>
                Flip pane {filterScreenPlacement === 'right' ? 'left' : 'right'}
            </Button>
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            {filterScreenPlacement === 'right' && (
                <div style={{ marginRight: styling.grid(4), width: 1, flexGrow: 1 }}>
                    <Table data={filteredData} />
                </div>
            )}
            <FilterPane
                id="story"
                data={storyData}
                sectionDefinitions={sections}
                terms={terms}
                onChange={onChange}
                screenPlacement={filterScreenPlacement}
                headerComponent={filterHeaderComponent}
            />
            {filterScreenPlacement === 'left' && (
                <div style={{ marginRight: styling.grid(4), width: 1, flexGrow: 1 }}>
                    <Table data={filteredData} />
                </div>
            )}
        </div>
    );
};

storiesOf('General|Filter Pane', module)
    .addDecorator(withFusionStory('Filter Pane'))
    .add('Default', () => <FilterPaneStory />);
