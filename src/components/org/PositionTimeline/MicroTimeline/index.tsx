import { FC } from 'react';
import { TimelinePosition } from '../model';
import { usePositionTimeline } from './usePositionTimeline';

type MicroTimelineProps = {
    selectedPosition: TimelinePosition;
    initialDate?: Date;
};

export const MicroTimeline: FC<MicroTimelineProps> = ({ selectedPosition, initialDate }) => {
    const {
        splits,
        start,
        end,
        selectedDate,
        rotationGroups,
        computePosition,
    } = usePositionTimeline(selectedPosition, initialDate);

    return <div></div>;
};

export default MicroTimeline;
