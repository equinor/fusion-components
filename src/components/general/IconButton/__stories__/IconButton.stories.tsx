import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import IconButton from '../index';
import { SearchIcon } from '../../../icons/components/action';

const eventsFromNames = actions('onClick');

storiesOf('General|Icon Button', module)
    .addParameters({ jest: ['IconButton.stories.jsx'] })
    .add('Default', () => (
        <div style={{ padding: 8 }}>
            <IconButton {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
        </div>
    ))
    .add('Toggler', () => (
        <div style={{ padding: 8 }}>
            <IconButton toggler {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
            <IconButton toggler active {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
        </div>
    ));
