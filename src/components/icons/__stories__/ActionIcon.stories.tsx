import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color, select } from '@storybook/addon-knobs';
import withFusionStory from "../../../../.storybook/withFusionStory";

import { SearchIcon, SortIcon } from '../components/action';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Action', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory("Action"));

stories.add('Search', () => (
    <SearchIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Sort', () => (
    <SortIcon
        {...eventsFromNames}
        direction={select('Direction', {
            None: null,
            Ascending: 'asc',
            Descending: 'desc',
        })}
    />
));
