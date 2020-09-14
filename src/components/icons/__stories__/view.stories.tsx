import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import withFusionStory from "../../../../.storybook/withFusionStory";

import { ListViewIcon, GridViewIcon, ColumnViewIcon, WorkIcon } from '../components/view';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|List', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory("List"));

stories.add('List', () => (
    <ListViewIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Grid', () => (
    <GridViewIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Column', () => (
    <ColumnViewIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Work', () => (
    <WorkIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));