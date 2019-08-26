import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPicker from '../index';

storiesOf('People|PersonPicker', module)
    .addParameters({ jest: ['PersonPicker.stories.jsx'] })
    .addDecorator(withFusionStory('PersonPicker'))
    .add('Default', () => <PersonPicker />);
