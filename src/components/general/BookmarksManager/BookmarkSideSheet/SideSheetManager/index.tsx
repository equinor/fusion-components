import {
    AppManifest,
    BookmarkListResponse,
    BookmarkPatchRequest,
    useCurrentContext,
} from '@equinor/fusion';
import {
    Accordion,
    AccordionItem,
    Button,
    ErrorMessage,
    useTooltipRef,
} from '@equinor/fusion-components';
import { useEffect, useState, useCallback } from 'react';
import Bookmark from './Bookmark';
import BookmarkForm from './BookmarkForm';
import useBookmarkContext from '../../hooks/useBookmarkContext';
import styles from './styles.less';
import { BookmarkView } from '../../types';
type OpenAccordion = {
    [id: string]: boolean;
};
type Context = {
    name: string;
    id: string;
};

type AllBookmarksProps<TPayload> = {
    allBookmarks: BookmarkListResponse[];
    onClose: () => void;
    currentApp: AppManifest;
    capturePayload: () => Promise<TPayload>;
    onViewChanged?: (view: BookmarkView) => void;
};

function SideSheetManager<T>({
    allBookmarks,
    currentApp,
    onClose,
    capturePayload,
    onViewChanged,
}: AllBookmarksProps<T>) {
    const [openAccordions, setOpenAccordions] = useState<OpenAccordion>({});
    const [bookmarkToBeEdited, setBookmarkToBeEdited] = useState<BookmarkListResponse | undefined>(
        undefined
    );
    const [bookmarkState, setBookmarkState] = useState<BookmarkView>('AllBookmarks');

    const { store } = useBookmarkContext();
    const currentContext = useCurrentContext();
    const tooltipRef = useTooltipRef(
        'Add a bookmark to easily get back to this view later.',
        'left',
        1000
    );

    function handleOpenAccordionChange(id: string) {
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });
    }
    const onViewChange = (view: BookmarkView) => {
        setBookmarkState(view);
        onViewChanged && onViewChanged(view);
    };
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
                    onViewChange('AllBookmarks');
                }
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );
    const onEditSave = useCallback(
        async (bookmarkId: string, bookmark: BookmarkPatchRequest) => {
            try {
                store.updateBookmark(bookmarkId, bookmark);
                onViewChange('AllBookmarks');
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );

    const groupedContext: Record<string, BookmarkListResponse[]> = {};
    const groupedContexts: Record<string, Context | undefined> = {};

    const bookmarksGroupByContextId: Record<string, BookmarkListResponse[]> = allBookmarks
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

    if (bookmarkState === 'Creating') {
        return (
            <BookmarkForm
                onCancel={() => onViewChange('AllBookmarks')}
                onSave={onSave}
                contextName={currentContext.title}
            />
        );
    }

    if (bookmarkState === 'Editing') {
        return (
            <BookmarkForm
                onCancel={() => onViewChange('AllBookmarks')}
                onEditSave={onEditSave}
                contextName={currentContext.title}
                bookmark={bookmarkToBeEdited}
            />
        );
    }

    return (
        <>
            <div className={styles.buttonContainer}>
                <Button onClick={() => onViewChange('Creating')} ref={tooltipRef}>
                    New bookmark
                </Button>
            </div>

            {!allBookmarks || allBookmarks.length === 0 ? (
                <ErrorMessage
                    hasError
                    errorType="noData"
                    title="No bookmarks"
                    message="No bookmarks for this app"
                />
            ) : (
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
                                                accordionOpen={openAccordions[context.id]}
                                                onViewChange={onViewChange}
                                                setEditBookmark={setBookmarkToBeEdited}
                                                onClose={onClose}
                                                key={bookmark.id}
                                            />
                                        );
                                    }
                                )}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
}

export default SideSheetManager;
