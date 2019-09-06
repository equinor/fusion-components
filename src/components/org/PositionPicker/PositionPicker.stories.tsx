import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import withFusionStory from '../../../../.storybook/withFusionStory';
import PositionCard from '../PositionCard/index';
import { Position } from '@equinor/fusion';
import { boolean, select } from '@storybook/addon-knobs';
import PositionPicker from './index';

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
            id: 'tr',
            appliesFrom: new Date(new Date().getFullYear() - 1, 0),
            appliesTo: new Date(new Date().getFullYear() + 1, 0),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            percent: 100,
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
    parentPositionId: '0',
};

const DefaultStory = () => {
    return <PositionPicker initialPosition={position} />;
};

storiesOf('Pro org|Position Picker', module)
    .addParameters({ jest: ['PositionPicker.stories.jsx'] })
    .addDecorator(withFusionStory('Position picker'))
    .add('Default', () => <DefaultStory />);
