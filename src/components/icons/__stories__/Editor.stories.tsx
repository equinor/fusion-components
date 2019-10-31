import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import withFusionStory from "../../../../.storybook/withFusionStory";

import { ModeIcon } from '../components/editor';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Editor', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory("Editor"));

stories.add('Mode', () => (
    <ModeIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
