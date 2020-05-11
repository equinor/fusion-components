import * as React from 'react';
import * as styles from './styles.less';
import {
    ModalSideSheet,
    Chip,
    Button,
    Spinner,
    ExtendedNotificationCard,
} from '@equinor/fusion-components';
import { NotificationCard, useMarkNotificationsAsSeen, formatDate } from '@equinor/fusion';

type NotificationsSideSheetProps = {
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
    numberOfUnread: number;
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    open,
    onClose,
    notifications,
    numberOfUnread,
}) => {
    const { isMarkingNotifications, markNotificationsAsSeenAsync } = useMarkNotificationsAsSeen();

    const markNotificationAsSeen = React.useCallback(
        async (notifications: NotificationCard[]) => {
            await markNotificationsAsSeenAsync(notifications);
        },
        [markNotificationsAsSeenAsync]
    );

    return (
        <ModalSideSheet
            show={open}
            onClose={onClose}
            header="Notifications"
            size="medium"
            isResizable
            headerIcons={[
                <div className={styles.chipContainer}>
                    <Chip title={`${numberOfUnread} unread`} />
                </div>,
            ]}
        >
            <div className={styles.notificationsContainer}>
                <div className={styles.markAllAsReadButton}>
                    <Button onClick={() => markNotificationAsSeen(notifications)}>
                        {isMarkingNotifications ? <Spinner inline /> : 'Mark all as read'}
                    </Button>
                </div>
                {notifications.map((notification) => (
                    <div className={styles.cardContainer}>
                        <div className={styles.dateMarker}>{formatDate(notification.created)}</div>
                        <ExtendedNotificationCard
                            notification={notification}
                            onDiscard={() => {}}
                            showAsUnread={!notification.seenByUser}
                        />
                    </div>
                ))}
            </div>
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
