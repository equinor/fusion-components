import * as React from 'react';
import { NotificationCard, useComponentDisplayClassNames } from '@equinor/fusion';
import * as styles from './styles.less';
import classNames from 'classnames';
import { ExtendedNotificationCard, Button } from '@equinor/fusion-components';

type NotificationCardsProps = {
    notifications: NotificationCard[];
    updateNotifications: (notificationCards: NotificationCard[]) => void;
};
type GradientType = 'top' | 'bottom' | 'topAndBottom' | null;

const NotificationCards: React.FC<NotificationCardsProps> = ({
    notifications,
    updateNotifications,
}) => {
    const [showCards, setShowCards] = React.useState<boolean>(false);
    const notificationCardsRef = React.useRef<HTMLDivElement | null>(null);

    const checkForGradient = React.useCallback((): GradientType => {
        if (!notificationCardsRef.current) {
            return null;
        }

        const pane = notificationCardsRef.current;

        if (pane.scrollTop === 0 && pane.offsetHeight < pane.scrollHeight) {
            return 'bottom';
        }

        if (pane.scrollTop != 0 && pane.scrollTop + pane.offsetHeight < pane.scrollHeight) {
            return 'topAndBottom';
        }
        if (pane.scrollTop != 0 && pane.scrollTop + pane.offsetHeight === pane.scrollHeight) {
            return 'top';
        }
        return null;
    }, [notificationCardsRef.current]);

    const [gradient, setGradient] = React.useState<GradientType>(checkForGradient);

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.showGradientTop]: gradient === 'top' || gradient === 'topAndBottom',
            [styles.showGradientBottom]: gradient === 'bottom' || gradient === 'topAndBottom',
        }
    );

    const removeNotification = React.useCallback(
        (card: NotificationCard) => {
            const updatedNotifications = [...notifications].filter((n) => n.id !== card.id);
            updateNotifications(updatedNotifications);
        },
        [notifications, updateNotifications]
    );

    React.useEffect(() => setGradient(checkForGradient), [showCards]);

    React.useEffect(() => {
        if (notifications.length > 0 && !showCards) {
            setShowCards(true);
        }
        if (!(notificationCardsRef && notificationCardsRef.current)) {
            return;
        }
        notificationCardsRef.current.scrollTop = 0;
    }, [notifications]);

    return (
        <div
            className={containerClassNames}
            ref={notificationCardsRef}
            onScroll={() => setGradient(checkForGradient)}
        >
            <div className={styles.gradientTop} />

            {notifications.map((notification) => (
                <ExtendedNotificationCard
                    notification={notification}
                    onDiscard={removeNotification}
                    actionableComponents={[<Button outlined>Show in list</Button>]}
                />
            ))}

            <div className={styles.gradientBottom} />
        </div>
    );
};
export default NotificationCards;
