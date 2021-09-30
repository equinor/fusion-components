import { RotationColumn } from '../../model';
import { MicroMarkerData } from './types';

export const dayShiftDate = (date: Date, days: number) => {
    const shifted = new Date(date);
    shifted.setDate(date.getDate() + days);
    return shifted;
};

export const detectGap = (start: Date, end: Date) => {
    const shifted = dayShiftDate(start, 2);
    return end.getTime() > shifted.getTime();
};

export const generateMarkerData = (rotationColumns: RotationColumn[]) => {
    return rotationColumns.reduce((data: MicroMarkerData[], col: RotationColumn, index) => {
        const prevCol = index > 0 ? rotationColumns[index - 1] : undefined;
        const nextCol = index < rotationColumns.length - 1 ? rotationColumns[index + 1] : undefined;
        const hasGapBefore = prevCol && detectGap(prevCol.split.appliesTo, col.split.appliesFrom);
        const hasGapAfter = nextCol && detectGap(col.split.appliesTo, nextCol.split.appliesFrom);
        const start: MicroMarkerData = {
            date: col.split.appliesFrom,
            linked: col.linked.map((split) => split.id),
        };
        const end: MicroMarkerData = {
            date: col.split.appliesTo,
            linked: col.linked.map((split) => split.id),
        };
        const prevLinked: string[] = prevCol?.linked.map((split) => split.id) || [];
        if (rotationColumns.length == 1) {
            return [...data, start, end];
        }
        if (index === 0) {
            return hasGapAfter ? [...data, start, end] : [...data, start];
        }
        if (index === rotationColumns.length - 1) {
            return hasGapBefore
                ? [...data, start, end]
                : [...data, { ...start, linked: [...start.linked, ...prevLinked] }, end];
        }
        const modifiedStart = hasGapBefore
            ? start
            : { date: dayShiftDate(start.date, -1), linked: [...start.linked, ...prevLinked] };
        return hasGapAfter ? [...data, modifiedStart, end] : [...data, modifiedStart];
    }, []);
};
