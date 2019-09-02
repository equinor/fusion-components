import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonCard from '../index';
import { withKnobs, select } from '@storybook/addon-knobs';

const stories = storiesOf('People|PersonCard', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonCard'));

const personIds = {
    Consultant: 'e92c631b-94ae-4670-8f1e-60cdc2122edc', // Morten Salte
    Employee: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658', // Egil Sagstad
    External: 'e1',
    Invalid: 'invalid',
};

const sizes = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
};

const PersonCardStory = () => {
    const personId = select('Account type', personIds, personIds.Consultant);
    const size = select('Photo size', sizes, sizes.xlarge);

    return <PersonCard personId={personId} photoSize={size} />;
};

stories.add('Default', () => <PersonCardStory />);
