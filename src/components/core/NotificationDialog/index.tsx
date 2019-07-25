import React, { useEffect, useState, useCallback } from 'react';

import { useFusionContext, NotificationRequest, NotificationResponse } from '@equinor/fusion';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'index';

import styles from './styles.less';

const NotificationDialog: React.FC = () => {
    const { notificationCenter } = useFusionContext();
    const [currentNotification, setCurrentNotification] = useState<NotificationRequest | null>(
        null
    );
    const [currentResolver, setCurrentResolver] = useState<
        ((response: NotificationResponse) => void) | null
    >(null);
    const [currentAbortSignal, setCurrentAbortSignal] = useState<AbortSignal | null>(null);

    const reset = useCallback(() => {
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

    const onConfirm = useCallback(() => {
        if (currentResolver) {
            currentResolver({ dismissed: false, cancelled: false, confirmed: true });
            setCurrentResolver(null);
        }

        reset();
    }, [currentResolver]);

    const presentDialog = (
        notification: NotificationRequest,
        resolve: (response: NotificationResponse) => void,
        signal: AbortSignal
    ) => {
        if(currentNotification) {
            throw new Error("Unable to present multiple dialogs");
        }

        setCurrentNotification(notification);
        setCurrentResolver(() => resolve);
        setCurrentAbortSignal(signal);
    };

    useEffect(() => {
        return notificationCenter.registerPresenter('high', presentDialog);
    }, [currentResolver]);

    if (!currentNotification || !currentAbortSignal || !currentResolver) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Dialog>
                <DialogTitle>{currentNotification.title}</DialogTitle>
                <DialogContent>
                    <p>
                        {currentNotification.body}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button frameless onClick={onCancel}>Cancel</Button>
                    <Button frameless onClick={onConfirm}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NotificationDialog;
