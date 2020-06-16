import React, { useCallback, useEffect, useState } from 'react';

import { NotificationRequest, NotificationResponse, useFusionContext } from '@equinor/fusion';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@equinor/fusion-components';

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
            currentResolver({ cancelled: true, confirmed: false, dismissed: false });
            setCurrentResolver(null);
        }

        reset();
    }, [currentResolver]);

    const onConfirm = useCallback(() => {
        if (currentResolver) {
            currentResolver({ cancelled: false, confirmed: true, dismissed: false });
            setCurrentResolver(null);
        }

        reset();
    }, [currentResolver]);

    const presentDialog = (
        notification: NotificationRequest,
        resolve: (response: NotificationResponse) => void,
        signal: AbortSignal
    ) => {
        if (currentNotification) {
            throw new Error('Unable to present multiple dialogs');
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
                    <div>{currentNotification.body}</div>
                </DialogContent>
                <DialogActions>
                    <Button frameless onClick={onCancel}>
                        {currentNotification.cancelLabel || 'Cancel'}
                    </Button>
                    <Button frameless onClick={onConfirm}>
                        {currentNotification.confirmLabel || 'Ok'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NotificationDialog;
