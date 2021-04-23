import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../../../.storybook/withFusionStory';
import { actions } from '@storybook/addon-actions';
import AllBookmarks from '../index';
import { BookmarkResponse } from '@equinor/fusion';

const eventsFromNames = actions('onClick');
async function applyBookmark() {}
const createAllBookmarksStory = () => () => {
    const allBookmarks: Omit<BookmarkResponse, 'payload'>[] = [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'My bookmark!',
            description: 'This is a description for the Storybook test bookmark',
            isShared: true,
            appKey: 'string',
            context: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Sverdrup',
            },
            createdBy: {
                azureUniquePersonId: '92ac0422-5a16-4bec-939c-507ae880b6a4',
                mail: 'testemail@equinor.com',
                name: 'Test User Name',
                phoneNumber: 'string',
                jobTitle: 'string',
                accountType: 'Consultant',
                accountClassification: 'External',
            },
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa12',
            name: 'My second bookmark!',

            isShared: false,
            appKey: 'string',
            context: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Sverdrup',
            },
            createdBy: {
                azureUniquePersonId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                mail: 'string',
                name: 'string',
                phoneNumber: 'string',
                jobTitle: 'string',
                accountType: 'Consultant',
                accountClassification: 'External',
            },
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            name: 'My other bookmark with a very long name',
            description: 'string',
            isShared: true,
            appKey: 'string',
            context: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
                name: 'Sverdrup 2',
            },
            createdBy: {
                azureUniquePersonId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                mail: 'string',
                name: 'string',
                phoneNumber: 'string',
                jobTitle: 'string',
                accountType: 'Consultant',
                accountClassification: 'External',
            },
        },
    ];
    return (
        <Fragment>
            <AllBookmarks
                allBookmarks={allBookmarks}
                currentContextId={'3fa85f64-5717-4562-b3fc-2c963f66afa6'}
                applyBookmark={applyBookmark}
            />
        </Fragment>
    );
};

storiesOf('AllBookmarks', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('AllBookmarks'))
    .add('Default', createAllBookmarksStory());
