import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { withKnobs } from '@storybook/addon-knobs';
import { PersonPosition } from '@equinor/fusion';
import PersonPositionCard from '../index';

const position: PersonPosition = {
    id: '37f888d1-dc7b-4eb8-ab12-b5fbb4220b15',
    name: 'Administrative Lead',
    parentPositionId: null,
    obs: 'Project Management Team',
    project: {
        id: 'da03f725-29e5-43d9-8f2b-f756873a6034',
        name: 'Åsgard Subsea Compression Phase II with long text',
        domainId: '20396',
        type: ''
    },
    basePosition: {
        id: '3f743b4b-a1e1-414c-8dc9-a3652dab8eb1',
        name: 'Administration Management',

        discipline: 'Quality and Administration',
    },

    appliesFrom: new Date('2018-01-07T00:00:00'),
    appliesTo: new Date('2025-06-30T00:00:00'),
    workload: 25,
};

const PersonCardStory = () => {
    return <PersonPositionCard position={position} />;
};

storiesOf('People|PersonPositinCard', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('PersonPositionCard'))
    .add('Default', () => <PersonCardStory />);
