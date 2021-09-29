import { FC } from 'react';
import { PositionMark } from '../../model';
import { useStyles } from './styles';

type MicroMarkerProps = {
    date: Date;
    computePosition?: (time: number, mark: PositionMark) => number;
};

export const MicroMarker: FC<MicroMarkerProps> = ({ date, computePosition }) => {
    const styles = useStyles({ isSelected: true });
    if (!computePosition) return null;

    return (
        <div
            className={styles.marker}
            style={{ left: `${computePosition(date.getTime(), 'start')}%` }}
        ></div>
    );
};

export default MicroMarker;
