import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPicker from '../index';
import { useFusionContext, PersonDetails } from '@equinor/fusion';
import { getDefaultPerson } from '../../utils';

const stories = storiesOf('People|PersonPicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPicker'));

const PreSelectedStory = () => {
    const [person, setPerson] = useState<PersonDetails>();

    const context = useFusionContext();

    const getPersonAsync = async () => {
        try {
            const p = await context.http.apiClients.people.getPersonDetailsAsync(
                'e92c631b-94ae-4670-8f1e-60cdc2122edc'
            );
            setPerson(p.data);
        } catch {
            setPerson(getDefaultPerson());
        }
    };

    useEffect(() => {
        getPersonAsync();
    }, []);

    return <PersonPicker initialPerson={person} label="Selected person" />;
};

stories.add('Default', () => (
    <>
        <PersonPicker
            placeholder="Find person"
            hasError={boolean('Show error', false)}
            errorMessage="Required"
        />
    </>
));
stories.add('Pre Selected', () => <PreSelectedStory />);
