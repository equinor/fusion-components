import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withFusionStory from '../../../../.storybook/withFusionStory';
import PositionCard from './index';
import { Position, PositionInstance } from '@equinor/fusion';

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
            id: '1',
            appliesFrom: new Date('2021-09-27T00:00:00'),
            appliesTo: new Date('2022-09-26T00:00:00'),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 100,
            type: 'Rotation',
            assignedPerson: {
                accountType: 'Employee',
                azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
                company: {
                    id: '3etgwg',
                    name: 'Equinor',
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'egsag@equinor.com',
                department: 'department',
                name: 'Rotation 1',
                jobTitle: 'Job title',
                mail: 'egsag@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            rotationId: 'R1',
            properties: {},
            externalId: '800',
            parentPositionId: '0',
            isDeleted: false,
            positionId: '1',
            taskOwnerIds: null,
        },
        {
            id: '2',
            appliesFrom: new Date('2022-01-27T00:00:00'),
            appliesTo: new Date('2022-09-26T00:00:00'),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 100,
            type: 'Rotation',
            assignedPerson: {
                accountType: 'Employee',
                azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
                company: {
                    id: '3etgwg',
                    name: 'Equinor',
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'egsag@equinor.com',
                department: 'department',
                name: 'Rotation 2',
                jobTitle: 'Job title',
                mail: 'egsag@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            properties: {},
            rotationId: 'R3',
            parentPositionId: '0',
            isDeleted: false,
            externalId: '800',
            positionId: '1',
            taskOwnerIds: null,
        },

        {
            id: '3',
            appliesFrom: new Date('2018-01-01T00:00:00'),
            appliesTo: new Date('2021-09-26T00:00:00'),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 100,
            type: 'Normal',
            assignedPerson: {
                accountType: 'Employee',
                azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
                company: {
                    id: '3etgwg',
                    name: 'Equinor',
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'egsag@equinor.com',
                department: 'department',
                name: 'Egil Sagstad',
                jobTitle: 'Job title',
                mail: 'egsag@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            properties: {},
            rotationId: null,
            externalId: '800',
            isDeleted: false,
            parentPositionId: '0',
            positionId: '1',
            taskOwnerIds: null,
        },
        {
            id: '5',
            appliesFrom: new Date('2021-09-27T00:00:00'),
            appliesTo: new Date('2022-09-26T00:00:00'),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 100,
            type: 'Rotation',
            assignedPerson: {
                accountType: 'Employee',
                azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
                company: {
                    id: '3etgwg',
                    name: 'Equinor',
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'egsag@equinor.com',
                department: 'department',
                name: 'Rotation 3',
                jobTitle: 'Job title',
                mail: 'egsag@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            rotationId: 'R2',
            properties: {},
            externalId: '800',
            isDeleted: false,
            parentPositionId: '0',
            positionId: '1',
            taskOwnerIds: null,
        },
        {
            id: '6',
            appliesFrom: new Date('2021-09-27T00:00:00'),
            appliesTo: new Date('2022-01-26T00:00:00'),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 100,
            type: 'Rotation',
            assignedPerson: {
                accountType: 'Employee',
                azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
                company: {
                    id: '3etgwg',
                    name: 'Equinor',
                },
                contracts: [],
                positions: [],
                roles: [],
                upn: 'egsag@equinor.com',
                department: 'department',
                name: 'Rotation 4',
                jobTitle: 'Job title',
                mail: 'egsag@equinor.com',
                mobilePhone: '12345678',
                officeLocation: 'Stavanger',
            },
            properties: {},
            rotationId: 'R3',
            externalId: '800',
            isDeleted: false,
            parentPositionId: '0',
            positionId: '1',
            taskOwnerIds: null,
        },
    ],
    contractId: null,
    directChildCount: 2,
    totalChildCount: 18,
    projectId: '',
    properties: {
        isSupport: false,
    },
    name: 'Drilling Engineer',
};

const tbnPosition: Position = {
    id: '1',
    basePosition: {
        department: 'Department',
        discipline: 'Engineering',
        id: '3',
        name: 'Engineer',
        roleDescription: '',
    },
    externalId: '800',
    instances: [],
    contractId: null,
    directChildCount: 2,
    totalChildCount: 18,
    projectId: '',
    properties: {
        isSupport: false,
    },
    name: 'Drilling Engineer',
};

const positions = {
    Standard: position,
    TBN: tbnPosition,
};

const positionKeys = {
    Standard: 'Standard',
    TBN: 'TBN',
};

const InteractiveStory = () => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelected = useCallback((position, instance) => {
        action('click')(position, instance);
        setIsSelected(prev => !prev);
    }, []);

    const selectedPositionKey = select('position', positionKeys, positionKeys.Standard);

    const selectedPosition: Position = positions[selectedPositionKey];

    const instanceKeys = selectedPosition.instances.reduce(
        (allInstanceIds, instance: PositionInstance) => {
            return {
                ...allInstanceIds,
                [instance.id]: instance.id,
            };
        },
        {}
    );
    const selectedPositionInstanceId = select('instance', instanceKeys, '1');
    const selectedPositionsInstance = selectedPosition.instances.find(
        i => i.id === selectedPositionInstanceId
    );
    return (
        <PositionCard
            onClick={toggleSelected}
            position={selectedPosition}
            instance={selectedPositionsInstance}
            showDate={boolean('Show date', true)}
            showExternalId={boolean('Show Pims id', true)}
            showLocation={boolean('Show location', true)}
            showObs={boolean('Show obs', true)}
            showTimeline={boolean('Show timeline', true)}
            isSelected={isSelected}
            onExpand={action('onExpand')}
            childCount={number('Child count', 2)}
            isFuture={boolean('Show as future position', false)}
            isPast={boolean('Show as past position', false)}
            selectedDate={new Date('2022-09-25T00:00:00')}

        />
    );
};

const DefaultStory = () => {
    const selectedPositionKey = select('position', positionKeys, positionKeys.Standard);
    const selectedPosition: Position = positions[selectedPositionKey];

    const instanceKeys = selectedPosition.instances.reduce(
        (allInstanceIds, instance: PositionInstance) => {
            return {
                ...allInstanceIds,
                [instance.id]: instance.id,
            };
        },
        {}
    );
    const selectedPositionInstanceId = select('instance', instanceKeys, '1');
    const selectedPositionsInstance = selectedPosition.instances.find(
        i => i.id === selectedPositionInstanceId
    );
    return (
        <PositionCard
            position={selectedPosition}
            instance={selectedPositionsInstance}
            showDate={boolean('Show date', true)}
            showExternalId={boolean('Show Pims id', true)}
            showLocation={boolean('Show location', true)}
            showObs={boolean('Show obs', true)}
            showTimeline={boolean('Show timeline', true)}
            isSelected={false}
            isFuture={boolean('Show as future position', false)}
            isPast={boolean('Show as past position', false)}
            showRotation={boolean("Show rotation", true)}
        />
    );
};

storiesOf('Pro org|Position Card', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('Pro org position card'))
    .add('Default', () => <DefaultStory />)
    .add('Interactive', () => <InteractiveStory />);
