import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { PersonDetails } from '@equinor/fusion';
import PersonDetail from '..';

const stories = storiesOf('People/PersonDetails', module);
stories.addDecorator(withFusionStory('PersonDetails'));

export const getDefaultPerson = (): PersonDetails => ({
    azureUniqueId: 'string',
    name: 'No name',
    mail: 'inkle@equinor.com',
    jobTitle: 'www',
    department: 'string',
    mobilePhone: 'string',
    officeLocation: 'string',
    upn: 'string',
    accountType: 'Consultant',
    company: { id: 'id', name: 'name' },
});

const PersonDetailStory = () => {
    const [person, setPerson] = useState<PersonDetails>(getDefaultPerson());

    return (
        <div style={{ padding: '16px' }}>
            <PersonDetail person={person} />
        </div>
    );
};

stories.add('Default', () => <PersonDetailStory />);
