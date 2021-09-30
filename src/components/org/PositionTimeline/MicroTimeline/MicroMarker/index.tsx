import { clsx } from '@equinor/fusion-react-styles';
import { FC } from 'react';
import { PositionMark, TimelineSize } from '../../model';
import { useStyles } from './styles';

type MicroMarkerProps = {
    selected: string;
    date: Date;
    linked?: string[];
    computePosition?: (time: number, mark: PositionMark) => number;
    isSelectedDate?: boolean;
    size: TimelineSize;
};

export const MicroMarker: FC<MicroMarkerProps> = ({
    selected,
    date,
    linked,
    computePosition,
    isSelectedDate,
    size
}) => {
    const isSelected = !!linked && linked.includes(selected);
    const styles = useStyles({ isSelected, size });
    if (!computePosition) return null;

    return (
        <div
            className={clsx(styles.marker, { [styles.selectedDate]: isSelectedDate })}
            style={{ left: `${computePosition(date.getTime(), 'start')}%` }}
        ></div>
    );
};

export default MicroMarker;
