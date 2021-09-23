import { formatDate } from '@equinor/fusion';
import { SliderMarker } from '@equinor/fusion-components';
import { RotationGroups, TimelineSplit } from '../model';
import { PositionMark } from './types';

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
export const getSelectedSplits = (
    splits: TimelineSplit[],
    selectedDate: Date
): string[] => {
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

/**
 * Creates a slider marker for the Slider component in Fusion Components
 * @param value
 * @param label
 * @param elevated
 * @returns
 */
export const createSliderMarker = (
    value: number,
    label: string,
    elevated?: boolean
): SliderMarker => {
    return {
        value,
        label,
        elevated,
    };
};

/**
 * Creates a slider marker for today's date. Will only display the 'Today' label
 * if today is relatively p
 * @param startDate
 * @param endDate
 * @returns
 */
export const createTodayMarker = (startDate?: number, endDate?: number) => {
    const today = new Date().getTime();
    if (startDate && endDate && startDate < today && endDate > today) {
        const range = endDate - startDate;
        const percentage = (today - startDate) / range;
        const label = percentage > 0.15 && percentage < 0.85 ? 'Today' : '';
        return createSliderMarker(today, label);
    }
    return;
};

/**
 * Creates an array of slider markers, a marker for each of the provided position splits
 * Each marker is based on the split's appliesFrom date, except the last split which
 * is baseon the appliesTo date.
 * @param splits
 * @returns
 */
export const createSplitMarkers = (splits: TimelineSplit[]) => {
    if (splits.length === 1) {
        const split = splits[0];
        return [
            createSliderMarker(split.appliesFrom.getTime(), formatDate(split.appliesFrom)),
            createSliderMarker(split.appliesTo.getTime(), formatDate(split.appliesTo)),
        ];
    }
    return splits.map((split, index) => {
        if (index === splits.length - 1) {
            return createSliderMarker(split.appliesTo.getTime(), formatDate(split.appliesTo));
        }
        if (index === 0) {
            return createSliderMarker(
                split.appliesFrom.getTime(),
                formatDate(split.appliesFrom)
            );
        }
        return createSliderMarker(split.appliesFrom.getTime(), '');
    });
};

/**
 * Temporal sorting function for array of position splits
 * @param a
 * @param b
 * @returns
 */
export const sortByDate = (a: TimelineSplit, b: TimelineSplit) =>
    a.appliesFrom.getTime() - b.appliesFrom.getTime();

/**
 * Generates a set of slider markers used as a wrapper for the position timeline component
 * The timeline consists of two sliders - the top and bottom, and thus this method
 * generates a set of slider markers for each of the two sliders.
 * @param splits
 * @param selectedDate
 * @param startDate
 * @param endDate
 * @returns
 */
export const generateSliderMarkers = (
    splits: TimelineSplit[],
    startDate?: number,
    endDate?: number
): { topSliderMarkers: SliderMarker[]; bottomSliderMarkers: SliderMarker[] } => {
    const sortedSplits = splits.sort(sortByDate);
    const topSliderMarkers = [
        createSliderMarker(startDate || 0, ''),
        createSliderMarker(endDate || 0, ''),
    ];
    const todayMarker = createTodayMarker(startDate, endDate);
    const splitMarkers = createSplitMarkers(sortedSplits);
    const bottomSliderMarkers = todayMarker ? [...splitMarkers, todayMarker] : splitMarkers;
    return {
        topSliderMarkers,
        bottomSliderMarkers,
    };
};
