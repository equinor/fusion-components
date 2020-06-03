import * as React from 'react';
import * as styles from './styles.less';
import { ModalSideSheet, Chip, Button, Spinner, styling } from '@equinor/fusion-components';
import { NotificationCard, useGlobalNotificationCardsActions } from '@equinor/fusion';
import NotificationDateDivisions from './NotificationDateDivisions';

type NotificationsSideSheetProps = {
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

type NotificationsSideSheetContentProps = {
    readNotifications: NotificationCard[];
    unReadNotifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

const NotificationsSideSheetContent: React.FC<NotificationsSideSheetContentProps> = ({
    readNotifications,
    unReadNotifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {
    if (
        readNotifications.length === 0 &&
        unReadNotifications.length === 0 &&
        !(isFetchingReadNotifications || isFetchingUnReadNotifications)
    ) {
        return <div className={styles.noNotificationMessage}>
            <span>You don't have any notifications</span>
            </div>;
    }
    return (
        <>
            <div className={styles.notifications}>
                {isFetchingUnReadNotifications ? (
                    <Spinner centered />
                ) : (
                    <NotificationDateDivisions notifications={unReadNotifications} />
                )}
            </div>
            <div className={styles.notifications}>
                <div className={styles.divisionTitle}>
                    <h3>Dismissed notifications - last 30 days</h3>
                </div>
                {isFetchingReadNotifications ? (
                    <Spinner centered />
                ) : (
                    <NotificationDateDivisions notifications={readNotifications} collapsed />
                )}
            </div>
        </>
    );
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    open,
    onClose,
    notifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {
    const {
        isMarkingNotifications,
        markNotificationsAsSeenAsync,
    } = useGlobalNotificationCardsActions();

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

    const sideSheetHeaderIcons = React.useMemo(
        () => [
            <div className={styles.chipContainer}>
                <Chip title={`${unReadNotifications.length} unread`} />
            </div>,
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
            </div>,
        ],
        [unReadNotifications, markNotificationAsSeen, isMarkingNotifications]
    );

    return (
        <ModalSideSheet
            show={open}
            onClose={onClose}
            header="Notifications"
            size="medium"
            isResizable
            maxWidth={styling.numericalGrid(100)}
            minWidth={styling.numericalGrid(50)}
            headerIcons={sideSheetHeaderIcons}
        >
            <div className={styles.notificationsContainer}>
                <NotificationsSideSheetContent
                    readNotifications={readNotifications}
                    unReadNotifications={unReadNotifications}
                    isFetchingReadNotifications={isFetchingReadNotifications}
                    isFetchingUnReadNotifications={isFetchingUnReadNotifications}
                />
            </div>
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
