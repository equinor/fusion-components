import { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { BookmarkResponse, useCurrentApp } from '@equinor/fusion';
import ModalSideSheet from '../../SideSheet/Modal';

import SideSheetManager from '../BookmarkSideSheet/SideSheetManager';
const createBookmarksManagerStory = () => () => {
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
            created: new Date(),
            updated: new Date(),
            createdBy: {
                azureUniqueId: '92ac0422-5a16-4bec-939c-507ae880b6a4',
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
            created: new Date(),
            updated: new Date(),
            createdBy: {
                azureUniqueId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
            name: 'My other bookmark with a very, very long title!',
            description: 'string',
            isShared: true,
            appKey: 'string',
            context: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
                name: 'Sverdrup 2',
            },
            created: new Date(),
            updated: new Date(),
            createdBy: {
                azureUniqueId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                mail: 'string',
                name: 'string',
                phoneNumber: 'string',
                jobTitle: 'string',
                accountType: 'Consultant',
                accountClassification: 'External',
            },
        },
    ];

    const currentApp = useCurrentApp();

    return (
        <Fragment>
            <ModalSideSheet
                header={'Bookmarks Manager'}
                onClose={() => {}}
                show={true}
                size="medium"
                id={'1'}
            >
                <SideSheetManager
                    allBookmarks={allBookmarks}
                    currentApp={currentApp}
                    capturePayload={async () => {}}
                    onViewChanged={(view) => {}}
                    onClose={() => {}}
                />
            </ModalSideSheet>
        </Fragment>
    );
};

storiesOf('BookmarksManager', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('BookmarksManager'))
    .add('Default', createBookmarksManagerStory());
