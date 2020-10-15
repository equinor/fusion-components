import WorkOrderType from '../models/WorkOrderType';
import { FilterTerm } from '@equinor/fusion-components';
import ColumnType from '../models/ColumnType';
import { getGroupBy } from '../filter/filter';
import { columnSorter } from '../helpers';
import { format, parse } from 'date-fns';

export const getColumns = (data: WorkOrderType[], filterTerms: FilterTerm[]) => {
    const highlightedKey = getHighlightedColumnKey(filterTerms);
    const columnKeyAccessor = getColumnKeyAccessor(filterTerms);

    const newColumns = data.reduce<ColumnType[]>((columns, commpkg) => {
        const key = columnKeyAccessor(commpkg);
        const column = columns.find((c) => c.key === key);
        column
            ? column.data.push({ ...commpkg, key })
            : columns.push({ key, data: [{ ...commpkg, key }] });
        return columns;
    }, []);

    const highlightedKeyIndex = newColumns.findIndex((c) => c.key === highlightedKey);
    if (highlightedKey && highlightedKeyIndex === -1) {
        newColumns.push({ key: highlightedKey, data: [] });
    }

    return newColumns.sort(columnSorter);
};

export const getHighlightedColumnKey = (filterTerms: FilterTerm[]) => {
    const groupBy = getGroupBy(filterTerms);

    switch (groupBy) {
        case 'plannedStartDate':
        case 'plannedFinishDate':
            return getYearAndWeekFromDate(new Date());

        default:
            return null;
    }
};

export const getColumnKeyAccessor = (filterTerms: FilterTerm[]) => {
    const groupBy = getGroupBy(filterTerms);

    // Planned if not forecast when forecast
    switch (groupBy) {
        case 'plannedStartDate':
        case 'plannedFinishDate':
            return (item: WorkOrderType) => getYearAndWeek(item[groupBy]);

        default:
            return (item: WorkOrderType) => item[groupBy];
    }
};

export const getYearAndWeekFromDate = (date: Date) => format(date, 'yyyy/II', { weekStartsOn: 1 });

const dateCache: { [index: string]: string } = {};
export const getYearAndWeek = (dateString: string): string => {
    if (dateCache[dateString]) {
        return dateCache[dateString];
    }

    const date = parse(dateString, 'yyyy/MM/dd', new Date());
    const result = getYearAndWeekFromDate(date);

    dateCache[dateString] = result;
    return result;
};
