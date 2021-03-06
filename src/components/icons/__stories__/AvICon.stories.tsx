import { actions } from '@storybook/addon-actions';
import { color, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import withFusionStory from '../../../../.storybook/withFusionStory';

import { PauseCircleIcon, PlayIcon } from '../components/av';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Av', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Av'));

stories.add('Play', () => (
    <PlayIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('PauseCircle', () => (
    <PauseCircleIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
