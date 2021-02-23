import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../.storybook/withFusionStory';

import {
    PaginationArrow,
    CloseIcon,
    ArrowBackIcon,
    MoreIcon,
    SubdirectoryArrowRightIcon,
    SubdirectoryArrowLeftIcon,
    ExitToAppIcon,
} from '../components/navigation';

const stories = storiesOf('Icons/Navigation', module);
stories.addDecorator(withFusionStory('Navigation'));

stories.add('Pagination arrows', () => (
    <Fragment>
        <PaginationArrow prev />
        <PaginationArrow next />
    </Fragment>
));

stories.add('Close', () => (
    <Fragment>
        <CloseIcon />
    </Fragment>
));

stories.add('Arrow Back', () => (
    <Fragment>
        <ArrowBackIcon />
    </Fragment>
));

stories.add('More', () => (
    <Fragment>
        <MoreIcon />
    </Fragment>
));

stories.add('Subdirectory right', () => (
    <Fragment>
        <SubdirectoryArrowRightIcon />
    </Fragment>
));

stories.add('Subdirectory left', () => (
    <Fragment>
        <SubdirectoryArrowLeftIcon />
    </Fragment>
));
stories.add('Exit to app', () => (
    <Fragment>
        <ExitToAppIcon />
    </Fragment>
));
