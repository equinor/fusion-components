import * as React from 'react';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';
import NotificationCardWrapper from './NotificaitonCardWrapper';

type NotificationDateDivisionProps = {
    notifications: NotificationCard[];
};

type DateDivision = {
    key: string;
    label: string;
    accessor: (notification: NotificationCard) => boolean;
    notifications: NotificationCard[];
};

const getMonday = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

const get24HTime = (date: Date) => {
    const d = new Date(date);
    const min = d.getMinutes();
    return `${d.getHours()}:${min.toString().length === 1 ? '0' + min : min}`;
};

const isNotificationFromToday = (notification: NotificationCard) =>
    !!(new Date(notification.created).toDateString() === new Date().toDateString());

const isNotificationFromThisWeek = (notification: NotificationCard) =>
    !!(
        getMonday(new Date(notification.created)).toDateString() ===
        getMonday(new Date()).toDateString()
    );

const isNotificationFromLastWeek = (notification: NotificationCard) =>
    !!(
        getMonday(new Date(notification.created)).toDateString() ===
        getMonday(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toDateString()
    );
const divisions: DateDivision[] = [
    {
        key: 'today',
        label: 'Today',
        accessor: (n) => isNotificationFromToday(n),
        notifications: [],
    },
    {
        key: 'this-week',
        label: 'This week',
        accessor: (n) => isNotificationFromThisWeek(n) && !isNotificationFromToday(n),
        notifications: [],
    },
    {
        key: 'last-week',
        label: 'Last week',
        accessor: (n) => isNotificationFromLastWeek(n),
        notifications: [],
    },
    {
        key: 'more-than-one-week',
        label: 'More than one week',
        accessor: (n) =>
            !(
                isNotificationFromLastWeek(n) ||
                isNotificationFromToday(n) ||
                isNotificationFromThisWeek
            ),
        notifications: [],
    },
];

const NotificationDateDivisions: React.FC<NotificationDateDivisionProps> = ({ notifications }) => {
    const notificationDivisions = React.useMemo(() => {
        return divisions.map((d) => ({
            ...d,
            notifications: notifications.filter((n) => d.accessor(n)),
        }));
    }, [notifications, divisions]);

    return (
        <>
            {notificationDivisions.map(
                (division) =>
                    division.notifications.length > 0 && (
                        <div className={styles.division} key={division.key}>
                            {division.key !== 'today' && (
                                <span className={styles.dateMarker}>{division.label}</span>
                            )}
                            {division.notifications.map((notification) => (
                                <React.Fragment key={notification.id}>
                                    {division.key === 'today' && (
                                        <span className={styles.dateMarker}>
                                            Today {get24HTime(new Date(notification.created))}
                                        </span>
                                    )}
                                    <NotificationCardWrapper
                                        notification={notification}
                                        onDiscard={() => {}}

                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    )
            )}
        </>
    );
};

export default NotificationDateDivisions;
