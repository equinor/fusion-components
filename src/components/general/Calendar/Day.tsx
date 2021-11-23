import classNames from 'classnames';
import { CalendarDate, isSameDate } from '@equinor/fusion';
import { useStyles } from './Calendar.style';
import { IconButton } from '@equinor/fusion-components';
import { FC } from 'react';

type DayProps = {
    date: CalendarDate;
    interactive?: boolean;
    selectedDate?: Date | null;
    onClick?: (date: Date) => void;
};

const Day: FC<DayProps> = ({ date, interactive, onClick, selectedDate }) => {
    const styles = useStyles();
    const dayClassNames = classNames(styles.day, {
        [styles.isToday]: date.isToday,
        [styles.notSelectedMonth]: !date.isSelectedMonth,
    });

    const isSelectedDate = selectedDate && isSameDate(selectedDate, date.date);

    return (
        <span className={dayClassNames}>
            {interactive ? (
                <IconButton
                    active={!!isSelectedDate}
                    disabled={!date.isSelectedMonth}
                    toggler={date.isToday && !isSelectedDate}
                    onClick={() => onClick && onClick(date.date)}
                >
                    {date.value}
                </IconButton>
            ) : (
                date.value
            )}
        </span>
    );
};

export default Day;
