import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';
import ProgressSideSheet, { FailedRequest, SuccessfulRequest } from './index';
import {PersonCard} from "@equinor/fusion-components";

import * as React from 'react';

type SimplePerson = {
    personId: string;
    name: string;
    mail: string;
};

type PersonComponentProps = {
    request: SimplePerson;
};

const style: React.CSSProperties = {
    display: "flex",

}

const PersonComponent: React.FC<PersonComponentProps> = ({ request }) => {
    return <PersonCard personId={request.personId} photoSize="large"/>;
};

const testPerson1: SimplePerson = {
    name: 'Eskil',
    mail: 'eslsa@equinor.com',
    personId: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
};

const updatedTestPerson: SimplePerson = {
    name: 'Eskil Sand',
    mail: 'eslsa@equinor.com',
    personId: '7ecc8cd2-077b-4a4a-953f-8e02c0f07c24',
};

const testPerson2: SimplePerson = {
    name: 'Morten Salte',
    mail: 'msal@equinor.com',
    personId: 'e92c631b-94ae-4670-8f1e-60cdc2122edc',
};

const failedRequests: FailedRequest<SimplePerson>[] = [
    {
        errorMessage: 'Unable to save person',
        isEditable: false,
        item: testPerson1,
    },
    {
        errorMessage: 'Unable to save person',
        isEditable: true,
        item: testPerson2,
    },
];
const successfulRequests: SuccessfulRequest<SimplePerson, SimplePerson>[] = [
    { item: testPerson1, response: updatedTestPerson },
    { item: testPerson2, response: updatedTestPerson },
];
const pendingRequests: SimplePerson[] = [testPerson2, testPerson1, testPerson2, testPerson1];

const ProgressSideSheetStory: React.FC = () => {
    return (
        <ProgressSideSheet
            title="Saving requests"
            renderRequest={PersonComponent}
            failedRequests={failedRequests}
            successfulRequests={successfulRequests}
            pendingRequests={pendingRequests}
            onClose={() => {}}
            onRemoveFailedRequest={() => {}}
        />
    );
};

storiesOf('Feedback|Progress side sheet', module)
    .addDecorator(withFusionStory('Progress side sheet'))
    .add('Default', () => <ProgressSideSheetStory />);
