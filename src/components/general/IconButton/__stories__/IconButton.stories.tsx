import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import IconButton from '../index';
import { SearchIcon, OpenInNewIcon } from '../../../icons/components/action';

const eventsFromNames = actions('onClick');

storiesOf('General/Icon Button', module)
    .addParameters({ jest: ['IconButton.stories.jsx'] })
    .addDecorator(withFusionStory('Icon Button'))
    .add('Default', () => (
        <div style={{ padding: 8 }}>
            <IconButton id="default-icon-btn" {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
        </div>
    ))
    .add('Toggler', () => (
        <div style={{ padding: 8 }}>
            <IconButton id="toggler-icon-btn" toggler {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
            <IconButton toggler active {...eventsFromNames}>
                <SearchIcon />
            </IconButton>
        </div>
    ))
    .add('OpenInNew', () => (
        <div style={{ padding: 8 }}>
            <IconButton id="open-in-new-icon-btn" {...eventsFromNames}>
                <OpenInNewIcon />
            </IconButton>
        </div>
    ));
