import { FC } from 'react';
import { TimelinePosition } from '../model';
import MicroSplit from './MicroSplit';
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
            {Object.values(rotationColumns).map((col) => (
                <MicroSplit
                    key={col.split.id}
                    split={col.split}
                    computePosition={computePosition}
                />
            ))}
        </div>
    );
};

export default MicroTimeline;
