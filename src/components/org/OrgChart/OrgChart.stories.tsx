import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import OrgChart from '.';
import { OrgStructure, OrgChartItemProps, BreadCrumb } from './orgChartTypes';
import { useComponentDisplayType } from '@equinor/fusion';

type Position = OrgStructure & {
    name?: string;
    positionId?: string;
    personName?: string;
};

const positions: Position[] = [
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
    },
    {
        id: '5',
        parentId: '1',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        aside: true,
    },
    {
        id: '2132',
        parentId: '1',
        name: 'Accountant',
        positionId: '123',
        personName: 'Sam Test',
        aside: true,
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
    },
    {
        id: '3123',
        parentId: '1',
        name: 'Engineer',
        positionId: '3',
        personName: 'Jane Test',
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
    },
    {
        id: '4431212',
        parentId: '1',
        name: 'Developer',
        positionId: '4',
        personName: 'Test Test',
    },
];

const cardStyle = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow:
        '0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
    margin: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '8px',
    boxSizing: 'border-box',
    flex: '1',
    fontSize: '16px',
    height: 'calc(100% - 20px)',
} as React.CSSProperties;

const breadCrumbStyle = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow:
        '0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
    margin: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    boxSizing: 'border-box',
    flex: '1',
    fontSize: '16px',
    height: '32px',
} as React.CSSProperties;

const BreadCrumb: React.FC<BreadCrumb> = ({ label }) => {
    return <div style={{ ...breadCrumbStyle, cursor: 'pointer' }}>{label}</div>;
};

const PositionCard: React.FC<OrgChartItemProps<Position>> = ({ item }) => {
    return (
        <div style={cardStyle}>
            Position : {item.name}
            <br />
            Person : {item.personName}
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
    const rowMargin = componentDisplayType === 'Compact' ? 120 : 164;
    const cardMargin = componentDisplayType === 'Compact' ? 24 : 16;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <OrgChart
                structure={positions}
                component={PositionCard}
                breadCrumbComponent={BreadCrumb}
                breadCrumbs={breadCrumbs}
                cardWidth={340}
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
