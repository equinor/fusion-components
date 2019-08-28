import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { withKnobs } from '@storybook/addon-knobs';
import PersonPicker from '../index';

const stories = storiesOf('People|PersonPicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPicker'));

const PersonPickerStory = () => {
    return <PersonPicker />;
};

stories.add('Default', () => <PersonPickerStory />);
