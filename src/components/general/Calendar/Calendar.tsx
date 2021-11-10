import { useMemo, useState, useCallback, useEffect, FC } from 'react';

import classNames from 'classnames';
import { createCalendar, Month, useComponentDisplayClassNames } from '@equinor/fusion';

import { IconButton, Button, PaginationArrow } from '@equinor/fusion-components';
import Day from './Day';
//import styles from './styles.less';
import { useStyles } from './Calendar.style';

type CalendarProps = {
    initialYear: number;
    initialMonth: Month;
    selectedDate?: Date | null;
    interactive?: boolean;
    onChange?: (date: Date) => void;
};

export const Calendar: FC<CalendarProps> = ({
    initialYear,
    initialMonth,
    selectedDate,
    interactive,
    onChange,
}) => {
    const styles = useStyles();
    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const calendar = useMemo(() => createCalendar(year, month), [year, month]);
    const isCurrentMonth = useMemo(() => calendar.dates.some((d) => d.isToday), [calendar]);
    const weekDays = useMemo(() => calendar.dates.slice(0, 7).map((d) => d.weekDay), [calendar]);

    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    const monthName = useMemo(
        () =>
            new Intl.DateTimeFormat('en-gb', { month: 'long', year: 'numeric' }).format(
                new Date(year, month)
            ),
        [month, year]
    );

    const prevMonth = useCallback(() => {
        if (month === 0) {
            setMonth(11);
            setYear((year) => year - 1);
        } else {
            setMonth((month) => (month - 1) as Month);
        }
    }, [month, year]);

    const nextMonth = useCallback(() => {
        if (month === 11) {
            setMonth(0);
            setYear((year) => year + 1);
        } else {
            setMonth((month) => (month + 1) as Month);
        }
    }, [month, year]);

    const gotoToday = useCallback(() => {
        const today = new Date();
        setMonth(today.getMonth() as Month);
        setYear(today.getFullYear());
    }, []);

    useEffect(() => {
        if (!selectedDate) {
            return;
        }

        setYear(selectedDate.getFullYear());
        setMonth(selectedDate.getMonth() as Month);
    }, [selectedDate]);

    return (
        <div className={containerClassNames}>
            <header className={styles.header}>
                <IconButton onClick={prevMonth}>
                    <PaginationArrow next={false} />
                </IconButton>
                <h4 className={styles.h4}>{monthName}</h4>
                {!isCurrentMonth && (
                    <div className={styles.todayButton}>
                        <Button onClick={gotoToday}>Today</Button>
                    </div>
                )}
                <IconButton onClick={nextMonth}>
                    <PaginationArrow next={true} />
                </IconButton>
            </header>
            <div className={styles.grid}>
                {weekDays.map((weekDay) => (
                    <header
                        style={{
                            background: 'var(--color-black-alt4)',
                        }}
                        key={weekDay}
                    >
                        {weekDay}
                    </header>
                ))}
                {calendar.dates.map((d) => (
                    <Day
                        key={d.value + d.year + d.month}
                        date={d}
                        selectedDate={selectedDate}
                        interactive={interactive}
                        onClick={onChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
