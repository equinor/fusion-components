import { FC } from 'react';
import { TimelinePosition, TimelineSize } from '../model';
import InlineMarkers from './InlineMarkers';
import { InlineSplits } from './InlineSplits';
import { useStyles } from './styles';
import { usePositionTimeline } from './usePositionTimeline';

type InlinePositionTimelineProps = {
    /**
     * An object containing all relevant metadata about the position, including
     * the set of position splits.
     */
    selectedPosition: TimelinePosition;
    /**
     * Information about the selected split that should be highlighted in the timeline.
     * Typically either selectedSplit or initialDate is provided to highlight a split.
     */
    selectedSplit?: string;
    /**
     * A filter date for which will cause any splits that overlaps to be highlighted in
     * the timeline.
     */
    initialDate?: Date;
    /**
     * Either has the value ‘small’ or ‘medium’. Will change the pixel size of the markers
     * and splits.
     */
    size: TimelineSize;
};

export const InlinePositionTimeline: FC<InlinePositionTimelineProps> = ({
    selectedPosition,
    selectedSplit,
    initialDate,
    size,
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
