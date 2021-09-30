import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { actions } from '@storybook/addon-actions';
import Button from '../index';

const eventsFromNames = actions('onClick');

const createButtonStory = (props) => () => (
    <Fragment>
        <Button {...props} {...eventsFromNames}>
            Button
        </Button>
        <Button danger {...props} {...eventsFromNames}>
            Button
        </Button>
        <Button disabled {...props} {...eventsFromNames}>
            Disabled button
        </Button>
    </Fragment>
);

storiesOf('General/Button', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('Buttons'))
    .add('Contained', createButtonStory({ contained: true }))
    .add('Outlined', createButtonStory({ outlined: true }))
    .add('Frameless', createButtonStory({ frameless: true }))

