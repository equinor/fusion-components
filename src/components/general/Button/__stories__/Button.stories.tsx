import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { actions } from '@storybook/addon-actions';
import Button from '../index';

const eventsFromNames = actions('onClick');

const createButtonStory = (props) => () => (
    <React.Fragment>
        <Button {...props} {...eventsFromNames} id="button-1" quickFactScope="storybook">
            Button
        </Button>
        <Button danger {...props} {...eventsFromNames} id="button-2" quickFactScope="storybook">
            Button
        </Button>
        <Button disabled {...props} {...eventsFromNames} id="button-3" quickFactScope="storybook">
            Disabled button
        </Button>
    </React.Fragment>
);

storiesOf('General/Button', module)
    .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('Buttons'))
    .add('Contained', createButtonStory({ contained: true }))
    .add('Outlined', createButtonStory({ outlined: true }))
    .add('Frameless', createButtonStory({ frameless: true }));
