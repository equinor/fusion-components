import { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPicker from '../index';
import { useFusionContext, PersonDetails } from '@equinor/fusion';
import { getDefaultPerson } from '../../utils';

const stories = storiesOf('People/PersonPicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPicker'));

const PreSelectedStory = () => {
    const [initialPerson, setInitialPerson] = useState<PersonDetails>();
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null);

    const context = useFusionContext();

    const getPersonAsync = async () => {
        try {
            const p = await context.http.apiClients.people.getPersonDetailsAsync(
                'e92c631b-94ae-4670-8f1e-60cdc2122edc'
            );
            setInitialPerson(p.data);
        } catch {
            setInitialPerson(getDefaultPerson());
        }
    };

    useEffect(() => {
        getPersonAsync();
    }, []);

    return (
        <PersonPicker
            initialPerson={initialPerson}
            selectedPerson={selectedPerson}
            label="Selected person"
        />
    );
};

const UnselectedStory = () => {
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null);

    return (
        <PersonPicker
            placeholder="Find person"
            hasError={boolean('Show error', false)}
            selectedPerson={selectedPerson}
            onSelect={(person) => setSelectedPerson(person)}
            errorMessage="Required"
        />
    );
};

stories.add('Default', () => <UnselectedStory />);
stories.add('Pre Selected', () => <PreSelectedStory />);
