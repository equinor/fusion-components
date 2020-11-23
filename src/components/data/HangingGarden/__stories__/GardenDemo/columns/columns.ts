import WorkOrderType from '../models/WorkOrderType';
import { format, parse } from 'date-fns';
import { HangingGardenColumn } from '../../../models/HangingGarden';

export const getColumns = (data: WorkOrderType[]) => {
    const highlightedKey = getYearAndWeekFromDate(new Date());

    const newColumns = data.reduce<HangingGardenColumn<WorkOrderType>[]>((columns, commpkg) => {
        const key = commpkg.plannedStartDate ? getYearAndWeek(commpkg.plannedStartDate) : 'N/A';
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

    return newColumns.sort(({ key: a }, { key: b }) => a.localeCompare(b));
};

export const getYearAndWeekFromDate = (date: Date) => format(date, 'yyyy/II', { weekStartsOn: 1 });

const dateCache: { [index: string]: string } = {};
export const getYearAndWeek = (dateString: string): string => {
    if (dateCache[dateString]) return dateCache[dateString];

    const date = parse(dateString, 'yyyy/MM/dd', new Date());
    const result = getYearAndWeekFromDate(date);

    dateCache[dateString] = result;
    return result;
};
