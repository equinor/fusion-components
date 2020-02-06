import React from 'react';
import { useNotificationContext } from '@equinor/fusion';
import NotificationBanner from '../../../core/NotificationBanner';

export default () => {
    const notificationContext = useNotificationContext();
    console.log("BANNER", notificationContext);
    return <NotificationBanner registerPresenter={notificationContext.registerPresenter} />;
};
