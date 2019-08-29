import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import ReportingPath from '.';
import { OrgStructure, OrgChartItemProps } from '@equinor/fusion-components';

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
        parentId: '2',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        aside: true,
    },
];

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow:
        '0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14)',
    margin: '8px',
    boxSizing: 'border-box',
    flex: '1',
    fontSize: '16px',
    height: 'calc(100% - 16px)',
} as React.CSSProperties;

const PositionCard: React.FC<OrgChartItemProps<Position>> = ({ item }) => {
    return (
        <div style={cardStyle}>
            Position : {item.name}
            <br />
            Person : {item.personName}
        </div>
    );
};

const ReportingPathStory = () => {
    return <ReportingPath structure={positions} component={PositionCard} />;
};

storiesOf('Org|Reporting Path', module)
    .addDecorator(withFusionStory('Reporting Path'))
    .add('Default', () => <ReportingPathStory />);
