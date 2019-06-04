import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../index';

const eventsFromNames = actions('onClick');

const createButtonStory = props => () => (
    <React.Fragment>
        <div style={{ padding: 8 }}>
            <Button primary compact {...props} {...eventsFromNames}>
                Compact button
            </Button>
            <Button primary comfortable {...props} {...eventsFromNames}>
                Comfortable button
            </Button>
            <Button primary disabled {...props} {...eventsFromNames}>
                Disabled button
            </Button>
        </div>
    </React.Fragment>
);

storiesOf('General components/Button', module)
    .addParameters({ jest: ['Button.stories.jsx'] })
    .add('Contained', createButtonStory({ contained: true }))
    .add('Outlined', createButtonStory({ outlined: true }))
    .add('Frameless', createButtonStory({ frameless: true }));
