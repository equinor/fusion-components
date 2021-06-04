import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import withFusionStory from '../../../../../.storybook/withFusionStory';
import { BookmarkListResponse, BookmarkResponse } from '@equinor/fusion';
import Bookmark from './../../BookmarksManager/BookmarkSideSheet/SideSheetManager/Bookmark';
import Accordion from '../../../general/Accordion';
import AccordionItem from '../../../general/Accordion/AccordionItem';
import BookmarkProvider from './../BookmarkProvider';
type Context = {
    name: string;
    id: string;
};
type OpenAccordion = {
    [id: string]: boolean;
};

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

    const createGroupByContextId = (allBookmarks: BookmarkListResponse[]) => {
        const groupedContexts: Record<string, Context | undefined> = {};
        allBookmarks.reduce((__prev, curr) => {
            const key = curr.context ? curr.context.id : 'unknown';
            if (!groupedContexts[key]) {
                groupedContexts[key] = curr.context;
            }
            return groupedContexts;
        }, {});
        return groupedContexts;
    };

    const createGroupByContext = (allBookmarks: BookmarkListResponse[]) => {
        const groupedContext: Record<string, BookmarkListResponse[]> = {};
        allBookmarks.reduce((__prev, curr) => {
            const key = curr.context ? curr.context.id : 'unknown';
            if (groupedContext[key]) {
                const bookmarks = groupedContext[key];
                bookmarks.push(curr);
            } else {
                groupedContext[key] = [curr];
            }
            return groupedContext;
        }, {});
        return groupedContext;
    };

    const [openAccordions, setOpenAccordions] = useState<OpenAccordion>({});
    const handleOpenAccordionChange = (id: string) =>
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    return (
        <BookmarkProvider>
            <Fragment>
                <>
                    <Accordion>
                        {Object.values(createGroupByContextId(allBookmarks)).map((context) => {
                            return (
                                <AccordionItem
                                    label={context.name}
                                    key={context.id}
                                    isOpen={openAccordions[context.id]}
                                    onChange={() => handleOpenAccordionChange(context.id)}
                                >
                                    {Object.values(
                                        createGroupByContext(allBookmarks)[context.id]
                                    ).map((bookmark: BookmarkListResponse) => {
                                        return (
                                            <Bookmark
                                                bookmark={bookmark}
                                                accordionOpen={openAccordions[context.id]}
                                                onViewChange={() => {}}
                                                setEditBookmark={() => {}}
                                                onClose={() => {}}
                                                key={bookmark.id}
                                            />
                                        );
                                    })}
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </>
            </Fragment>
        </BookmarkProvider>
    );
};

storiesOf('General/BookmarksManager', module)
    // .addParameters({ jest: ['Button.stories.jsx'] })
    .addDecorator(withFusionStory('BookmarksManager'))
    .add('Default', createBookmarksManagerStory());
