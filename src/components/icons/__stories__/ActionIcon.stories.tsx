import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import { SearchIcon } from '../components/action';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Action', module);
stories.addDecorator(withKnobs);

stories.add('Search', () => (
    <SearchIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
