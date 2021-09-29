import { FC } from 'react';
import { TimelinePosition } from '../model';
import MicroMarker from './MicroMarker';
import MicroSplit from './MicroSplit';
import { MicroSplits } from './MicroSplit/MicroSplits';
import { useStyles } from './styles';
import { usePositionTimeline } from './usePositionTimeline';

type MicroTimelineProps = {
    selectedPosition: TimelinePosition;
    initialDate?: Date;
};

export const MicroTimeline: FC<MicroTimelineProps> = ({ selectedPosition, initialDate }) => {
    const styles = useStyles();
    const {
        splits,
        start,
        end,
        selectedDate,
        rotationColumns,
        computePosition,
    } = usePositionTimeline(selectedPosition, initialDate ?? new Date());
    return (
        <div className={styles.timeline}>
            <MicroSplits rotationColumns={rotationColumns} computePosition={computePosition} />
            <MicroMarker
                date={Object.values(rotationColumns)[0].split.appliesFrom}
                computePosition={computePosition}
            />
            <MicroMarker
                date={Object.values(rotationColumns)[0].split.appliesTo}
                computePosition={computePosition}
            />
        </div>
    );
};

export default MicroTimeline;
