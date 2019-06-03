import React, { useState } from 'react';
import classnames from 'classnames';

import InfoToolbar from './components/InfoToolbar';
import {
    ComponentDisplayTypesEnum,
    componentDisplayTypeClassNames,
} from '../../contexts/componentDisplayContext';
import useHorizontalBreakpoint, {
    HorizontalBreakpoint,
} from '../../../hooks/useHorizontalBreakpoint';

import styles from './styles/index.less';
import useScrollSpy from '../../../hooks/useScrollSpy';

type Accessor = (() => string) | string;

enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
}

type SortedBy = {
    key: string;
    direction: SortDirection;
};

type Header = () => void | React.ReactNode;

type Column = {
    key: string;
    header: Header;
    accessor: Accessor;
    render?: () => void;
    isSortable?: boolean;
    isCollapsed?: boolean;
    createComparer?: () => void;
    defaultSortDirection?: SortDirection;
    width?: string;
    isExtra?: boolean;
};

type ColumnObject = {
    all: Column[];
    visible: Column[];
    extra: Column[];
};

enum ColumnPosition {
    START = 'start',
    END = 'end',
}

type DataTableProps = {
    id: string;
    data: any[];
    isFetchingInitialData?: boolean;
    isFetching?: boolean;
    showComponentDisplaySelector?: boolean;
    rowKeyAccessor: Accessor;
    defaultSortedBy?: SortedBy;
    columns?: Column[];
    renderListItem: () => void;
    externalSorting?: boolean;
    onExpand?: () => void;
    onSort?: () => void;
    onReset?: () => void;
    // pagination?: Pagination,
    expandColumnPosition?: ColumnPosition;
    inheritAccordionTemplate?: boolean;
};

enum DataTableSizes {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small',
}

const sizeBreakpoints: HorizontalBreakpoint[] = [
    { key: 'large', width: 1080 },
    { key: 'medium', width: 767 },
    { key: 'small', width: 0 },
];

const DataTable: React.FC<DataTableProps> = ({
    id,
    data,
    isFetchingInitialData,
    isFetching,
    showComponentDisplaySelector,
    rowKeyAccessor,
    defaultSortedBy,
    columns = [],
    renderListItem,
    externalSorting,
    onExpand,
    onSort,
    onReset,
    expandColumnPosition,
    inheritAccordionTemplate,
}): React.ReactElement => {
    const [sortedBy, setSortedBy] = useState(defaultSortedBy || null);
    const [expandedRowKey, setExpandedRowKey] = useState(null);

    const [breakpointRef, size] = useHorizontalBreakpoint(sizeBreakpoints);
    const [scrollRef, scroll] = useScrollSpy(false, false);

    const displayType = ComponentDisplayTypesEnum.COMFORTABLE;

    const classname = classnames(
        styles.container,
        componentDisplayTypeClassNames(displayType, styles),
        {
            [styles.large]: !size || size === DataTableSizes.LARGE,
            [styles.medium]: size === DataTableSizes.MEDIUM,
            [styles.small]: size === DataTableSizes.SMALL,
        }
    );

    const getColumns = () => {
        const columnObject: ColumnObject = {
            all: columns,
            extra: [],
            visible: columns,
        };

        columnObject.visible = columns.filter(column => !column.isCollapsed);
        columnObject.extra = columns.filter(column => column.isCollapsed);

        if (size === DataTableSizes.MEDIUM) {
            columnObject.visible = columns.filter(
                column => !(column.isExtra || column.isCollapsed)
            );
            columnObject.extra = columns.filter(
                column => (column.isExtra || column.isCollapsed) && column.header
            );
        } else if (size === DataTableSizes.SMALL) {
            columnObject.visible = [];
            columnObject.extra = columns.filter(column => column.header);
        }

        return columnObject;
    };

    const renderGrid = () => {
        const columnObjects = getColumns();
        const hasExtraColumns = columnObjects.extra.length > 0;

        return (
            <div>
                <p>scrollLeft: {scroll.scrollLeft}</p>
                <p>scrollTop: {scroll.scrollTop}</p>
                <div ref={scrollRef} style={{ height: '200px', width: '300px', overflow: 'auto' }}>
                    <div style={{ height: '500px', width: '500px' }}>Heisann</div>
                </div>
            </div>
        );
    };

    const renderList = () => {
        return <div>Rendrer liste. {data}</div>;
    };

    return (
        <div ref={breakpointRef} className={classname}>
            <InfoToolbar
                dataCount={data.length}
                onReset={() => console.log('ja')}
                canReset={true}
                isFetching={false}
            />
            {size !== DataTableSizes.SMALL ? renderGrid() : renderList()}
        </div>
    );
};

export default DataTable;
