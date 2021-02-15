import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import ReportingPath from '.';
import { OrgStructure, OrgChartItemProps } from '@equinor/fusion-components';
import { useComponentDisplayType } from '@equinor/fusion';
import { FC, CSSProperties } from 'react';

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
    {
        id: '9',
        parentId: '5',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        aside: true,
    },

    {
        id: '40',
        parentId: '2',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        linked: true,
    },
    {
        id: '50',
        parentId: '9',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        linked: true,
    },
    {
        id: '501',
        parentId: '9',
        name: 'Worker',
        positionId: '3',
        personName: 'Sam Test',
        linked: true,
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
} as CSSProperties;

const PositionCard: FC<OrgChartItemProps<Position>> = ({ item }) => {
    return (
        <div style={cardStyle}>
            Position : {item.name}
            <br />
            Person : {item.personName}
        </div>
    );
};

const ReportingPathStory = () => {
    const componentDisplayType = useComponentDisplayType();
    const cardHeight = componentDisplayType === 'Compact' ? 110 : 142;
    const rowMargin = componentDisplayType === 'Compact' ? 120 : 154;
    const cardMargin = componentDisplayType === 'Compact' ? 16 : 16;

    return (
        <ReportingPath
            structure={positions}
            component={PositionCard}
            cardHeight={cardHeight}
            rowMargin={rowMargin}
            cardMargin={cardMargin}
        />
    );
};

storiesOf('Pro org/Reporting Path', module)
    .addDecorator(withFusionStory('Reporting Path'))
    .add('Default', () => <ReportingPathStory />);
