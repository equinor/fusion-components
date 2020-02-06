import React from 'react';
import { useNotificationContext } from '@equinor/fusion';
import NotificationSnacks from '../../../core/NotificationSnacks';

export default () => {
    const notificationContext = useNotificationContext();
    return <NotificationSnacks registerPresenter={notificationContext.registerPresenter} />;
};
