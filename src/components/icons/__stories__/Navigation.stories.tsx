import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { PaginationArrow } from '../components/navigation';

const stories = storiesOf('Icons|Navigation', module);
stories.addDecorator(withFusionStory('Navigation'));

stories.add('Pagination arrows', () => (
    <React.Fragment>
        <PaginationArrow prev />
        <PaginationArrow next />
    </React.Fragment>
));
