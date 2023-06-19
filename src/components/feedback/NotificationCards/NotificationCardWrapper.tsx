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
import { useState, useCallback, useEffect, useMemo, FC } from 'react';
import styles from './styles.less';

type NotificationCardWrapperProps = {
    notification: NotificationCard;
    onDiscard: (card: NotificationCard) => void;
    onShowInList: () => void;
};
let discardNotificationTimeout;

const NotificationCardWrapper: FC<NotificationCardWrapperProps> = ({
    notification,
    onDiscard,
    onShowInList,
}) => {
    const [isVisible, setIsVisible] = useState<boolean | undefined>();
    const { isMarkingNotification, markNotificationsAsSeenAsync } =
        useNotificationCardActions(notification);

    const markNotificationAsSeen = useCallback(async () => {
        await markNotificationsAsSeenAsync();
        onDiscard(notification);
    }, [onDiscard, markNotificationsAsSeenAsync]);

    const cardStyles = classNames(styles.notificationWrapper, useElevationClassName(4), {
        [styles.isVisible]: isVisible,
    });

    const startDismissNotificationTimeout = useCallback(() => {
        discardNotificationTimeout = setTimeout(
            () => window.requestAnimationFrame(() => setIsVisible(false)),
            5000
        );
    }, []);

    const stopDismissNotificationTimeout = useCallback(
        () => clearTimeout(discardNotificationTimeout),
        [discardNotificationTimeout]
    );

    useEffect(() => {
        window.requestAnimationFrame(() => setIsVisible(true));
        startDismissNotificationTimeout();
        return () => clearTimeout(discardNotificationTimeout);
    }, []);

    const discardNotification = useCallback(
        () => onDiscard(notification),
        [onDiscard, notification]
    );

    useEffect(() => {
        if (isVisible === false) {
            discardNotification();
        }
    }, [isVisible]);

    const actionableComponents = useMemo(
        () => [
            <Button key={'markNotificationAsSeen'} outlined onClick={markNotificationAsSeen}>
                {isMarkingNotification ? <Spinner inline /> : 'Mark as read'}
            </Button>,
            <Button key={'onShowInList'} outlined onClick={onShowInList}>
                Show in list
            </Button>,
        ],
        [markNotificationAsSeen, onShowInList, isMarkingNotification]
    );
    const discardComponent = useMemo(
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
