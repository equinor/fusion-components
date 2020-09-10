import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import withFusionStory from "../../../../.storybook/withFusionStory";

import { LinkIcon, TitleIcon, FormatItalicsIcon, FormatBoldIcon, FormatBulletedListIcon, FormatNumberedListIcon } from '../components/wysiwyg';

const eventsFromNames = actions('onClick');

const stories = storiesOf('Icons/Wysiwyg', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory("Wysiwyg"));

stories.add('Link', () => (
    <LinkIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Title', () => (
    <TitleIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Format italics', () => (
    <FormatItalicsIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Format bold', () => (
    <FormatBoldIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Format bulleted list', () => (
    <FormatBulletedListIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));

stories.add('Format numbered list', () => (
    <FormatNumberedListIcon
        {...eventsFromNames}
        width={number('width', 24)}
        height={number('height', 24)}
        color={color('color', '#000')}
    />
));
