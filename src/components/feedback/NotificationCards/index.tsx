import {
    NotificationCard,
    useComponentDisplayClassNames,
    enqueueAsyncOperation,
} from '@equinor/fusion';
import styles from './styles.less';
import classNames from 'classnames';
import NotificationCardWrapper from './NotificationCardWrapper';
import { useRef, useState, useEffect, FC } from 'react';

type NotificationCardsProps = {
    notifications: NotificationCard[];
    onDiscardNotification: (notificationCard: NotificationCard) => void;
    onShowInList: () => void;
};
type GradientType = 'top' | 'bottom' | 'topAndBottom' | null;

const NotificationCards: FC<NotificationCardsProps> = ({
    notifications,
    onDiscardNotification,
    onShowInList,
}) => {
    const notificationCardsRef = useRef<HTMLDivElement | null>(null);

    const [gradient, setGradient] = useState<GradientType | null>(null);

    const checkForGradient = async (abortSignal: AbortSignal) => {
        enqueueAsyncOperation(() => {
            if (!notificationCardsRef.current) {
                return null;
            }

            const pane = notificationCardsRef.current;

            if (pane.scrollTop === 0 && pane.offsetHeight < pane.scrollHeight) {
                setGradient('bottom');
            }

            if (pane.scrollTop != 0 && pane.scrollTop + pane.offsetHeight < pane.scrollHeight) {
                setGradient('topAndBottom');
            }
            if (pane.scrollTop != 0 && pane.scrollTop + pane.offsetHeight === pane.scrollHeight) {
                setGradient('top');
            }
            checkForGradient(abortSignal);
        }, abortSignal).catch(() => {});
    };

    const containerClassNames = classNames(
        styles.container,
        useComponentDisplayClassNames(styles),
        {
            [styles.showGradientTop]: gradient === 'top' || gradient === 'topAndBottom',
            [styles.showGradientBottom]: gradient === 'bottom' || gradient === 'topAndBottom',
        }
    );

    useEffect(() => {
        const abortController = new AbortController();
        checkForGradient(abortController.signal);
        return () => abortController.abort();
    }, [notifications, notificationCardsRef.current]);

    useEffect(() => {
        if (!(notificationCardsRef && notificationCardsRef.current)) {
            return;
        }
        notificationCardsRef.current.scrollTop = 0;
    }, [notifications]);

    return (
        <div className={containerClassNames} ref={notificationCardsRef}>
            <div className={styles.gradientTop} />

            {notifications.map((notification) => (
                <NotificationCardWrapper
                    notification={notification}
                    onDiscard={onDiscardNotification}
                    onShowInList={onShowInList}
                    key={notification.id}
                />
            ))}

            <div className={styles.gradientBottom} />
        </div>
    );
};
export default NotificationCards;
