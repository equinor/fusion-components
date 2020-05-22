import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import NotificationCards from '.';
import { NotificationCard } from '@equinor/fusion';

const payload: NotificationCard = {
        id: '284f7e5f-0f7d-4b14-8876okpok-a02e5969174e',
        targetAzureUniqueId: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
        title: 'Query test',
        card: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.2',
            body: [
                {
                    type: 'Container',
                    items: [
                        {
                            type: 'ColumnSet',
                            columns: [
                                {
                                    type: 'Column',
                                    width: 'auto',
                                    items: [
                                        {
                                            type: 'Image',
                                            altText: '',
                                            url:
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE4IDE1Ljc1di01YzAtMy4wNy0xLjYzLTUuNjQtNC41LTYuMzJ2LS42OGMwLS44My0uNjctMS41LTEuNS0xLjVzLTEuNS42Ny0xLjUgMS41di42OEM3LjY0IDUuMTEgNiA3LjY3IDYgMTAuNzV2NWwtMiAydjFoMTZ2LTFsLTItMnptLTYgNmMxLjEgMCAyLS45IDItMmgtNGMwIDEuMS45IDIgMiAyem0tNC01aDh2LTZjMC0yLjQ4LTEuNTEtNC41LTQtNC41cy00IDIuMDItNCA0LjV2NnoiLz48L3N2Zz4=',
                                            size: 'Small',
                                        },
                                    ],
                                },
                                {
                                    type: 'Column',
                                    width: 'stretch',
                                    items: [
                                        {
                                            type: 'TextBlock',
                                            text: 'Query test',
                                            size: 'Medium',
                                            weight: 'Bolder',
                                        },
                                        {
                                            type: 'TextBlock',
                                            text: 'You have created a new query',
                                            wrap: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'TextBlock',
                    text: 'Tuesday, May 5, 2020',
                    size: 'Small',
                    weight: 'Lighter',
                    horizontalAlignment: 'Right',
                },
            ],
        },
        created: new Date(),
        createdBy: {
            id: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
            name: 'Eskil Lindløv Sand',
            jobTitle: 'X-Bouvet AS,Stavanger (PX)',
            mail: 'ESLSA@equinor.com',
            accountType: 'Consultant',
        },
        createdByApplication: {
            id: '5a842df8-3238-415d-b168-9f16a6a6031b',
            title: '5a842df8-3238-415d-b168-9f16a6a6031b',
        },
        seenByUser: false,
        seen: null,
    };
const payload2: NotificationCard = {
        id: '284f7e5f-0f7d-4b14-8876-a02e5969174e',
        targetAzureUniqueId: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
        title: 'Query test 2',
        card: {
            type: 'AdaptiveCard',
            version: '1.0',
            body: [
                {
                    type: 'Image',
                    url: 'http://adaptivecards.io/content/adaptive-card-50.png',
                },
                {
                    type: 'TextBlock',
                    text: `# Hello Adaptive card \n ## This is markdown \n ### This is also markdown \n\n * Some \n * List \n * Items`,
                },
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: 'Submit',
                    url: 'http://adaptivecards.io',
                },
                {
                    type: 'Action.OpenUrl',
                    title: 'GitHub',
                    url: 'http://github.com/Microsoft/AdaptiveCards',
                },
            ],
        },
        created: new Date(),
        createdBy: {
            id: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
            name: 'Eskil Lindløv Sand',
            jobTitle: 'X-Bouvet AS,Stavanger (PX)',
            mail: 'ESLSA@equinor.com',
            accountType: 'Consultant',
        },
        createdByApplication: {
            id: '5a842df8-3238-415d-b168-9f16a6a6031b',
            title: '5a842df8-3238-415d-b168-9f16a6a6031b',
        },
        seenByUser: false,
        seen: null,
    };
const NotificationCardsStory = () => {
    const [notifications, setNotifications] = React.useState<NotificationCard[]>([]);

    React.useEffect(() => {
        setTimeout(() => {
            setNotifications((n) => [ ...n,payload2]);
        }, 2000);
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setNotifications((n) => [...n,payload]);
        }, 5000);
    }, []);

    const removeNotification = React.useCallback(
        (card: NotificationCard) => {
            const updatedNotifications = [...notifications].filter((n) => n.id !== card.id);
            setNotifications(updatedNotifications);
        },
        [notifications, setNotifications]
    );
    return (
        <div style={{ margin: '8px' }}>
            <NotificationCards
                notifications={notifications}
                onDiscardNotification={removeNotification}
                onShowInList={() => {}}
            />
        </div>
    );
};

storiesOf('General|NotificationCards', module)
    .addDecorator(withFusionStory('NotificationCards'))
    .add('Default', () => <NotificationCardsStory />);
