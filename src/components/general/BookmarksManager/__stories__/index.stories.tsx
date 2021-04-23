import { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { BookmarkResponse } from '@equinor/fusion';
import BookmarkForm from '../components/BookmarkForm';
import AllBookmarks from '../BookmarkSideSheet/AllBookmarks';
import useBookmarks from '../useBookmarks';
import ModalSideSheet from '../../SideSheet/Modal';
import Button from '../../Button';

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
            name: 'My other bookmark!',
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

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const onSave = async (name: string, description: string, isShared: boolean = false) => {
        try {
            const payload = {};
        } catch (e) {
            console.error(e);
        }
    };

    async function applyBookmark() {}
    return (
        <Fragment>
            <ModalSideSheet
                header={'Bookmarks Manager'}
                onClose={() => {}}
                show={true}
                size="medium"
                id={'1'}
                headerIcons={[<Button onClick={() => setIsSaving(true)}>New Bookmark</Button>]}
            >
                {isSaving ? (
                    <BookmarkForm
                        onCancel={() => setIsSaving(false)}
                        onSave={onSave}
                        contextName={'A storybook context'}
                    />
                ) : (
                    <>
                        <AllBookmarks
                            allBookmarks={allBookmarks}
                            currentContextId={'3fa85f64-5717-4562-b3fc-2c963f66afa1'}
                            applyBookmark={applyBookmark}
                        />
                    </>
                )}
            </ModalSideSheet>
        </Fragment>
    );
};

storiesOf('BookmarksManager', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('BookmarksManager'))
    .add('Default', createAllBookmarksStory());
