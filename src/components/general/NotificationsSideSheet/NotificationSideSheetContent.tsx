import * as styles from './styles.less';
import { Button, Spinner, Tab, Tabs, SettingsIcon } from '@equinor/fusion-components';
import { NotificationCard, useGlobalNotificationCardsActions } from '@equinor/fusion';
import NotificationDateDivisions from './NotificationDateDivisions';
import { useState, useCallback, useMemo, FC } from 'react';

type NotificationsSideSheetContentProps = {
    settings: React.ReactElement | null;
    showSettings?: boolean;
    readNotifications: NotificationCard[];
    unReadNotifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

const NotificationsSideSheetContent: FC<NotificationsSideSheetContentProps> = ({
    settings,
    showSettings,
    readNotifications,
    unReadNotifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {
    const [activeTabKey, setActiveTabKey] = useState('unread');
    const changeTabKey = (tabKey) => setActiveTabKey(tabKey);

    const chip = () => {
        if (unReadNotifications.length === 0) {
            return null;
        }
        return <div className={styles.chip}>{unReadNotifications.length.toString()}</div>;
    };
    const {
        isMarkingNotifications,
        markNotificationsAsSeenAsync,
    } = useGlobalNotificationCardsActions();

    const markNotificationAsSeen = useCallback(
        async (notifications: NotificationCard[]) => {
            await markNotificationsAsSeenAsync(notifications);
        },
        [markNotificationsAsSeenAsync]
    );

    const onReadAll = useCallback(
        () => unReadNotifications.length > 0 && markNotificationAsSeen(unReadNotifications),
        [unReadNotifications, markNotificationAsSeen, isMarkingNotifications]
    );

    const unReadNotificatinContent = useMemo(() => {
        if (unReadNotifications.length === 0 && !isFetchingUnReadNotifications) {
            return (
                <div className={styles.noNotificationMessage}>
                    <span>You don't have any unread notifications</span>
                </div>
            );
        }

        if (isFetchingUnReadNotifications) {
            return <Spinner centered />;
        } else {
            return (
                <>
                    <Button onClick={onReadAll} disabled={unReadNotifications.length <= 0}>
                        {isMarkingNotifications ? <Spinner inline /> : 'Mark all as read'}
                    </Button>
                    <NotificationDateDivisions notifications={unReadNotifications} />
                </>
            );
        }
    }, [unReadNotifications, isFetchingUnReadNotifications]);

    const readNotificationContent = useMemo(() => {
        if (readNotifications.length === 0 && !isFetchingReadNotifications) {
            return (
                <div className={styles.noNotificationMessage}>
                    <span>You don't have any dismissed notifications</span>
                </div>
            );
        }
        if (isFetchingReadNotifications) {
            return <Spinner centered />;
        } else {
            return <NotificationDateDivisions notifications={readNotifications} collapsed />;
        }
    }, [readNotifications, isFetchingReadNotifications]);

    return (
        <div className={styles.notificationsContainer}>
            <Tabs activeTabKey={activeTabKey} onChange={changeTabKey}>
                <Tab tabKey={'unread'} title={<div> Unread {chip()}</div>}>
                    <div className={styles.tabContent}>{unReadNotificatinContent}</div>
                </Tab>
                <Tab tabKey={'dismissed'} title={'Dismissed'}>
                    <div className={styles.tabContent}>{readNotificationContent}</div>
                </Tab>
                {showSettings ? (
                    <Tab
                        className={styles.settingsTab}
                        tabKey={'settings'}
                        title={
                            <Button outlined>
                                {' '}
                                Settings <SettingsIcon />{' '}
                            </Button>
                        }
                    >
                        {settings}
                    </Tab>
                ) : (
                    <Tab title="" tabKey="settings"></Tab>
                )}
            </Tabs>
        </div>
    );
};

export default NotificationsSideSheetContent;
