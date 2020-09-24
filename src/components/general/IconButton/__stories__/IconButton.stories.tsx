import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import IconButton from '../index';
import { SearchIcon, OpenInNewIcon } from '../../../icons/components/action';

const eventsFromNames = actions('onClick');
const scope = "storybook";

storiesOf('General|Icon Button', module)
    .addParameters({ jest: ['IconButton.stories.jsx'] })
    .addDecorator(withFusionStory('Icon Button'))
    .add('Default', () => (
        <div style={{ padding: 8 }}>
            <IconButton {...eventsFromNames} quickFactScope={scope} id="icon-btn-1">
                <SearchIcon />
            </IconButton>
        </div>
    ))
    .add('Toggler', () => (
        <div style={{ padding: 8 }}>
            <IconButton id="toggler-btn-1" toggler {...eventsFromNames} quickFactScope={scope}>
                <SearchIcon />
            </IconButton>
            <IconButton id="toggler-btn-2" toggler active {...eventsFromNames} quickFactScope={scope}>
                <SearchIcon />
            </IconButton>
        </div>
    ))
    .add('OpenInNew', () => (
        <div style={{ padding: 8 }}>
            <IconButton {...eventsFromNames} quickFactScope={scope}>
                <OpenInNewIcon />
            </IconButton>
        </div>
    ));
