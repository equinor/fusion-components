import { NotificationCards } from '@equinor/fusion-components';
import { useFusionContext, NotificationCard } from '@equinor/fusion';
import { FC, useState, useEffect, useCallback } from 'react';

type NotificationCardsPresenterProps = {
    onShowInList: () => void;
};

const NotificationCardsPresenter: FC<NotificationCardsPresenterProps> = ({ onShowInList }) => {
    const { notificationCenter } = useFusionContext();
    const [notificationCards, setNotificationCards] = useState<NotificationCard[]>([]);
    const presentCard = (notificationCard: NotificationCard) => {
        setNotificationCards((cards) => [...cards, notificationCard]);
    };
    useEffect(() => {
        return notificationCenter.registerCardPresenter(presentCard);
    }, []);

    const showCardInList = useCallback(() => {
        setNotificationCards([]);
        onShowInList();
    }, [onShowInList]);

    const removeNotificationCard = useCallback(
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
