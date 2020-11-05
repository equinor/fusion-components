import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { PersonPosition } from '@equinor/fusion';
import PersonPositionList from './index';

const allPosition: PersonPosition[] = [
    {
        id: '1',
        name: 'Administrative Lead',
        obs: 'Project Management Team',
        project: {
            id: '3123',
            name: 'Test project',
            domainId: '123',
            type: 'PRD',
        },
        basePosition: {
            id: '1',
            name: 'Administration Management',

            discipline: 'Quality and Administration',
        },

        appliesFrom: new Date('2018-01-07T00:00:00'),
        appliesTo: new Date('2025-06-30T00:00:00'),
        workload: 25,
    },
    {
        id: '2',
        name: 'Tech Lead',
        obs: 'Project Management Team',
        project: {
            id: '3123',
            name: 'TEst project 1 with long text',
            domainId: '123',
            type: 'PRD',
        },
        basePosition: {
            id: '1',
            name: 'Administration Management',

            discipline: 'Quality and Administration',
        },

        appliesFrom: new Date('2018-01-07T00:00:00'),
        appliesTo: new Date('2019-06-30T00:00:00'),
        workload: 100,
    },
];

const PersonPositionListStory = () => {
    const showPositions = select(
        'Show Positions',
        {
            All: 'all',
            Future: 'future',
            Past: 'past',
            Active: 'active',
        },
        'all'
    );
    return (
        <PersonPositionList
            allPositions={allPosition}
            showPositions={showPositions}
            disableOrgLink={boolean('Disable org link', false)}
        />
    );
};

storiesOf('People/PersonPositionList', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('PersonPositionList'))
    .add('Default', () => <PersonPositionListStory />);
