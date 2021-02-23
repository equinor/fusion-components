import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import withFusionStory from '../../../../.storybook/withFusionStory';

import { SyncDisabledIcon, SyncIcon, NotificationsIcon } from '../components/notification';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Notification', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Notification'));

stories.add('SyncDisabled', () => (
    <SyncDisabledIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Sync', () => (
    <SyncIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
stories.add('Notifications', () => (
    <NotificationsIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
