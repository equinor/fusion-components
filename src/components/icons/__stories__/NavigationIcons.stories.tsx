import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color, boolean, radios } from '@storybook/addon-knobs';

import UnfoldIcon from '../components/navigation/UnfoldIcon';
import SubdirectoryIcon from '../components/navigation/SubdirectoryIcon';
import RefreshIcon from '../components/navigation/RefreshIcon';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons|Navigation', module);
stories.addDecorator(withKnobs);

stories.add('Unfold', () => (
    <UnfoldIcon
        {...eventsFromNames}
        less={boolean('less', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Subdirectory', () => (
    <SubdirectoryIcon
        {...eventsFromNames}
        left={boolean('left', false)}
        right={boolean('right', true)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Refresh', () => (
    <RefreshIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
