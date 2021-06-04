import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color, boolean } from '@storybook/addon-knobs';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { AddAlertIcon, WarningIcon, ErrorIcon, NotificationIcon } from '../components/alert';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Alert', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Alert'));

stories.add('Add', () => (
    <AddAlertIcon
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Error', () => (
    <ErrorIcon
        {...eventsFromNames}
        outline={boolean('outline', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Warning', () => (
    <WarningIcon
        {...eventsFromNames}
        outline={boolean('outline', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Notification', () => (
    <NotificationIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('width', 24)}
        color={color('color', '#000')}
    />
));
