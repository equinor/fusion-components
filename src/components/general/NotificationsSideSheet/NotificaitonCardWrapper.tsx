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
    onDiscard: (card: NotificationCard) => void;
};

const NotificationCardWrapper: React.FC<NotificationCardWrapperProps> = ({
    notification,
    onDiscard,
}) => {
    const {
        isMarkingNotifications,
        markNotificationsAsSeenAsync,
        deleteNotificationCard,
        isDeletingNotification,
    } = useNotificationCardActions();
    const isSeen = React.useMemo(() => notification.seenByUser, [notification]);

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync([notification]);
        onDiscard(notification);
    }, [onDiscard, markNotificationsAsSeenAsync]);

    const removeNotificationCard = React.useCallback(async () => {
        await deleteNotificationCard(notification);
        onDiscard(notification);
    }, [deleteNotificationCard, onDiscard]);

    const cardStyles = classNames(styles.notificationWrapper, useElevationClassName(4), {
        [styles.unSeen]: !isSeen,
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
