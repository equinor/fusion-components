import { useMemo } from 'react';
import { TimelinePosition } from '../model';
import { createPositionEstimator, getEndDate, getRotationColumns, getStartDate } from '../utils';
import { findSelectedSplit, verifyInitialDate } from './utils';

export const usePositionTimeline = (
    position: TimelinePosition,
    date?: Date,
    selectedSplit?: string
) => {
    const splits = useMemo(() => position.instances, [position]);
    const start = useMemo(() => getStartDate(splits), [splits]);
    const end = useMemo(() => getEndDate(splits), [splits]);
    const selectedDate = useMemo(() => verifyInitialDate(start, end, date), [date, start, end]);
    const rotationColumns = useMemo(() => getRotationColumns(splits), [splits]);
    const computePosition = useMemo(() => createPositionEstimator(start, end), [start, end]);
    const selected = useMemo(
        () => selectedSplit ?? (date && findSelectedSplit(rotationColumns, date, start, end)),
        [date, selectedSplit, rotationColumns, start, end]
    );

    return {
        selectedDate,
        rotationColumns,
        computePosition,
        selected,
    };
};
