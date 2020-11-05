import { actions } from '@storybook/addon-actions';
import { color, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { SecurityIcon } from '../components/security';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Security', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Security'));

stories.add('Star', () => (
    <SecurityIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
