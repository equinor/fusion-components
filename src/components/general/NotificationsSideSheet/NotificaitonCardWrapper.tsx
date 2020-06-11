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
        isMarkingNotification,
        markNotificationsAsSeenAsync,
        deleteNotificationCard,
        isDeletingNotification,
    } = useNotificationCardActions(notification);

    const isSeen = notification.seenByUser;

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync();
    }, [markNotificationsAsSeenAsync]);

    const removeNotificationCard = React.useCallback(async () => {
        await deleteNotificationCard();
    }, [deleteNotificationCard]);

    const cardStyles = classNames(styles.notificationWrapper, {
        [styles.unSeen]: !isSeen,
        [useElevationClassName(3)]: !isSeen,
    });

    const actionableComponents = React.useMemo(
        () =>
            !isSeen
                ? [
                      <Button outlined onClick={markNotificationAsSeen}>
                          {isMarkingNotification ? <Spinner inline /> : 'Mark as read'}
                      </Button>,
                  ]
                : [],
        [isSeen, markNotificationAsSeen, isMarkingNotification]
    );

    const discardComponent = React.useMemo(
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
