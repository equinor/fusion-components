import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPhoto from '../index';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('People|PersonPhoto', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPhoto'));

const personIds = {
    Consultant: 'e92c631b-94ae-4670-8f1e-60cdc2122edc', // Morten Salte
    Employee: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658', // Egil Sagstad
    External: 'e1',
    Invalid: 'invalid',
};

const sizes = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
};

const PersonPhotoStory = () => {
    const personId = select('Account type', personIds, personIds.Consultant);
    const size = select('Size', sizes, sizes.xlarge);

    return (
        <PersonPhoto hideTooltip={boolean('Hide tooltip', false)} personId={personId} size={size} />
    );
};

stories.add('Default', () => <PersonPhotoStory />);
