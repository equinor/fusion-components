import * as React from 'react';
import * as styles from './styles.less';
import { ModalSideSheet, Chip, Button, Spinner } from '@equinor/fusion-components';
import { NotificationCard, useNotificationCardActions, formatDate } from '@equinor/fusion';
import NotificationDateDivisions from './NotificationDateDivisions';

type NotificationsSideSheetProps = {
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    open,
    onClose,
    notifications,
}) => {
    const { isMarkingNotifications, markNotificationsAsSeenAsync } = useNotificationCardActions();

    const markNotificationAsSeen = React.useCallback(
        async (notifications: NotificationCard[]) => {
            await markNotificationsAsSeenAsync(notifications);
        },
        [markNotificationsAsSeenAsync]
    );

    const unReadNotifications = React.useMemo(
        () =>
            [...notifications]
                .filter((n) => !n.seenByUser)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
        [notifications]
    );

    const readNotifications = React.useMemo(
        () =>
            [...notifications]
                .filter((n) => n.seenByUser)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
        [notifications]
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
                    <Chip title={`${unReadNotifications.length} unread`} />
                </div>,
            ]}
        >
            <div className={styles.notificationsContainer}>
                <div className={styles.markAllAsReadButton}>
                    <Button
                        onClick={() =>
                            unReadNotifications.length > 0 &&
                            markNotificationAsSeen(unReadNotifications)
                        }
                        disabled={unReadNotifications.length <= 0}
                    >
                        {isMarkingNotifications ? <Spinner inline /> : 'Mark all as read'}
                    </Button>
                </div>
                {notifications.length === 0 ? (
                    <h2>You have no notifications</h2>
                ) : (
                    <>
                        <div className={styles.notifications}>
                            <NotificationDateDivisions notifications={unReadNotifications} />
                        </div>
                        <div className={styles.notifications}>
                            <h3>Read notifications - last 30 days</h3>
                            <NotificationDateDivisions notifications={readNotifications} />
                        </div>
                    </>
                )}
            </div>
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
