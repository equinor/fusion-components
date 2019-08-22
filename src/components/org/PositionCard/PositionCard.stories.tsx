import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import withFusionStory from '../../../../.storybook/withFusionStory';
import PositionCard from './index';
import { Position } from '@equinor/fusion';

const position: Position = {
    id: '1',
    basePosition: {
        department: 'Department',
        discipline: 'Engineering',
        id: '3',
        name: 'Engineer',
        roleDescription: '',
    },
    externalId: '800',
    instances: [
        {
            appliesFrom: new Date().toString(),
            appliesTo: new Date(new Date().getFullYear() + 1, 0).toString(),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            percent: 100,
            type: 'type',
            properties: {},
        },
    ],
    isSupport: false,
    name: 'Drilling Engineer',
    parentPositionId: '0',
};

const positionWithMultipleInstances: Position = {
    ...position,
    name: 'Piping Engineer',
    instances: [
        ...position.instances,
        {
            appliesFrom: new Date().toString(),
            appliesTo: new Date(new Date().getFullYear() + 2, 0).toString(),
            location: {
                code: '113',
                country: 'Norway',
                id: '11331',
                name: 'Bergen',
            },
            obs: 'obs',
            percent: 100,
            type: 'type',
            properties: {},
        },
        {
            appliesFrom: new Date().toString(),
            appliesTo: new Date(new Date().getFullYear(), new Date().getMonth() + 4).toString(),
            location: {
                code: '616',
                country: 'Norway',
                id: '161216',
                name: 'Oslo',
            },
            obs: 'obs',
            percent: 100,
            type: 'type',
            properties: {},
        },
    ],
};

const positions = {
    'Standard position': position,
    'Multiple assignments': positionWithMultipleInstances,
};

storiesOf('Pro org|Position Card', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('Pro org position card'))
    .add('Default', () => (
        <PositionCard
            position={select('Position', positions, position)}
            showDate={boolean('Show date', true)}
            showExternalId={boolean('Show Pims id', true)}
            showLocation={boolean('Show location', true)}
            isSelected={boolean('Is selected', false)}
        />
    ));
