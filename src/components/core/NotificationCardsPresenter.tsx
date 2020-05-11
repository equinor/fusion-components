import * as React from "react";
import { NotificationCards } from '@equinor/fusion-components';
import { useFusionContext, NotificationCard } from '@equinor/fusion';

const NotificationCardsPresenter: React.FC = () => {
    const { notificationCenter } = useFusionContext();
    const [notificationCards, setNotificationCards] = React.useState<NotificationCard[]>(
      []
    );
    const presentCard = (notificationCard: NotificationCard) => {
        setNotificationCards((cards) => [...cards, notificationCard]);
    }
    React.useEffect(() => {
        return notificationCenter.registerCardPresenter(presentCard);
    }, []);

    if(notificationCards.length <= 0) {
        return null
    }

    return <NotificationCards notifications={notificationCards} updateNotifications={setNotificationCards}/>
   
}

export default NotificationCardsPresenter;