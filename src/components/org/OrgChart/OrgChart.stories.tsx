import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import OrgChart from '.';
import { OrgStructure, OrgChartItemProps, BreadCrumb } from './orgChartTypes';
import { useComponentDisplayType, Position } from '@equinor/fusion';
import { PositionCard } from '@equinor/fusion-components';

type PositionStructure = OrgStructure & {
    name?: string;
    positionId?: string;
    personName?: string;
};

const positions: PositionStructure[] = [
    {
        id: '1',
        name: 'Leader',
        positionId: '123',
        personName: 'James Test',
    },
    {
        id: '2',
        parentId: '1',
        name: 'Accountant',
        positionId: '123',
        personName: 'Sam Test',
        aside: true,
        linked: true,
    },
    {
        id: '5',
        parentId: '1',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        aside: true,
        linked: true,
    },
    {
        id: '2132',
        parentId: '1',
        name: 'Accountant',
        positionId: '123',
        personName: 'Sam Test',
        aside: true,
        linked: true,
    },
    {
        id: '51245123',
        parentId: '1',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        aside: true,
    },
    {
        id: '3',
        parentId: '1',
        name: 'Engineer',
        positionId: '3',
        personName: 'Jane Test',
    },
    {
        id: '32',
        parentId: '1',
        name: 'Engineer',
        positionId: '3',
        personName: 'Test 123',
    },
    {
        id: '44',
        parentId: '1',
        name: 'Test worker 1',
        positionId: '4',
        personName: 'Test Test',
        linked: true,
    },
    {
        id: '3123',
        parentId: '1',
        name: 'Engineer',
        positionId: '3',
        personName: 'Jane Test 2',
        linked: true,
    },
    {
        id: '3232',
        parentId: '1',
        name: 'Developer',
        positionId: '3',
        personName: 'Test 123',
    },
    {
        id: '44312',
        parentId: '1',
        name: 'Developer',
        positionId: '4',
        personName: 'Test Test',
    },
    {
        id: '312123',
        parentId: '1',
        name: 'Developer',
        positionId: '3',
        personName: 'Jane Test',
    },
    {
        id: '323232',
        parentId: '1',
        name: 'Offshore Worker',
        positionId: '3',
        personName: 'Test 123',
        linked: true,
    },
    {
        id: '4431212',
        parentId: '1',
        name: 'Developer',
        positionId: '4',
        personName: 'Test Test',
    },
];

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
            id: '1234567890',
            appliesFrom: new Date(new Date().getFullYear() - 1, 0),
            appliesTo: new Date(new Date().getFullYear() + 1, 0),
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
    name: 'Drilling Engineer',
};

const breadCrumbStyle = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow:
        '0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
    margin: '10px',
    padding: '16px',
    boxSizing: 'border-box',
    flex: '1',
    fontSize: '16px',
    height: '32px',
} as React.CSSProperties;

const BreadCrumb: React.FC<BreadCrumb> = ({ label }) => {
    return <div style={{ ...breadCrumbStyle, cursor: 'pointer' }}>{label}</div>;
};

const PositionCardComponent: React.FC<OrgChartItemProps<PositionStructure>> = ({ item }) => {
    return (
        <div style={{ margin: '12px' }}>
            <PositionCard
                position={position}
                instance={position.instances[0]}
                showDate={true}
                showExternalId={true}
                showLocation={true}
                showObs={true}
                isSelected={false}
                showTimeline
                onExpand={() => {}}
                isLinked={item.linked}
            />
        </div>
    );
};

const breadCrumbs: BreadCrumb[] = [
    {
        childId: '1',
        label: 'Boss',
        id: '101',
    },
    {
        childId: '101',
        label: 'Director',
        id: '102',
    },
];

const OrgChartStory = () => {
    const componentDisplayType = useComponentDisplayType();
    const cardHeight = componentDisplayType === 'Compact' ? 110 : 142;
    const rowMargin = componentDisplayType === 'Compact' ? 138 : 164;
    const cardMargin = componentDisplayType === 'Compact' ? 24 : 32;
    const cardWidth = componentDisplayType === 'Compact' ? 300 : 340;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <OrgChart
                structure={positions}
                component={PositionCardComponent}
                breadCrumbComponent={BreadCrumb}
                breadCrumbs={breadCrumbs}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                rowMargin={rowMargin}
                cardMargin={cardMargin}
                breadCrumbMargin={10}
                asideLabel="ASIDE"
                childrenLabel="CHILDREN"
            />
        </div>
    );
};

storiesOf('Pro org|Org Chart', module)
    .addDecorator(withFusionStory('Org Chart'))
    .add('Default', () => <OrgChartStory />);
