import { formatDate } from '@equinor/fusion';
import { SliderMarker } from '@equinor/fusion-components';
import { TimelineSplit } from '../model';

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
    return splits.reduce((markers: SliderMarker[], currentSplit: TimelineSplit, index) => {
        if (index === splits.length - 1) {
            return [
                ...markers,
                createSliderMarker(currentSplit.appliesFrom.getTime(), ''),
                createSliderMarker(
                    currentSplit.appliesTo.getTime(),
                    formatDate(currentSplit.appliesTo)
                ),
            ];
        }
        if (index === 0) {
            return [
                ...markers,
                createSliderMarker(
                    currentSplit.appliesFrom.getTime(),
                    formatDate(currentSplit.appliesFrom)
                ),
            ];
        }
        return [...markers, createSliderMarker(currentSplit.appliesFrom.getTime(), '')];
    }, []);
};

/**
 * Temporal sorting function for array of position splits
 * @param a
 * @param b
 * @returns
 */
export const sortByDate = (a: TimelineSplit, b: TimelineSplit) =>
    new Date(a.appliesFrom).getTime() - new Date(b.appliesFrom).getTime();

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
    const sortedSplits = [...splits].sort(sortByDate);
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
