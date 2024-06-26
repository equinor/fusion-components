import { actions } from '@storybook/addon-actions';
import { DataTableColumn } from '../index';
import { DataItem } from './storyData';
import { Button, styling } from '@equinor/fusion-components';
import { FC } from 'react';

const eventsFromNames = actions('onClick');

const IdSkeleton = ({ rowIndex }) => <span>#</span>;

export type DataItemProps = {
    item: DataItem;
    rowIndex: number;
};

const DeleteColumn: FC<DataItemProps> = ({ item }) => (
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
        id: 'id',
    },
    {
        key: 'firstName',
        accessor: 'firstName',
        label: 'First name',
        priority: 2,
        sortable: true,
        width: styling.grid(20),
        id: 'firstName',
    },
    {
        key: 'lastName',
        accessor: 'lastName',
        label: 'Last name',
        priority: 5,
        sortable: true,
        width: styling.grid(30),
        id: 'lastName',
    },
    {
        key: 'email',
        accessor: 'email',
        label: 'Email',
        priority: 4,
        sortable: true,
        id: 'email',
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
        id: 'delete',
    },
];

export const simpleColumns: DataTableColumn<DataItem>[] = [
    {
        key: 'id',
        accessor: 'id',
        label: 'Id',
        sortable: true,
        width: styling.grid(5),
    },
    {
        key: 'firstName',
        accessor: 'firstName',
        label: 'First name',
        sortable: true,
    },
    {
        key: 'lastName',
        accessor: 'lastName',
        label: 'Last name',
        sortable: true,
    },
    {
        key: 'email',
        accessor: 'email',
        label: 'Email',
        priority: 4,
        sortable: true,
    },
];

export const wordWrapColumns: DataTableColumn<DataItem>[] = [
    {
        key: 'id',
        accessor: 'id',
        label: 'Id',
        sortable: true,
        width: styling.grid(5),
    },
    {
        key: 'firstName',
        accessor: 'firstName',
        label: 'First name',
        sortable: true,
    },
    {
        key: 'lastName',
        accessor: 'lastName',
        label: 'Last name',
        sortable: true,
    },
    {
        key: 'email',
        accessor: 'email',
        label: 'Email',
        priority: 4,
        sortable: true,
        width: styling.grid(5),
        component: ({ item }) => (
            <div style={{ width: '190px', wordWrap: 'break-word' }}>{item.email}</div>
        ),
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
