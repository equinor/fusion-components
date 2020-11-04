import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@equinor/fusion-components';
import NotificationSettingsTab from "./NotificationSettingsTab";
import NotificationsSideSheet from "./index";
import withFusionStory from '../../../../.storybook/withFusionStory';
import { useNotificationCards } from '@equinor/fusion';



const NotificationSideSheet = () => {

    const [showSideSheet, setShowSideSheet] = React.useState<boolean>(false);
    const openSideSheet = React.useCallback(() => setShowSideSheet(true), [setShowSideSheet]);
    const closeSideSheet = React.useCallback(() => setShowSideSheet(false), [setShowSideSheet]);

    const {
        notificationCards,
        isFetchingRead,
        isFetchingUnRead,
        getReadNotificationCardsAsync,
    } = useNotificationCards();

    const numberOfUnread = React.useMemo(
        () => notificationCards && notificationCards.filter((notification) => !notification.seenByUser).length,
        [notificationCards]
    );

    return (
        <>
            <Button onClick={openSideSheet}> Open notification side sheet </Button>
            <NotificationsSideSheet
                open={showSideSheet}
                onClose={closeSideSheet}
                settings={NotificationSettingsTab()}
                showSettings
                notifications={notificationCards ? notificationCards : []}
                isFetchingReadNotifications={isFetchingRead}
                isFetchingUnReadNotifications={isFetchingUnRead}
            />
        </>
    );
};

storiesOf('General/NotificationSideSheet', module)
    .addDecorator(withFusionStory('Notification SideSheet'))
    .add('Default', () => <NotificationSideSheet />);
