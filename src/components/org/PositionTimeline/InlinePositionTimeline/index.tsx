import { FC } from 'react';
import { TimelinePosition, TimelineSize } from '../model';
import { InlineMarkers } from './InlineMarker/MicroMarkers';
import { InlineSplits } from './InlineSplit/components/MicroSplits';
import { useStyles } from './styles';
import { usePositionTimeline } from './usePositionTimeline';

type InlinePositionTimelineProps = {
    selectedPosition: TimelinePosition;
    selectedSplit?: string;
    initialDate?: Date;
    size: TimelineSize;
};

export const InlinePositionTimeline: FC<InlinePositionTimelineProps> = ({
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
            <InlineSplits
                selectedSplit={selected}
                rotationColumns={rotationColumns}
                computePosition={computePosition}
                size={size}
            />
            <InlineMarkers
                selectedSplit={selected}
                rotationColumns={rotationColumns}
                computePosition={computePosition}
                selectedDate={selectedDate}
                size={size}
            />
        </div>
    );
};

export default InlinePositionTimeline;
