import { actions } from '@storybook/addon-actions';
import {color, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import {
    DelveIcon,
} from '../components/o365';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|O365', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('O365'));

stories.add('Delve', () => (
    <DelveIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));