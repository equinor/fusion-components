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
import { useCallback, useMemo, FC } from 'react';
import { useStyles } from './NotificationSideSheet.style';

type NotificationCardWrapperProps = {
    notification: NotificationCard;
};

const NotificationCardWrapper: FC<NotificationCardWrapperProps> = ({ notification }) => {
    const {
        isMarkingNotification,
        markNotificationsAsSeenAsync,
        deleteNotificationCard,
        isDeletingNotification,
    } = useNotificationCardActions(notification);

    const styles = useStyles();
    const isSeen = notification.seenByUser;

    const markNotificationAsSeen = useCallback(async () => {
        await markNotificationsAsSeenAsync();
    }, [markNotificationsAsSeenAsync]);

    const removeNotificationCard = useCallback(async () => {
        await deleteNotificationCard();
    }, [deleteNotificationCard]);

    const cardStyles = classNames(styles.notificationWrapper, {
        [styles.unSeen]: !isSeen,
        [useElevationClassName(3)]: !isSeen,
    });

    const actionableComponents = useMemo(
        () =>
            !isSeen
                ? [
                      <Button key="btn-notification-seen" outlined onClick={markNotificationAsSeen}>
                          {isMarkingNotification ? <Spinner inline /> : 'Mark as read'}
                      </Button>,
                  ]
                : [],
        [isSeen, markNotificationAsSeen, isMarkingNotification]
    );

    const discardComponent = useMemo(
        () => (
            <IconButton onClick={removeNotificationCard}>
                {isDeletingNotification ? <Spinner inline /> : <DeleteIcon outline />}
            </IconButton>
        ),
        [isDeletingNotification, removeNotificationCard]
    );

    return (
        <div className={cardStyles}>
            <StandardNotificationCard
                notification={notification}
                actionableComponents={actionableComponents}
                discardComponent={discardComponent}
            />
        </div>
    );
};
export default NotificationCardWrapper;
