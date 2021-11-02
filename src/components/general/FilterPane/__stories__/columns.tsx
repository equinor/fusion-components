import { actions } from '@storybook/addon-actions';
import { DataItem } from './storyData';
import { Button, styling, DataTableColumn } from '@equinor/fusion-components';
import { FC } from 'react';

const eventsFromNames = actions('onClick');

const IdSkeleton = ({ rowIndex }) => <span>#</span>;

export type DataItemProps = {
    item: DataItem;
    rowIndex: number;
};

const DeleteColumn: FC<DataItemProps> = ({ item }) => (
    <Button id="row-delete-btn" {...eventsFromNames}>Delete #{item.id}</Button>
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
        id: 'id-column',
    },
    {
        key: 'firstName',
        accessor: 'firstName',
        label: 'First name',
        priority: 2,
        sortable: true,
        width: styling.grid(20),
        id: 'first-name-column',
    },
    {
        key: 'lastName',
        accessor: 'lastName',
        label: 'Last name',
        priority: 5,
        sortable: true,
        width: styling.grid(30),
        id: 'last-name-column',
    },
    {
        key: 'email',
        accessor: 'email',
        label: 'Email',
        priority: 4,
        sortable: true,
        id: 'email-column',
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
        id: 'delete-column',
    },
];

export default columns;
