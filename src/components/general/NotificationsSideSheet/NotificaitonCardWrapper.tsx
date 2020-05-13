import * as React from 'react';
import { NotificationCard, useMarkNotificationsAsSeen } from '@equinor/fusion';
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
    const { isMarkingNotifications, markNotificationsAsSeenAsync } = useMarkNotificationsAsSeen();
    const isSeen = React.useMemo(() => notification.seenByUser, [notification]);

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync([notification]);
        onDiscard(notification);
    }, [onDiscard, markNotificationsAsSeenAsync]);

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
                    <IconButton onClick={() => onDiscard(notification)}>
                        <DeleteIcon outline/>
                    </IconButton>
                }
            />
        </div>
    );
};
export default NotificationCardWrapper;
