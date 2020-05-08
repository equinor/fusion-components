import * as React from 'react';
import * as styles from './styles.less';
import {  ModalSideSheet, NotificationCardComponent } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';

type NotificationsSideSheetProps = {
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
};

const NotificationsSideSheet: React.FC<NotificationsSideSheetProps> = ({
    open,
    onClose,
    notifications,
}) => {
    return (
        <ModalSideSheet show={open} onClose={onClose} header="Notifications" size="medium" isResizable>
            <div className={styles.notificationsContainer}>
                {notifications.map((notification) => (
                    <NotificationCardComponent notification={notification} />
                ))}
            </div>
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
