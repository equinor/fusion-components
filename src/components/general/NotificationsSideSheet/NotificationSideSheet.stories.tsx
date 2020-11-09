import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Switch, SearchableDropdownOption, Select } from '@equinor/fusion-components';
import NotificationsSideSheet from "./index";
import withFusionStory from '../../../../.storybook/withFusionStory';
import { useNotificationCards } from '@equinor/fusion';
import * as styles from './styles.less';

const SettingsTab = () => {

    const dropdownOptions = [
        {
            key: '1',
            title: '5 minutes',
            isSelected: true,
        },
        {
            key: '2',
            title: '10 minutes',
        },
        {
            key: '3',
            title: '15 minutes',
        },
        {
            key: '4',
            title: '30 minutes',
        },
        {
            key: '5',
            title: '60 minutes',
        },
    ];

    const [sendEmail, setSendEmail] = React.useState<boolean>(true);
    const [sendNotificationsQuery, setSendNotificationsQuery] = React.useState<boolean>(true);
    const [sendNotificationsReview, setSendNotificationsReview] = React.useState<boolean>(true);
    const [sendNotificationsResourses, setSendNotificationsResourses] = React.useState<boolean>(true);

    const [options, setOptions] = React.useState<SearchableDropdownOption[]>(dropdownOptions);

    const updateOptions = item =>
        options.map(option => {
            return { ...option, isSelected: item.key === option.key };
        });

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.generalHeader}>General </div>
            <div className={styles.row}>
                <Switch
                    active={sendEmail}
                    onChange={() => setSendEmail(!sendEmail)}
                /><div>Send emails</div>

            </div>
            <div className={styles.row}>
                <div className={styles.selectTitle}> Delay emails </div>
                <Select
                    options={options}
                    onSelect={item => setOptions(updateOptions(item))}
                />

            </div>
            <div className={styles.sectionEmail}>App settings</div>
            <div className={styles.row}>
                <Switch
                    active={sendNotificationsQuery}
                    onChange={() => setSendNotificationsQuery(!sendNotificationsQuery)}
                /><div> Query</div>

            </div>
            <div className={styles.row}>
                <Switch
                    active={sendNotificationsReview}
                    onChange={() => setSendNotificationsReview(!sendNotificationsReview)}
                /> <div> Review </div>
            </div>
            <div className={styles.row}>
                <Switch
                    active={sendNotificationsResourses}
                    onChange={() => setSendNotificationsResourses(!sendNotificationsResourses)}
                /> <div> Resources </div>

            </div>
        </div>

    )
}

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
                settings={SettingsTab()}
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
