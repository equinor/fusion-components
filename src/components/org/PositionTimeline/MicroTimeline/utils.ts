import { RotationColumn, RotationColumns } from '../model';

export const sortRotationColumns = (a: RotationColumn, b: RotationColumn) =>
    a.split.appliesFrom.getTime() - b.split.appliesFrom.getTime();

export const verifyInitialDate = (start: number, end: number, initialDate?: Date) => {
    if (!initialDate) return;
    if (start <= initialDate.getTime() && end >= initialDate.getTime()) return initialDate;
};

export const findSelectedSplit = (
    rotationColumns: RotationColumns,
    date: Date,
    start: number,
    end: number
) => {
    const sortedColumns = Object.values(rotationColumns).sort(sortRotationColumns);
    if (date.getTime() <= start) return sortedColumns[0].split.id;
    if (date.getTime() >= end) return sortedColumns[sortedColumns.length - 1].split.id;
    return sortedColumns.find(
        (col) =>
            col.split.appliesFrom.getTime() <= date.getTime() &&
            col.split.appliesTo.getTime() >= date.getTime()
    )?.split.id;
};
