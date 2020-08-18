import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color, boolean } from '@storybook/addon-knobs';

import withFusionStory from "../../../../.storybook/withFusionStory";

import { EditIcon } from '../components/image';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Image', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory("Image"));

stories.add('Edit', () => (
    <EditIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
        outline={boolean('outline', false)}
    />
));
