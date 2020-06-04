import * as React from 'react';
import { NotificationCard, useNotificationCardActions } from '@equinor/fusion';
import {
    StandardNotificationCard,
    useElevationClassName,
    Button,
    Spinner,
    IconButton,
    CloseIcon,
} from '@equinor/fusion-components';
import classNames from 'classnames';
import * as styles from './styles.less';

type NotificationCardWrapperProps = {
    notification: NotificationCard;
    onDiscard: (card: NotificationCard) => void;
    onShowInList: () => void;
};
let discardNotificationTimeout;

const NotificationCardWrapper: React.FC<NotificationCardWrapperProps> = ({
    notification,
    onDiscard,
    onShowInList,
}) => {
    const [isVisible, setIsVisible] = React.useState<boolean | undefined>();
    const { isMarkingNotification, markNotificationsAsSeenAsync } = useNotificationCardActions(
        notification
    );

    const markNotificationAsSeen = React.useCallback(async () => {
        await markNotificationsAsSeenAsync();
        onDiscard(notification);
    }, [onDiscard, markNotificationsAsSeenAsync]);

    const cardStyles = classNames(styles.notificationWrapper, useElevationClassName(4), {
        [styles.isVisible]: isVisible,
    });

    const startDismissNotificationTimeout = React.useCallback(() => {
        discardNotificationTimeout = setTimeout(
            () => window.requestAnimationFrame(() => setIsVisible(false)),
            5000
        );
    }, []);

    const stopDismissNotificationTimeout = React.useCallback(
        () => clearTimeout(discardNotificationTimeout),
        [discardNotificationTimeout]
    );

    React.useEffect(() => {
        window.requestAnimationFrame(() => setIsVisible(true));
        startDismissNotificationTimeout();
        return () => clearTimeout(discardNotificationTimeout);
    }, []);

    const discardNotification = React.useCallback(() => onDiscard(notification), [
        onDiscard,
        notification,
    ]);

    React.useEffect(() => {
        if (isVisible === false) {
            discardNotification();
        }
    }, [isVisible]);

    const actionableComponents = React.useMemo(
        () => [
            <Button outlined onClick={markNotificationAsSeen}>
                {isMarkingNotification ? <Spinner inline /> : 'Mark as read'}
            </Button>,
            <Button outlined onClick={onShowInList}>
                Show in list
            </Button>,
        ],
        [markNotificationAsSeen, onShowInList, isMarkingNotification]
    );
    const discardComponent = React.useMemo(
        () => (
            <IconButton onClick={discardNotification}>
                <CloseIcon />
            </IconButton>
        ),
        [discardNotification]
    );

    return (
        <div
            className={cardStyles}
            onMouseEnter={stopDismissNotificationTimeout}
            onMouseLeave={startDismissNotificationTimeout}
        >
            <StandardNotificationCard
                notification={notification}
                actionableComponents={actionableComponents}
                discardComponent={discardComponent}
            />
        </div>
    );
};
export default NotificationCardWrapper;
