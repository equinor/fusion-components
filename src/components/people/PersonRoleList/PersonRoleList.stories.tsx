import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import { withKnobs, select } from '@storybook/addon-knobs';
import PersonRoleList from './index';
import { PersonRole } from '@equinor/fusion';

const roles: PersonRole[] = [
    {
        displayName: 'Storybook developer',
        isActive: false,
        name: 'Storybook.Developer.test',
        onDemandSupport: true,
        sourceSystem: 'Fusion',
        type: 'Global',
        scope: {
            type: 'test',
        },
    },
    {
        displayName: 'Storybook developer test',
        isActive: false,
        name: 'Storybook.Developer.test1',
        onDemandSupport: true,
        sourceSystem: 'Fusion',
        type: 'Global',
        scope: {
            type: 'test',
        },
    },
    {
        displayName: 'Fusion admin dev',
        isActive: true,
        name: 'Fusion.Admin.Develop',
        onDemandSupport: false,
        sourceSystem: 'Fusion',
        type: 'Global',
        scope: {
            type: 'test',
        },
    },
    {
        displayName: 'Fusion admin dev test 1',
        isActive: true,
        name: 'Fusion.Admin.Dev',
        onDemandSupport: false,
        sourceSystem: 'Fusion',
        type: 'Global',
        scope: {
            type: 'test',
        },
    },
];

const PersonRoleListStory = () => {
    const roleType = select(
        'Role type',
        {
            Claimable: 'claimable',
            Permanent: 'permanent',
        },
        'permanent'
    );
    return <PersonRoleList personRoles={roles} roleType={roleType} />;
};

storiesOf('People/PersonRoleList', module)
    .addDecorator(withKnobs)
    .addDecorator(withFusionStory('PersonRoleList'))
    .add('Default', () => <PersonRoleListStory />);
