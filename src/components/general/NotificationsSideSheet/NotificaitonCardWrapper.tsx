import * as React from 'react';
import { NotificationCard, useNotificationCardActions } from '@equinor/fusion';
import {
    StandardNotificationCard,
    useElevationClassName,
    Button,
    Spinner,
    IconButton,
    DeleteIcon,
} from '@equinor/fusion-components';
import classNames from 'classnames';
import * as styles from './styles.less';

type NotificationCardWrapperProps = {
    notification: NotificationCard;
};

const NotificationCardWrapper: React.FC<NotificationCardWrapperProps> = ({ notification }) => {
    const {
        isMarkingNotifications,
        markNotificationsAsSeenAsync,
        deleteNotificationCard,
        isDeletingNotification,
    } = useNotificationCardActions();
    const isSeen = React.useMemo(() => notification.seenByUser, [notification]);

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync([notification]);
    }, [markNotificationsAsSeenAsync]);

    const removeNotificationCard = React.useCallback(async () => {
        await deleteNotificationCard(notification);
    }, [deleteNotificationCard]);

    const cardStyles = classNames(styles.notificationWrapper, {
        [styles.unSeen]: !isSeen,
        [useElevationClassName(3)]: !isSeen,
    });

    return (
        <div className={cardStyles}>
            <StandardNotificationCard
                notification={notification}
                actionableComponents={
                    !isSeen
                        ? [
                              <Button outlined onClick={markNotificationAsSeen}>
                                  {isMarkingNotifications ? <Spinner inline /> : 'Mark as read'}
                              </Button>,
                          ]
                        : []
                }
                discardComponent={
                    <IconButton onClick={removeNotificationCard}>
                        {isDeletingNotification ? <Spinner inline /> : <DeleteIcon outline />}
                    </IconButton>
                }
            />
        </div>
    );
};
export default NotificationCardWrapper;
