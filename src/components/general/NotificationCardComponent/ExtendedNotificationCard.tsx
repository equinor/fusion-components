import * as React from 'react';
import { NotificationCard, useMarkNotificationsAsSeen } from '@equinor/fusion';
import {
    StandardNotificationCard,
    useElevationClassName,
    Button,
    Spinner,
} from '@equinor/fusion-components';
import * as styles from './styles.less';
import classNames from 'classnames';

type ExtendedNotificationCard = {
    notification: NotificationCard;
    onDiscard: (notificationCard: NotificationCard) => void;
    actionableComponents?: React.ReactNode[];
    showAsUnread?: boolean;
};

const ExtendedNotificationCard: React.FC<ExtendedNotificationCard> = ({
    notification,
    onDiscard,
    actionableComponents,
    showAsUnread,
}) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const { isMarkingNotifications, markNotificationsAsSeenAsync } = useMarkNotificationsAsSeen();

    React.useEffect(() => {
        window.requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const cardStyles = classNames(styles.extendedNotificationCard, useElevationClassName(4), {
        [styles.isVisible]: isVisible,
        [styles.showAsUnread]: showAsUnread
    });

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync([notification]);
        onDiscard(notification);
    }, [markNotificationsAsSeenAsync, onDiscard]);

    return (
        <div className={cardStyles}>
            <StandardNotificationCard
                notification={notification}
                actionableComponents={[
                    <Button outlined onClick={markNotificationAsSeen}>
                        {isMarkingNotifications ? <Spinner inline /> : 'Mark as read'}
                    </Button>,
                    actionableComponents ? [...actionableComponents] : [],
                ]}
                onDiscard={() => onDiscard(notification)}
            />
        </div>
    );
};

export default ExtendedNotificationCard;
