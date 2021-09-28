import { useMemo } from 'react';
import { TimelinePosition } from '../model';
import {
    createPositionEstimator,
    getEndDate,
    getRotationColumns,
    getStartDate,
    initialSelectedDate,
} from '../utils';

export const usePositionTimeline = (position: TimelinePosition, date: Date) => {
    const splits = useMemo(() => position.instances, [position]);
    const start = useMemo(() => getStartDate(splits), [splits]);
    const end = useMemo(() => getEndDate(splits), [splits]);
    const selectedDate = useMemo(() => initialSelectedDate(date, start, end), [date, start, end]);
    const rotationColumns = useMemo(() => getRotationColumns(splits), [splits]);
    const computePosition = useMemo(() => createPositionEstimator(start, end), [start, end]);

    return {
        splits,
        start,
        end,
        selectedDate,
        rotationColumns,
        computePosition,
    };
};
