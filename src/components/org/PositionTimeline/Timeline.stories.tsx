import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { OrgStructure, OrgChartItemProps, BreadCrumb } from './orgChartTypes';
import { useComponentDisplayType, Position } from '@equinor/fusion';
import { PositionCard, InlineDepartmentCard } from '@equinor/fusion-components';
import React, { FC, CSSProperties } from 'react';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TimelinePosition } from './model';
import PositionTimeline from './index';

const position: TimelinePosition | any = {
    id: '1',
    basePosition: {
        department: 'Department',
        id: '3',
    },
    externalId: '800',
    instances: [
        {
            id: '1',
            appliesFrom: new Date(2020, 4),
            appliesTo: new Date(2020, 11),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 99,
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
            parentPositionId: '0',
            isDeleted: false,
            positionId: '1',
            externalId: '800',
            taskOwnerIds: null,
        },
        {
            id: '2',
            appliesFrom: new Date(2020, 0),
            appliesTo: new Date(2020, 5),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 88,
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
            parentPositionId: '0',
            isDeleted: false,
            positionId: '1',
            externalId: '800',
            taskOwnerIds: null,
        },
        {
            id: '3',
            appliesFrom: new Date(2021, 0),
            appliesTo: new Date(2021, 5),
            location: {
                code: '213',
                country: 'Norway',
                id: '214215',
                name: 'Stavanger',
            },
            obs: 'obs',
            workload: 88,
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
            parentPositionId: '0',
            isDeleted: false,
            positionId: '1',
            externalId: '800',
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
    name: 'Drilling Engineer test 321',
};

const PositionTimelineStory = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <PositionTimeline selectedPosition={position as any} selectMode={'single'} />
        </div>
    );
};

storiesOf('Pro org/Position timeline', module)
    .addDecorator(withFusionStory('Org Chart'))
    .add('Default', () => <PositionTimelineStory />);
