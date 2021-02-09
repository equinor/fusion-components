import { ModalSideSheet, styling } from '@equinor/fusion-components';
import { NotificationCard } from '@equinor/fusion';
import NotificationsSideSheetContent from './NotificationSideSheetContent';
import { useMemo, FC, ReactElement } from 'react';

type NotificationsSideSheetProps = {
    settings: ReactElement | null;
    showSettings?: boolean;
    open: boolean;
    onClose: () => void;
    notifications: NotificationCard[];
    isFetchingReadNotifications: boolean;
    isFetchingUnReadNotifications: boolean;
};

const NotificationsSideSheet: FC<NotificationsSideSheetProps> = ({
    settings,
    showSettings,
    open,
    onClose,
    notifications,
    isFetchingReadNotifications,
    isFetchingUnReadNotifications,
}) => {
    const unReadNotifications = useMemo(
        () =>
            [...notifications]
                .filter((n) => !n.seenByUser)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
        [notifications]
    );

    const readNotifications = useMemo(
        () =>
            [...notifications]
                .filter((n) => n.seenByUser)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
        [notifications]
    );

    return (
        <ModalSideSheet
            show={open}
            onClose={onClose}
            header="Notifications"
            size="medium"
            isResizable
            maxWidth={styling.numericalGrid(100)}
            minWidth={styling.numericalGrid(50)}
        >
            <NotificationsSideSheetContent
                showSettings={showSettings}
                settings={settings}
                readNotifications={readNotifications}
                unReadNotifications={unReadNotifications}
                isFetchingReadNotifications={isFetchingReadNotifications}
                isFetchingUnReadNotifications={isFetchingUnReadNotifications}
            />
        </ModalSideSheet>
    );
};

export default NotificationsSideSheet;
