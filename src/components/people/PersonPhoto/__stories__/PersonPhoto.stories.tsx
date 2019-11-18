import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import PersonPhoto, { PhotoSize } from '../index';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('People|PersonPhoto', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withFusionStory('PersonPhoto'));

const personIds = {
    Consultant: 'e92c631b-94ae-4670-8f1e-60cdc2122edc', // Morten Salte
    Employee: 'e2d6d1a4-5b48-4a1d-8db1-08a5043dc658', // Egil Sagstad
    External: '9f3402d7-a356-4f4b-a2b8-c94c15f50de3', // Hilde-Berit Alvsaker
};

const sizes = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
};

const PersonPhotoStory = () => {
    const personId = select('Account type', personIds, personIds.Consultant);
    const size = select('Size', sizes, sizes.xlarge) as PhotoSize;

    return (
        <PersonPhoto hideTooltip={boolean('Hide tooltip', false)} personId={personId} size={size} />
    );
};

stories.add('Default', () => <PersonPhotoStory />);
