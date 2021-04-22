import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../../../.storybook/withFusionStory';
import { actions } from '@storybook/addon-actions';
import NewBookmark from '../index';
import { BookmarkResponse } from '@equinor/fusion';

const eventsFromNames = actions('onClick');

const createAllBookmarksStory = () => () => {
    async function onSave(name: string, description: string) {}
    return (
        <Fragment>
            <NewBookmark contextName={'Context name'} onCancel={() => {}} onSave={onSave} />
        </Fragment>
    );
};

storiesOf('NewBookmark', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('NewBookmark'))
    .add('Default', createAllBookmarksStory());
