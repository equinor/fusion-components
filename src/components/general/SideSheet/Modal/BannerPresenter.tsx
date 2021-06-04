import { useNotificationContext } from '@equinor/fusion';
import NotificationBanner from '../../../core/NotificationBanner';

export default () => {
    const notificationContext = useNotificationContext();
    return <NotificationBanner registerPresenter={notificationContext.registerPresenter} />;
};
