import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPhoto from '../index';

storiesOf('General|PersonPhoto', module)
    .addParameters({ jest: ['PersonPhoto.stories.jsx'] })
    .addDecorator(withFusionStory('PersonPhoto'))
    .add('Affiliate (XLarge)', () => (
        <PersonPhoto
            title="Morten Salte"
            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
            affiliation="affiliate"
            size="xlarge"
        />
    ))
    .add('Consultant (Large)', () => (
        <PersonPhoto
            title="Morten Salte"
            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
            affiliation="consultant"
            size="large"
        />
    ))
    .add('External Hire (Medium)', () => (
        <PersonPhoto
            title="Morten Salte"
            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
            affiliation="externalhire"
            size="medium"
        />
    ))
    .add('Consultant (Small)', () => (
        <PersonPhoto
            title="Morten Salte"
            personId="e92c631b-94ae-4670-8f1e-60cdc2122edc"
            affiliation="consultant"
            size="small"
        />
    ));
