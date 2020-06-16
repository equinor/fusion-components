import * as React from 'react';
import {
    IconButton,
    useIcon,
    IconProps,
    NotificationsIcon,
    styling,
    NotificationsSideSheet,
    OverlayPortal,
} from '@equinor/fusion-components';
import * as styles from './styles.less';
import classNames from 'classnames';
import { useComponentDisplayClassNames, useNotificationCards } from '@equinor/fusion';
import NotificationCardsPresenter from '../../../NotificationCardsPresenter';

type NotificationNumberBadgeProps = IconProps & {
    numberOfUnread: number;
};

const NotificationNumberBadge = (props: NotificationNumberBadgeProps) => {
    const iconFactory = useIcon(
        <>
            <circle cx="12" cy="12" r="12" fill={styling.colors.danger} />
            <text x="50%" y="50%" textAnchor="middle" stroke="white" strokeWidth="1px" dy=".3em">
                {props.numberOfUnread}
            </text>
        </>
    );

    return iconFactory(props);
};
const NotificationsButton: React.FC = () => {
    const [showSideSheet, setShowSideSheet] = React.useState<boolean>(false);
    const [hasOpenedSideSheet, setHasOpenedSideSheet] = React.useState<boolean>(false);

    const {
        notificationCards,
        isFetchingRead,
        isFetchingUnRead,
        getReadNotificationCardsAsync,
    } = useNotificationCards();

    const numberOfUnread = React.useMemo(
        () => notificationCards.filter((notification) => !notification.seenByUser).length,
        [notificationCards]
    );
    const badgeClassNames = classNames(
        styles.badgeContainer,
        useComponentDisplayClassNames(styles)
    );

    React.useEffect(() => {
        if (showSideSheet) {
            setHasOpenedSideSheet(true);
        }
    }, [showSideSheet]);

    const openSideSheet = React.useCallback(() => setShowSideSheet(true), [setShowSideSheet]);
    const closeSideSheet = React.useCallback(() => setShowSideSheet(false), [setShowSideSheet]);

    React.useEffect(() => {
        hasOpenedSideSheet && getReadNotificationCardsAsync();
    }, [hasOpenedSideSheet]);

    return (
        <>
            <IconButton onClick={openSideSheet}>
                <div className={styles.notificationsButton}>
                    <NotificationsIcon />
                    {numberOfUnread > 0 && (
                        <div className={badgeClassNames}>
                            <NotificationNumberBadge
                                numberOfUnread={numberOfUnread}
                                width={styling.numericalGrid(3)}
                                height={styling.numericalGrid(3)}
                            />
                        </div>
                    )}
                </div>
            </IconButton>
            <NotificationsSideSheet
                open={showSideSheet}
                onClose={closeSideSheet}
                notifications={notificationCards}
                isFetchingReadNotifications={isFetchingRead}
                isFetchingUnReadNotifications={isFetchingUnRead}
            />
            <OverlayPortal show>
                <NotificationCardsPresenter onShowInList={openSideSheet} />
            </OverlayPortal>
        </>
    );
};

export default NotificationsButton;
