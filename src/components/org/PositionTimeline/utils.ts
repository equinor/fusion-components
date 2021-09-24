import { PositionMark, RotationColumns, RotationGroups, TimelineSplit } from "./model";

/**
 * Finds the earliest start date in a set of splits.
 * @param splits
 * @returns
 */
 export const getStartDate = (splits: TimelineSplit[]) => {
    return Math.min(...splits.map((split) => split.appliesFrom.getTime()));
};

/**
 * Finds the latest end date in a set of splits.
 * @param splits
 * @returns
 */
export const getEndDate = (splits: TimelineSplit[]) => {
    return Math.max(...splits.map((split) => split.appliesTo.getTime()));
};

/**
 * Creates an estimator which calculates the relative position of a date
 * in a given date range specified by the start and end date.
 * @param start
 * @param end
 * @returns
 */
export const createPositionEstimator = (start: number, end: number) => {
    const range = end - start;
    if (range <= 0) return;
    return (time: number, mark: PositionMark) => {
        const postion = Math.min(Math.max(((time - start) / range) * 100, 0), 100);
        if (mark === 'end') return 100 - postion;
        return postion;
    };
};

/**
 * Divides the set of splits into their respective rotation groups.
 * Note that non-rotation splits are put in rotation group 1 ('1').
 * @param splits
 * @returns
 */
export const getRotationGroups = (splits: TimelineSplit[]): RotationGroups => {
    return splits.reduce(
        (groups: RotationGroups, currentSplit: TimelineSplit) => {
            const rotationGroup = currentSplit.rotationId ?? null;
            if (rotationGroup) {
                if (Object.keys(groups).includes(rotationGroup)) {
                    return {
                        ...groups,
                        [rotationGroup]: [...groups[rotationGroup], currentSplit],
                    };
                }
                return {
                    ...groups,
                    [rotationGroup]: [currentSplit],
                };
            }
            return {
                ...groups,
                ['1']: [...groups['1'], currentSplit],
            };
        },
        { '1': [] }
    );
};

export const getRotationColumns = (splits: TimelineSplit[]): RotationColumns => {
    return splits.reduce((columns: RotationColumns, currentSplit: TimelineSplit) => {
        if (!currentSplit.rotationId) return columns;
        
    }, {});
}

/**
 * Removes the time from the date object, to make it data-comparable
 * @param date
 * @returns
 */
const removeTimeFromDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

/**
 * Finds the splits that are active given the selected date
 * @param splits
 * @param selectedDate
 * @returns
 */
export const getSelectedSplits = (splits: TimelineSplit[], selectedDate: Date): string[] => {
    return splits
        .filter((split) => {
            const from = removeTimeFromDate(split.appliesFrom);
            const to = removeTimeFromDate(split.appliesTo);
            const selected = removeTimeFromDate(selectedDate);
            return from.getTime() <= selected.getTime() && to.getTime() >= selected.getTime();
        })
        .map((split) => split.id);
};

/**
 * Computes the initial selected date for a timeline after a position has been selected.
 * @param currentDate
 * @param start
 * @param end
 * @returns
 */
export const initialSelectedDate = (currentDate: Date, start: number, end: number): Date => {
    if (currentDate.getTime() < start) return new Date(start);
    if (currentDate.getTime() > end) return new Date(end);
    return currentDate;
};
