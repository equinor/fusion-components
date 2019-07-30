import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { PaginationArrow, DropArrow } from '../components/navigation';

const stories = storiesOf('Icons|Navigation', module);
stories.addDecorator(withFusionStory('Navigation'));

stories.add('Pagination arrows', () => (
    <React.Fragment>
        <PaginationArrow prev />
        <PaginationArrow next />
    </React.Fragment>
));

stories.add('Drop arrows', () => (
    <React.Fragment>
        <DropArrow direction="left" />
        <DropArrow direction="right" />
        <DropArrow direction="up" />
        <DropArrow direction="down" />
    </React.Fragment>
));
