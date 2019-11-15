import React from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import { PaginationArrow, CloseIcon, ArrowBackIcon, MoreIcon, SubdirectoryArrowRightIcon, SubdirectoryArrowLeftIcon } from '../components/navigation';

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

stories.add('More', () => (
    <React.Fragment>
        <MoreIcon />
    </React.Fragment>
));

stories.add('Subdirectory right', () => (
    <React.Fragment>
        <SubdirectoryArrowRightIcon />
    </React.Fragment>
));

stories.add('Subdirectory left', () => (
    <React.Fragment>
        <SubdirectoryArrowLeftIcon />
    </React.Fragment>
));
