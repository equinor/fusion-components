import * as React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from "../../../../../.storybook/withFusionStory";
import { actions } from '@storybook/addon-actions';
import Button from '../index';

const eventsFromNames = actions('onClick');

const createButtonStory = props => () => (
    <React.Fragment>
        <Button {...props} {...eventsFromNames}>
            Button
        </Button>
        <Button disabled {...props} {...eventsFromNames}>
            Disabled button
        </Button>

        <div>
            <Button>
                {`Button with <a>-tag`}
            </Button>
        </div>

        <div>
            <Button>
                {`Button with <Link>-tag`}
            </Button>
        </div>
    </React.Fragment>
);

storiesOf('General|Button', module)
    .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory("Buttons"))
    .add('Contained', createButtonStory({ contained: true }))
    .add('Outlined', createButtonStory({ outlined: true }))
    .add('Frameless', createButtonStory({ frameless: true }))
