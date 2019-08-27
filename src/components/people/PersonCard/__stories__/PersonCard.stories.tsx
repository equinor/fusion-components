import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonCard from '../index';

storiesOf('People|PersonCard', module)
    .addParameters({ jest: ['PersonCard.stories.jsx'] })
    .addDecorator(withFusionStory('PersonCard'))
    .add('Default', () => (
        <PersonCard
            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
            personName="Morten Salte"
            email="msal@equinor.com"
            photoSize="large"
        />
    ));
