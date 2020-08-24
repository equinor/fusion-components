import { PersonPosition } from '@equinor/fusion';

export const sortPositionsByTo = (positions?: PersonPosition[]): PersonPosition[] =>
    [...positions].sort((a, b) => b.appliesTo.getTime() - a.appliesTo.getTime());

export const getActivePositions = (
    positions: PersonPosition[],
    filterToDate: Date
): PersonPosition[] =>
    positions.filter(
        (position) =>
            filterToDate.getTime() >= position.appliesFrom.getTime() &&
            filterToDate.getTime() <= position.appliesTo.getTime()
    );
export const getPastPositions = (
    positions: PersonPosition[],
    filterToDate: Date
): PersonPosition[] =>
    positions.filter((position) => position.appliesTo.getTime() < filterToDate.getTime());

export const getFuturePositions = (
    positions: PersonPosition[],
    filterToDate: Date
): PersonPosition[] =>
    positions.filter((position) => position.appliesFrom.getTime() > filterToDate.getTime());
