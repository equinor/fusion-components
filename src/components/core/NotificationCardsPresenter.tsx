import * as React from 'react';
import { NotificationCards } from '@equinor/fusion-components';
import { useFusionContext, NotificationCard } from '@equinor/fusion';

type NotificationCardsPresenterProps = {
    onShowInList: () => void;
};

const NotificationCardsPresenter: React.FC<NotificationCardsPresenterProps> = ({
    onShowInList,
}) => {
    const { notificationCenter } = useFusionContext();
    const [notificationCards, setNotificationCards] = React.useState<NotificationCard[]>([]);
    const presentCard = (notificationCard: NotificationCard) => {
        setNotificationCards((cards) => [...cards, notificationCard]);
    };
    React.useEffect(() => {
        return notificationCenter.registerCardPresenter(presentCard);
    }, []);

    const showCardInList = React.useCallback(() => {
        setNotificationCards([]);
        onShowInList();
    }, [onShowInList]);

    const removeNotificationCard = React.useCallback(
        (card: NotificationCard) => {
            const updatedNotifications = [...notificationCards].filter((n) => n.id !== card.id);
            setNotificationCards(updatedNotifications);
        },
        [notificationCards, setNotificationCards]
    );

    if (notificationCards.length <= 0) {
        return null;
    }

    return (
        <NotificationCards
            notifications={notificationCards}
            onDiscardNotification={removeNotificationCard}
            onShowInList={showCardInList}
        />
    );
};

export default NotificationCardsPresenter;
