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
    const [openSideSheet, setOpenSideSheet] = React.useState<boolean>(false);
    const { notificationCards, isFetching } = useNotificationCards();

    const numberOfUnread = React.useMemo(
        () => notificationCards.filter((notification) => !notification.seenByUser).length,
        [notificationCards]
    );
    const badgeClassNames = classNames(
        styles.badgeContainer,
        useComponentDisplayClassNames(styles)
    );

    return (
        <>
            <IconButton onClick={() => setOpenSideSheet(true)}>
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
                open={openSideSheet}
                onClose={() => setOpenSideSheet(false)}
                notifications={notificationCards}
                isFetchingNotifications={isFetching}
            />
            <OverlayPortal show>
                <NotificationCardsPresenter onShowInList={() => setOpenSideSheet(true)} />
            </OverlayPortal>
        </>
    );
};

export default NotificationsButton;
