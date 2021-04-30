import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../../../../.storybook/withFusionStory';
import BookmarkForm from '../index';

const createAllBookmarksStory = () => () => {
    async function onSave(name: string, description: string) {}
    return (
        <Fragment>
            <BookmarkForm contextName={'Context name'} onCancel={() => {}} onSave={onSave} />
        </Fragment>
    );
};

storiesOf('NewBookmark', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('NewBookmark'))
    .add('Default', createAllBookmarksStory());
