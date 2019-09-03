import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { PaginationArrow, CloseIcon, ArrowBackIcon } from '../components/navigation';

const stories = storiesOf('Icons|Navigation', module);
stories.addDecorator(withFusionStory('Navigation'));

stories.add('Pagination arrows', () => (
    <React.Fragment>
        <PaginationArrow prev />
        <PaginationArrow next />
    </React.Fragment>
));

stories.add('Close', () => (
    <React.Fragment>
        <CloseIcon />
    </React.Fragment>
));

stories.add('Arrow Back', () => (
    <React.Fragment>
        <ArrowBackIcon />
    </React.Fragment>
));
