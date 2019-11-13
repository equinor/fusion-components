import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonCard, { PhotoSize } from '../index';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { PersonDetails } from '@equinor/fusion';

const stories = storiesOf('People|PersonCard', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonCard'));

interface PersonDictionary {
    [accountType: string]: PersonDetails;
}

const basePerson: PersonDetails = {
    accountType: 'Employee',
    name: '',
    azureUniqueId: '0000-0000-0000-0000-0000',
    company: { id: '', name: '' },
    jobTitle: '',
    mail: '',
    mobilePhone: '',
    officeLocation: '',
    upn: '',
    department: '',
};

const persons: PersonDictionary = {
    Consultant: {
        ...basePerson,
        azureUniqueId: 'e92c631b-94ae-4670-8f1e-60cdc2122edc',
        accountType: 'Consultant',
        name: 'Morten Salte',
        mail: 'msal@equinor.com',
        jobTitle: 'X-Bouvet AS,Stavanger (PX)',
        department: 'CFO GBS IT PLA LIFE CYCLE INFORMATION',
        mobilePhone: '+47 47804137',
        officeLocation: 'Stavanger',
    },
    Employee: {
        ...basePerson,
        azureUniqueId: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
        accountType: 'Employee',
        name: 'Egil Sagstad',
        mail: 'egsag@equinor.com',
    },
    External: {
        ...basePerson,
        azureUniqueId: '9f3402d7-a356-4f4b-a2b8-c94c15f50de3',
        accountType: 'External',
        name: 'External Person',
        mail: 'external@gmail.com',
    },
    Local: {
        ...basePerson,
        accountType: 'Local',
        name: 'Local Person',
        mail: 'local@gmail.com',
    },
};

const personKeys = {
    Consultant: 'Consultant',
    Employee: 'Employee',
    External: 'External',
    Local: 'Local',
};

const sizes = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
};

const PersonCardStory = () => {
    const personKey = select('Account type', personKeys, personKeys.Consultant);
    const person = persons[personKey];

    const size = select('Photo size', sizes, sizes.xlarge) as PhotoSize;

    return <PersonCard person={person} photoSize={size} inline={boolean('Inline', false)} />;
};

stories.add('Default', () => <PersonCardStory />);
