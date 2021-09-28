import { FC } from 'react';
import { PositionMark, TimelineSplit } from '../../model';
import { useStyles } from './styles';

type MicroSplitProps = {
    split: TimelineSplit;
    computePosition?: (time: number, mark: PositionMark) => number;
};

export const MicroSplit: FC<MicroSplitProps> = ({ split, computePosition }) => {
    const styles = useStyles({ isSelected: true, isAssigned: true, isRotation: false });
    if (!computePosition) return null;

    return (
        <div className={styles.root}>
            <div
                className={styles.indicator}
                style={{ left: `${computePosition(split.appliesFrom.getTime(), 'start')}%` }}
            ></div>
            <div
                className={styles.split}
                style={{
                    left: `${computePosition(split.appliesFrom.getTime(), 'start')}%`,
                    right: `${computePosition(split.appliesTo.getTime(), 'end')}%`,
                }}
            ></div>
        </div>
    );
};

export default MicroSplit;
