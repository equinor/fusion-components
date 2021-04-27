import {
    AppManifest,
    BookmarkListResponse,
    BookmarkRequest,
    BookmarkResponse,
    useCurrentContext,
} from '@equinor/fusion';
import { Accordion, AccordionItem, ErrorMessage } from '@equinor/fusion-components';
import { useEffect, useState, useCallback } from 'react';
import { ApplyBookmark } from '../..';
import Bookmark from './Bookmark';
import BookmarkForm from '../../components/BookmarkForm';
import useBookmarkContext from '../../hooks/useBookmarkContext';

type OpenAccordion = {
    [id: string]: boolean;
};
type AllBookmarksProps<TPayload> = {
    allBookmarks: BookmarkListResponse[];
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
    bookmarkState: 'AllBookmarks' | 'Creating' | 'Editing';
    setBookmarkState: any;
    currentApp: AppManifest;
    capturePayload: any;
};

type Context = {
    name: string;
    id: string;
};
function AllBookmarks<T>({
    allBookmarks,
    currentApp,
    applyBookmark,
    bookmarkState,
    setBookmarkState,
    capturePayload,
}: AllBookmarksProps<T>) {
    const [openAccordions, setOpenAccordions] = useState<OpenAccordion>({});
    const [editBookmark, setEditBookmark] = useState<BookmarkListResponse | undefined>(undefined);

    const { store } = useBookmarkContext();
    const currentContext = useCurrentContext();

    function handleOpenAccordionChange(id: string) {
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    }
    const onSave = useCallback(
        async (name: string, description: string, isShared: boolean = false) => {
            try {
                const payload = await capturePayload();
                if (payload) {
                    store.addBookmark({
                        name: name,
                        description: description,
                        payload: payload,
                        appKey: currentApp.key,
                        contextId: currentContext.id,
                        isShared: isShared,
                    });
                    setBookmarkState('AllBookmarks');
                }
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );

    const onEditSave = useCallback(
        async (
            bookmarkId: string,
            bookmark: Partial<Omit<BookmarkRequest, 'appKey' | 'contextId'>>
        ) => {
            try {
                store.updateBookmark(bookmarkId, bookmark);
                setBookmarkState('AllBookmarks');
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );
    const groupedContext: Record<string, Array<BookmarkListResponse>> = {};
    const groupedContexts: Record<string, Context | undefined> = {};
    const bookmarksGroupByContextId: Record<string, Array<BookmarkListResponse>> = allBookmarks
        ? allBookmarks.reduce((__prev, curr) => {
              const key = curr.context ? curr.context.id : 'unknown';
              if (groupedContext[key]) {
                  const bookmarks = groupedContext[key];
                  bookmarks.push(curr);
              } else {
                  groupedContext[key] = [curr];
              }
              return groupedContext;
          }, {})
        : {};

    const groupByContextId: Record<string, Context> = allBookmarks
        ? allBookmarks.reduce((__prev, curr) => {
              const key = curr.context ? curr.context.id : 'unknown';
              if (!groupedContexts[key]) {
                  groupedContexts[key] = curr.context;
              }
              return groupedContexts;
          }, {})
        : {};

    useEffect(() => {
        setOpenAccordions({
            [currentContext.id]: true,
        });
    }, [currentContext.id]);

    if (!allBookmarks || !allBookmarks.length) {
        return (
            <ErrorMessage
                hasError
                errorType="noData"
                title="No bookmarks"
                message="No bookmarks for this app"
            />
        );
    }

    if (bookmarkState === 'Creating') {
        return (
            <BookmarkForm
                onCancel={() => setBookmarkState('AllBookmarks')}
                onSave={onSave}
                contextName={currentContext.title}
            />
        );
    }

    if (bookmarkState === 'Editing') {
        return (
            <BookmarkForm
                onCancel={() => setBookmarkState('AllBookmarks')}
                onEditSave={onEditSave}
                contextName={currentContext.title}
                bookmark={editBookmark}
            />
        );
    }

    return (
        <Accordion>
            {Object.values(groupByContextId).map((context) => {
                return (
                    <AccordionItem
                        label={context.name}
                        key={context.id}
                        isOpen={openAccordions[context.id]}
                        onChange={() => handleOpenAccordionChange(context.id)}
                    >
                        {Object.values(bookmarksGroupByContextId[context.id]).map(
                            (bookmark: BookmarkListResponse) => {
                                return (
                                    <Bookmark
                                        bookmark={bookmark}
                                        applyBookmark={applyBookmark}
                                        accordionOpen={openAccordions[context.id]}
                                        setBookmarkState={setBookmarkState}
                                        setEditBookmark={setEditBookmark}
                                    />
                                );
                            }
                        )}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

export default AllBookmarks;
