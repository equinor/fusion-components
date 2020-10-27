import * as React from 'react';
import * as styles from './styles.less';
import { ModalSideSheet, Chip, Button, Spinner, styling, Tab, Tabs, SettingsIcon } from '@equinor/fusion-components';
import { NotificationCard, useGlobalNotificationCardsActions } from '@equinor/fusion';
import NotificationDateDivisions from './NotificationDateDivisions';

type NotificationsSideSheetProps = {
    settings: React.ReactElement | null;
    showSettings?: boolean;
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

type NotificationsSideSheetContentProps = {
    settings: React.ReactElement | null;
    showSettings?: boolean;
    readNotifications: NotificationCard[];
    unReadNotifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

const NotificationsSideSheetContent: React.FC<NotificationsSideSheetContentProps> = ({
    settings,
    showSettings,
    readNotifications,
    unReadNotifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {
    const [activeTabKey, setActiveTabKey] = React.useState('unread');
    const changeTabKey = tabKey => setActiveTabKey(tabKey);

    const chip = () => {
        if (unReadNotifications.length === 0) {
            return null;
        }
        return <div className={styles.chip}>{unReadNotifications.length.toString()}</div>
    }
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

    const onReadAll = React.useCallback(() =>
        unReadNotifications.length > 0 &&
        markNotificationAsSeen(unReadNotifications),

        [unReadNotifications, markNotificationAsSeen, isMarkingNotifications]);

    return (
        <div className={styles.notificationsContainer}>
            <Tabs activeTabKey={activeTabKey} onChange={changeTabKey}>
                <Tab tabKey={"unread"} title={<div> Unread {chip()}</div>}>
                    <div className={styles.tabContent}>
                        {unReadNotifications.length === 0 &&
                            !(isFetchingUnReadNotifications) ? (
                                <div className={styles.noNotificationMessage}>
                                    <span>You don't have any unread notifications</span>
                                    </div>
                            ) : (isFetchingUnReadNotifications ? (
                                <Spinner centered />
                            ) : (
                                    <>
                                        <Button
                                            onClick={onReadAll}
                                            disabled={unReadNotifications.length <= 0}
                                        >
                                            {isMarkingNotifications ? <Spinner inline /> : 'Mark all as read'}
                                        </Button>
                                    <NotificationDateDivisions notifications={unReadNotifications} />
                                    </>
                                ))}
                    </div>
                </Tab>
                <Tab tabKey={"dismissed"} title={"Dismissed"}>
                    <div className={styles.tabContent}>
                        {readNotifications.length === 0 &&
                            !(isFetchingReadNotifications) ? (
                                <div className={styles.noNotificationMessage}>
                                    <span>You don't have any dismissed notifications</span>
                                </div>
                            ) : (isFetchingReadNotifications ? (
                            <Spinner centered />
                        ) : (
                            <NotificationDateDivisions notifications={readNotifications} collapsed />
                                ))}
                    </div>
                </Tab>
                {showSettings ? (
                    <Tab className={styles.settingsTab} tabKey={"settings"} title={<Button outlined> Settings <SettingsIcon /> </Button>}>
                        {settings}
                    </Tab>) : <Tab title="" tabKey="settings"></Tab>}
            </Tabs>
        </div>
    );
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    settings,
    showSettings,
    open,
    onClose,
    notifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {

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
            maxWidth={styling.numericalGrid(100)}
            minWidth={styling.numericalGrid(50)}
        >
            <NotificationsSideSheetContent
                showSettings={showSettings}
                settings={settings}
                readNotifications={readNotifications}
                unReadNotifications={unReadNotifications}
                isFetchingReadNotifications={isFetchingReadNotifications}
                isFetchingUnReadNotifications={isFetchingUnReadNotifications}
            />
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
