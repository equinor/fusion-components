import { actions } from '@storybook/addon-actions';
import { boolean, color, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import {
    StarIcon,
} from '../components/toggle';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Toggle', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Toggle'));

stories.add('Star', () => (
    <StarIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
        outline={boolean('outline', false)}
    />
));