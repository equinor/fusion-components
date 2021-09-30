import { FC } from 'react';
import { TimelinePosition, TimelineSize } from '../model';
import { MicroMarkers } from './MicroMarker/MicroMarkers';
import { MicroSplits } from './MicroSplit/components/MicroSplits';
import { useStyles } from './styles';
import { usePositionTimeline } from './usePositionTimeline';

type MicroTimelineProps = {
    selectedPosition: TimelinePosition;
    selectedSplit?: string;
    initialDate?: Date;
    size: TimelineSize;
};

export const MicroTimeline: FC<MicroTimelineProps> = ({
    selectedPosition,
    selectedSplit,
    initialDate,
    size
}) => {
    const styles = useStyles();
    const { selectedDate, rotationColumns, computePosition, selected } = usePositionTimeline(
        selectedPosition,
        initialDate,
        selectedSplit
    );
    return (
        <div className={styles.timeline}>
            <MicroSplits
                selectedSplit={selected}
                rotationColumns={rotationColumns}
                computePosition={computePosition}
                size={size}
            />
            <MicroMarkers
                selectedSplit={selected}
                rotationColumns={rotationColumns}
                computePosition={computePosition}
                selectedDate={selectedDate}
                size={size}
            />
        </div>
    );
};

export default MicroTimeline;
