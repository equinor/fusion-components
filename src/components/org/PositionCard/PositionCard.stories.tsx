import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
            assignedPerson: {
                accountType: 'employee',
                azureUniqueId: 'g0qghqHWHH',
                company: {
                    id: '3etgwg',
                    name: "Equinor"
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'kano@equinor.com',
                department: 'department',
                name: 'Ola Nordmann',
                jobTitle: 'Job title',
                mail: 'olno@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
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
            assignedPerson: {
                accountType: 'consultant',
                azureUniqueId: 'g0qghqHWHH',
                company: {
                    id: '8/4150ega',
                    name: "Bouvet"
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'kano@equinor.com',
                department: 'department',
                name: 'Kari Nordmann',
                jobTitle: 'Job title',
                mail: 'kano@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            properties: {},
        },
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
            assignedPerson: {
                accountType: 'external',
                azureUniqueId: '3tgweafgw<fwedgw',
                company: {
                    id: '984018gwsedgw3gh',
                    name: "External Company"
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'jiji@gmail.com',
                department: 'department',
                name: 'Jim Jimsen',
                jobTitle: 'Job title',
                mail: 'jiji@gmail.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            properties: {},
        },
    ],
};

const positions = {
    'Standard position': position,
    'Multiple assignments': positionWithMultipleInstances,
};

const InteractiveStory = () => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelected = useCallback((position, instance) => {
        action('click')(position, instance);
        setIsSelected(prev => !prev);
    }, []);

    return (
        <PositionCard
            onClick={toggleSelected}
            position={select('Position', positions, position)}
            showDate={boolean('Show date', true)}
            showExternalId={boolean('Show Pims id', true)}
            showLocation={boolean('Show location', true)}
            isSelected={isSelected}
        />
    );
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
            isSelected={false}
        />
    ))
    .add('Interactive', () => <InteractiveStory />);
