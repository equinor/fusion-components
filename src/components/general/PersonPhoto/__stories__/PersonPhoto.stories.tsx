import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPhoto from '../index';

storiesOf('General|PersonPhoto', module)
    .addParameters({ jest: ['PersonPhoto.stories.jsx'] })
    .addDecorator(withFusionStory('PersonPhoto'))
    .add('Default', () => (
        <div style={{ padding: 8 }}>
            <PersonPhoto />
        </div>
    ));
