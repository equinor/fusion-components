import { actions } from '@storybook/addon-actions';
import { boolean, color, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import {
    DoneIcon,
    DropdownArrow,
    HistoryIcon,
    InfoIcon,
    MinimizeIcon,
    SearchIcon,
    SortIcon,
    OpenInNewIcon,
    SettingsIcon,
    HelpIcon,
    PrintIcon,
    DeleteIcon,
    LockIcon,
} from '../components/action';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Action', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('Action'));

stories.add('Search', () => (
    <SearchIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));

stories.add('Done', () => (
    <DoneIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));

stories.add('Minimize', () => (
    <MinimizeIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('Sort', () => (
    <SortIcon
        {...eventsFromNames}
        direction={select('Direction', {
            None: null,
            Ascending: 'asc',
            Descending: 'desc',
        }, null)}
    />
));
stories.add('Dropdown', () => <DropdownArrow {...eventsFromNames} isOpen={boolean('I sopen', false)} />);
stories.add('Info', () => (
    <InfoIcon
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
        {...eventsFromNames}
    />
));
stories.add('History', () => (
    <HistoryIcon
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
        {...eventsFromNames}
    />
));

stories.add('Open In New', () => (
    <OpenInNewIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('Settings', () => (
    <SettingsIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('Help', () => (
    <HelpIcon
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('Print', () => (
    <PrintIcon 
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
));
stories.add('Delete', () => (
    <DeleteIcon 
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
    />
))
stories.add('Lock', () => (
    <LockIcon 
        {...eventsFromNames}
        color={color('color', '#000')}
        height={number('height', 24)}
        width={number('width', 24)}
        outline={boolean('outline', false)}
    />
));