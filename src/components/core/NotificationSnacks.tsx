import React, { useEffect, useState, useCallback } from 'react';

import { useFusionContext, NotificationRequest, NotificationResponse } from '@equinor/fusion';
import { Snackbar } from 'index';

const NotificationSnacks: React.FC = () => {
    const { notificationCenter } = useFusionContext();
    const [currentNotification, setCurrentNotification] = useState<NotificationRequest | null>(
        null
    );
    const [currentResolver, setCurrentResolver] = useState<
        ((response: NotificationResponse) => void) | null
    >(null);
    const [currentAbortSignal, setCurrentAbortSignal] = useState<AbortSignal | null>(null);

    const reset = useCallback(() => {
        if (currentResolver) {
            currentResolver({ dismissed: true, cancelled: false, confirmed: false });
        }

        setCurrentNotification(null);
        setCurrentResolver(null);
        setCurrentAbortSignal(null);
    }, [currentResolver]);

    const onCancel = useCallback(() => {
        if (currentResolver) {
            currentResolver({ dismissed: false, cancelled: true, confirmed: false });
            setCurrentResolver(null);
        }

        reset();
    }, [currentResolver]);

    const presentSnackbar = (
        notification: NotificationRequest,
        resolve: (response: NotificationResponse) => void,
        signal: AbortSignal
    ) => {
        reset();

        setCurrentNotification(notification);
        setCurrentResolver(() => resolve);
        setCurrentAbortSignal(signal);
    };

    useEffect(() => {
        return notificationCenter.registerPresenter('low', presentSnackbar);
    }, [currentResolver]);

    if (!currentNotification || !currentAbortSignal || !currentResolver) {
        return null;
    }

    return (
        <Snackbar
            message={currentNotification.title}
            cancellable={!!currentNotification.cancelLabel}
            cancelLabel={currentNotification.cancelLabel}
            onCancel={onCancel}
            abortSignal={currentAbortSignal}
            onDismiss={reset}
        />
    );
};

export default NotificationSnacks;