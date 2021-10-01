import { FC } from 'react';
import { PositionMark, TimelineSize } from '../../model';
import { useStyles } from './styles';

type InlineMarkerProps = {
    selected: string;
    date: Date;
    linked?: string[];
    computePosition?: (time: number, mark: PositionMark) => number;
    isSelectedDate?: boolean;
    size: TimelineSize;
};

export const InlineMarker: FC<InlineMarkerProps> = ({
    selected,
    date,
    linked,
    computePosition,
    isSelectedDate,
    size,
}) => {
    const isSelected = !!linked && linked.includes(selected);
    const styles = useStyles({ isSelected, size, isSelectedDate });
    if (!computePosition) return null;

    return (
        <div
            className={styles.marker}
            style={{ left: `${computePosition(date.getTime(), 'start')}%` }}
        ></div>
    );
};

export default InlineMarker;
