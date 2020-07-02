import React from 'react';
import { actions } from '@storybook/addon-actions';
import { DataItem } from './storyData';
import Button from 'components/general/Button';
import { DataTableColumn } from 'components/data/DataTable/dataTableTypes';
import styling from 'styles/styling';

const eventsFromNames = actions('onClick');

const IdSkeleton = ({ rowIndex }) => <span>#</span>;

export type DataItemProps = {
    item: DataItem;
    rowIndex: number;
};

const DeleteColumn: React.FC<DataItemProps> = ({ item }) => (
    <Button {...eventsFromNames}>Delete #{item.id}</Button>
);
const DeleteColumnSkeleton = () => <Button disabled>Delete #</Button>;

const columns: DataTableColumn<DataItem>[] = [
    {
        key: 'id',
        accessor: 'id',
        label: 'Id',
        skeleton: IdSkeleton,
        width: styling.grid(5),
        priority: 6,
        sortable: true,
    },
    {
        key: 'firstName',
        accessor: 'firstName',
        label: 'First name',
        priority: 2,
        sortable: true,
        width: styling.grid(20),
    },
    {
        key: 'lastName',
        accessor: 'lastName',
        label: 'Last name',
        priority: 5,
        sortable: true,
        width: styling.grid(30),
    },
    {
        key: 'email',
        accessor: 'email',
        label: 'Email',
        priority: 4,
        sortable: true,
    },
    {
        key: 'delete',
        accessor: 'id',
        label: '',
        component: DeleteColumn,
        skeleton: DeleteColumnSkeleton,
        width: styling.grid(17),
        style: {
            justifyContent: 'flex-end',
        },
        priority: 3,
    },
];

export default columns;
