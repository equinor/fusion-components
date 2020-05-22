import * as React from 'react';
import { NotificationCard } from '@equinor/fusion';
import * as styles from './styles.less';
import NotificationCardWrapper from './NotificaitonCardWrapper';
import { Accordion, AccordionItem } from '@equinor/fusion-components';

type NotificationDateDivisionProps = {
    notifications: NotificationCard[];
    collapsed?: boolean;
};

type AccordionOpenDictionary = {
    [id: string]: boolean;
};

type DateDivisionsContainerProps = {
    collapsed?: boolean;
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
        label: 'More than one week ago',
        accessor: (n) =>
            !(
                isNotificationFromLastWeek(n) ||
                isNotificationFromToday(n) ||
                isNotificationFromThisWeek(n)
            ),
        notifications: [],
    },
];

const DateDivisionsContainer: React.FC<DateDivisionsContainerProps> = ({ collapsed, children }) =>
    collapsed ? <Accordion>{children}</Accordion> : <>{children} </>;

const NotificationDateDivisions: React.FC<NotificationDateDivisionProps> = ({
    notifications,
    collapsed,
}) => {
    const [openAccordions, setOpenAccordions] = React.useState<AccordionOpenDictionary>({});

    const handleOpenAccordionChange = React.useCallback(
        (id: string) => {
            setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
        },
        [openAccordions]
    );

    const notificationDivisions = React.useMemo(() => {
        return divisions.map((d) => ({
            ...d,
            notifications: notifications.filter((n) => d.accessor(n)),
        }));
    }, [notifications, divisions]);

    const notificationCardContainer = React.useCallback(
        (notification: NotificationCard, division: DateDivision) => {
            const card = <NotificationCardWrapper notification={notification} />;
            if (collapsed) {
                const id = notification.id;
                return (
                    <AccordionItem
                        actionDirection="right"
                        onChange={() => handleOpenAccordionChange(id)}
                        key={id}
                        isOpen={openAccordions[id]}
                        label={notification.title}
                    >
                        {openAccordions[id] ? card : null}
                    </AccordionItem>
                );
            }
            return (
                <React.Fragment key={notification.id}>
                    {division.key === 'today' && (
                        <span className={styles.dateMarker}>
                            Today {get24HTime(new Date(notification.created))}
                        </span>
                    )}
                    {card}
                </React.Fragment>
            );
        },
        [handleOpenAccordionChange, openAccordions]
    );

    return (
        <DateDivisionsContainer collapsed={collapsed}>
            {notificationDivisions.map(
                (division) =>
                    division.notifications.length > 0 && (
                        <div className={styles.division} key={division.key}>
                            {(division.key !== 'today' || collapsed) && (
                                <span className={styles.dateMarker}>{division.label}</span>
                            )}
                            {division.notifications.map((notification) =>
                                notificationCardContainer(notification, division)
                            )}
                        </div>
                    )
            )}
        </DateDivisionsContainer>
    );
};

export default NotificationDateDivisions;
