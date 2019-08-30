import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPicker from '../index';
import { useFusionContext, PersonDetails } from '@equinor/fusion';
import { getDefaultPerson } from '../../utils';

const stories = storiesOf('People|PersonPicker', module);
stories.addDecorator(withFusionStory('PersonPicker'));

const PreSelectedStory = () => {
    const [person, setPerson] = useState<PersonDetails>(getDefaultPerson());

    const context = useFusionContext();

    const getPersonAsync = async () => {
        try {
            const p = await context.http.apiClients.people.getPersonDetailsAsync(
                'e92c631b-94ae-4670-8f1e-60cdc2122edc'
            );
            setPerson(p.data);
        } catch {
            // ignore in this story
        }
    };

    useEffect(() => {
        getPersonAsync();
    }, []);

    return <PersonPicker initialPerson={person} />;
};

stories.add('Default', () => <PersonPicker />);
stories.add('Pre Selected', () => <PreSelectedStory />);
