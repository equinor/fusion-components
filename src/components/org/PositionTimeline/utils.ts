import {
    PositionMark,
    RotationColumn,
    RotationColumns,
    RotationGroups,
    TemporalSplitGroups,
    TimelineSplit,
} from './model';

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

/**
 * Groups a set of splits according to their start date. Every split that begins
 * on the same date will be grouped together. Based on the appliesFrom property.
 * @param splits
 * @returns
 */
export const splitGroupsByDate = (splits: TimelineSplit[]): TemporalSplitGroups => {
    return splits.reduce((groups: TemporalSplitGroups, currentSplit: TimelineSplit) => {
        const appliesFrom = removeTimeFromDate(currentSplit.appliesFrom).getTime().toString();
        if (!Object.keys(groups).includes(appliesFrom)) {
            return {
                ...groups,
                [appliesFrom]: [currentSplit],
            };
        }
        return {
            ...groups,
            [appliesFrom]: [...groups[appliesFrom], currentSplit],
        };
    }, {});
};

/**
 * Returns the split with the earliest start date. Based on the appliesFrom property.
 * @param splits
 * @returns
 */
export const getEarliestFinish = (splits: TimelineSplit[]): TimelineSplit => {
    const ascending = splits.sort((a, b) => a.appliesTo.getTime() - b.appliesTo.getTime());
    return ascending[0];
};

/**
 * Checks whether two splits overlap in time.
 * @param splitA
 * @param splitB
 * @returns
 */
export const doesSplitsOverlap = (splitA: TimelineSplit, splitB: TimelineSplit) =>
    splitA.appliesFrom.getTime() <= splitB.appliesTo.getTime() &&
    splitB.appliesFrom.getTime() <= splitA.appliesTo.getTime();

/**
 * Returns all the splits in a set which overlaps in time with the main split
 * @param main
 * @param splits
 * @returns
 */
export const getLinkedSplits = (main: TimelineSplit, splits: TimelineSplit[]): TimelineSplit[] => {
    return splits.reduce((overlapping: TimelineSplit[], currentSplit: TimelineSplit) => {
        if (doesSplitsOverlap(main, currentSplit)) {
            return [...overlapping, currentSplit];
        }
        return overlapping;
    }, []);
};

/**
 * Groups a set of splits into columns, where each column is represented by a unqiue split start date in the set of splits.
 * Each column is associated by a main split (the split in the set which has the smallest range compared to other splits with
 * the same start date), and a set of linked splits, which overlaps with the main split.
 * @param splits
 * @returns
 */
export const getRotationColumns = (splits: TimelineSplit[]): RotationColumns => {
    const temporalGroups = splitGroupsByDate(splits);
    return Object.keys(temporalGroups).reduce((columns: RotationColumns, temporalKey: string) => {
        const relevantSplits = temporalGroups[temporalKey];
        if (relevantSplits.length === 1) {
            const split = relevantSplits[0];
            const linked = getLinkedSplits(split, splits);
            return {
                ...columns,
                [split.id]: {
                    split,
                    linked,
                },
            };
        }
        const earliest = getEarliestFinish(relevantSplits);
        const linked = getLinkedSplits(earliest, splits);
        return {
            ...columns,
            [earliest.id]: {
                split: earliest,
                linked,
            },
        };
    }, {});
};

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
