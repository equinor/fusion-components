import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { PersonDetails } from '@equinor/fusion';
import PersonDetail from '..';

const stories = storiesOf('People|PersonDetails', module);
stories.addDecorator(withFusionStory('PersonDetails'));

export const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No name',
    mail: 'noname@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'Consultant',
    company: { id: 'id', name: 'name' },
    positions: [
        {
            id: 'string',
            name: 'string',
            obs: 'string',
            project: {
                id: 'string',
                name: 'string',
                domainId: 'string',
                type: 'string',
            },
            basePosition: {
                id: 'string',
                name: 'string',
                discipline: 'string',
            },
            appliesFrom: new Date('2021-09-27T00:00:00'),
            appliesTo: new Date('2022-01-26T00:00:00'),
            workload: 100,
        },
    ],
});

const PersonDetailStory = () => {
    const [person, setPerson] = useState<PersonDetails>(getDefaultPerson());
    console.log('Person: ', person);
    return (
        <div style={{ padding: '16px' }}>
            <PersonDetail person={person} />
        </div>
    );
};

stories.add('Default', () => <PersonDetailStory />);
