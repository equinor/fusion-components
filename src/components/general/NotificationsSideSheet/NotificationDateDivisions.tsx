import { Fragment, FunctionComponent, useCallback, useMemo, useState } from 'react';

import { NotificationCard } from '@equinor/fusion';
//import styles from './styles.less';
import { useStyles } from './NotificationSideSheet.style';

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

type DateDivisionKey = 'today' | 'this-week' | 'last-week' | 'more-than-one-week';

type DateDivision = {
    key: DateDivisionKey;
    label: string;
    accessor: (notification: NotificationCard) => boolean;
    notifications: NotificationCard[];
};

type NotificationCardContainerProps = {
    notification: NotificationCard;
    openAccordions: AccordionOpenDictionary;
    handleOpenAccordionChange: (accordionId: string) => void;
    divisionKey: DateDivisionKey;
    collapsed?: boolean;
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

const DateDivisionsContainer: FunctionComponent<DateDivisionsContainerProps> = ({
    collapsed,
    children,
}) => (collapsed ? <Accordion>{children}</Accordion> : <Fragment>{children} </Fragment>);

const NotificationCardContainer: FunctionComponent<NotificationCardContainerProps> = ({
    notification,
    collapsed,
    openAccordions,
    divisionKey,
    handleOpenAccordionChange,
}) => {
    const card = <NotificationCardWrapper notification={notification} />;
    const styles = useStyles();
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
        <Fragment key={notification.id}>
            {divisionKey === 'today' && (
                <span className={styles.dateMarker}>
                    Today {get24HTime(new Date(notification.created))}
                </span>
            )}
            {card}
        </Fragment>
    );
};

const NotificationDateDivisions: FunctionComponent<NotificationDateDivisionProps> = ({
    notifications,
    collapsed,
}) => {
    const styles = useStyles();
    const [openAccordions, setOpenAccordions] = useState<AccordionOpenDictionary>({});

    const handleOpenAccordionChange = useCallback(
        (id: string) => {
            setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
        },
        [openAccordions]
    );

    const notificationDivisions = useMemo(() => {
        return divisions.map((d) => ({
            ...d,
            notifications: notifications.filter((n) => d.accessor(n)),
        }));
    }, [notifications, divisions]);

    return (
        <DateDivisionsContainer collapsed={collapsed}>
            {notificationDivisions.map(
                (division) =>
                    division.notifications.length > 0 && (
                        <div className={styles.division} key={division.key}>
                            {(division.key !== 'today' || collapsed) && (
                                <span className={styles.dateMarker}>{division.label}</span>
                            )}
                            {division.notifications.map((notification, index) => (
                                <NotificationCardContainer
                                    key={notification.id}
                                    notification={notification}
                                    divisionKey={division.key}
                                    handleOpenAccordionChange={handleOpenAccordionChange}
                                    openAccordions={openAccordions}
                                    collapsed={collapsed}
                                />
                            ))}
                        </div>
                    )
            )}
        </DateDivisionsContainer>
    );
};

export default NotificationDateDivisions;
