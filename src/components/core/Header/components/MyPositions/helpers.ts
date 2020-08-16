import { PersonPosition } from '@equinor/fusion';

export const sortPositionsByTo = (positions: PersonPosition[]) =>
    [...positions].sort((a, b) => b.appliesTo.getTime() - a.appliesTo.getTime());

export const filterPositionsByDate = (positions: PersonPosition[], date: Date) =>
    positions.filter(
        (position) =>
            date.getTime() >= position.appliesFrom.getTime() &&
            date.getTime() <= position.appliesTo.getTime()
    );

export const isPositionsPast = (position: PersonPosition, filterToDate: Date) =>
    position.appliesTo.getTime() < filterToDate.getTime();
