import React, { useRef, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';

import '..';
import { PhotoSize, PersonType } from '../element';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { PersonDetails } from '@equinor/fusion';

const stories = storiesOf('CustomeElements|PersonPhoto', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPhoto'));

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

const compactKnob = () => boolean('Compact mode', false);
const sizeKnob = (defaultSize: PhotoSize = 'medium') =>
    select<PhotoSize>(
        'Photo size',
        {
            xlarge: 'xlarge',
            large: 'large',
            medium: 'medium',
            small: 'small',
        },
        defaultSize
    );

const typeKnob = (defaultType: PersonType = 'employee') =>
    select<PersonType>(
        'Photo type',
        {
            consultant: 'consultant',
            employee: 'employee',
            externalhire: 'externalhire',
            local: 'local',
        },
        defaultType
    );

stories.add('Default', () => {
    const props = {
        // person: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658',
        compact: compactKnob(),
        size: sizeKnob(),
        // details: persons.Employee
        // type: typeKnob()
    };
    const ref = useRef<any>();
    useEffect(() => {
        if(!ref.current) return;
        ref.current.details = persons.Employee;
    });
    console.log(props);
    // @ts-ignore
    return (
        <div>
            <strong>vanilla</strong><br/>
            <fusion-person-photo {...props} person={persons.Employee.azureUniqueId} /><br/>
            <strong>with refs</strong><br/>
            <fusion-person-photo {...props} ref={ref} /><br/>
            <strong>with json</strong><br/>
            <fusion-person-photo {...props} details={JSON.stringify(persons.Employee)}/><br/>
        </div>
    );
});
