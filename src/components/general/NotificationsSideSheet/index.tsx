import * as React from 'react';
import * as styles from './styles.less';
import { ModalSideSheet, Chip, Button, Spinner, styling } from '@equinor/fusion-components';
import { NotificationCard, useNotificationCardActions } from '@equinor/fusion';
import NotificationDateDivisions from './NotificationDateDivisions';

type NotificationsSideSheetProps = {
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
    isFetchingNotifications: boolean;
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    open,
    onClose,
    notifications,
    isFetchingNotifications,
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

    const content = React.useMemo(() => {
        if (isFetchingNotifications) {
            return <Spinner centered />;
        }
        if (notifications.length === 0) {
            return <h2>You have no notifications</h2>;
        }
        return (
            <>
                <div className={styles.notifications}>
                    <NotificationDateDivisions notifications={unReadNotifications} />
                </div>
                <div className={styles.notifications}>
                    <h3>Read notifications - last 30 days</h3>
                    <NotificationDateDivisions notifications={readNotifications} />
                </div>
            </>
        );
    }, [isFetchingNotifications, notifications, unReadNotifications, readNotifications]);

    return (
        <ModalSideSheet
            show={open}
            onClose={onClose}
            header="Notifications"
            size="medium"
            isResizable
            maxWidth={styling.numericalGrid(100)}
            minWidth={styling.numericalGrid(50)}
            headerIcons={[
                <div className={styles.chipContainer}>
                    <Chip title={`${unReadNotifications.length} unread`} />
                </div>,
                <Button
                    onClick={() =>
                        unReadNotifications.length > 0 &&
                        markNotificationAsSeen(unReadNotifications)
                    }
                    disabled={unReadNotifications.length <= 0}
                >
                    {isMarkingNotifications ? <Spinner inline /> : 'Mark all as read'}
                </Button>,
            ]}
        >
            <div className={styles.notificationsContainer}>
                <div className={styles.markAllAsReadButton}></div>
                {content}
            </div>
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
