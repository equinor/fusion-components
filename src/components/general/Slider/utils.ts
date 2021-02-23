import { SliderMarker } from './Marker';

export const createPositionCalculator = (start: number, end: number) => {
    const full = end - start;

    if (full <= 0) {
        throw new Error('No range');
    }

    return (marker: number) => Math.min(Math.max(((marker - start) / full) * 100, 0), 100) + '%';
};

export const createValueCalculator = (start: number, end: number) => {
    const onePercent = end - start;

    return (percentage: number) => Math.max(onePercent * (percentage / 100) + start, 0);
};

export const createMarkerFinder = (
    trackLeft: number,
    trackWidth: number,
    markers: SliderMarker[],
    calculateValue: (percentage: number) => number
) => {
    return (pageX: number) => {
        const position = pageX - trackLeft;
        const percentage = Math.min(Math.max((position / trackWidth) * 100, 0), 100);
        const newValue = calculateValue(percentage);
        return (
            markers.find((m) => m.value === newValue) || {
                value: newValue,
                label: newValue.toString(),
            }
        );
    };
};
