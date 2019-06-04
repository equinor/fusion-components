import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color, boolean, radios } from '@storybook/addon-knobs';

import {
    UnfoldIcon,
    SubdirectoryIcon,
    RefreshIcon,
    MoreIcon,
    MenuIcon,
    GoToPageIcon,
    FullscreenIcon,
    ExpandIcon,
    CloseIcon,
    ChevronIcon,
    CheckIcon,
    CancelIcon,
} from '../components/navigation';

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

stories.add('More', () => (
    <MoreIcon
        {...eventsFromNames}
        vertical={boolean('vertical', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Menu', () => (
    <MenuIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('GoToPage', () => (
    <GoToPageIcon
        {...eventsFromNames}
        first={boolean('first', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Fullscreen', () => (
    <FullscreenIcon
        {...eventsFromNames}
        exit={boolean('exit', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Expand', () => (
    <ExpandIcon
        {...eventsFromNames}
        less={boolean('less', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Close', () => (
    <CloseIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Chevron', () => (
    <ChevronIcon
        {...eventsFromNames}
        left={boolean('left', false)}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Check', () => (
    <CheckIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Cancel', () => (
    <CancelIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
