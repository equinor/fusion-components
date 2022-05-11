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
import { useStyles } from './index.style';
import { BookmarkView } from '../../types';

type OpenAccordion = {
    [id: string]: boolean;
};

type Context = {
    name: string;
    id: string;
    type: string;
};

type AllBookmarksProps<TPayload> = {
    allBookmarks: BookmarkListResponse[] | undefined;
    onClose: () => void;
    currentApp: AppManifest | null;
    capturePayload: () => Promise<TPayload>;
    onViewChanged?: (view: BookmarkView) => void;
    hasContext: boolean;
    openOnCreate: boolean;
    disableCreateButton: boolean;
};

const contextlessBookmark = 'Global';

const createGroupByContextId = (allBookmarks: BookmarkListResponse[]) => {
    const groupedContexts: Record<string, Context> = {};
    allBookmarks.reduce((__prev, curr) => {
        const key = curr.context ? curr.context.id : contextlessBookmark;
        if (!groupedContexts[key]) {
            groupedContexts[key] = curr.context ? curr.context : { id: key, name: key, type: '' };
        }
        return groupedContexts;
    }, {});
    return groupedContexts;
};

const createGroupByContext = (allBookmarks: BookmarkListResponse[]) => {
    const groupedContext: Record<string, BookmarkListResponse[]> = {};
    allBookmarks.reduce((__prev, curr) => {
        const key = curr.context ? curr.context.id : contextlessBookmark;
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

export const SideSheetManager = <T extends unknown>({
    allBookmarks,
    currentApp,
    onClose,
    capturePayload,
    onViewChanged,
    hasContext,
    openOnCreate,
    disableCreateButton,
}: AllBookmarksProps<T>): JSX.Element => {
    const styles = useStyles();
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

    const handleOpenAccordionChange = (id: string) =>
        setOpenAccordions({ ...openAccordions, [id]: !openAccordions[id] });

    const handleBookmarkToBeEdited = (bookmark: BookmarkListResponse) =>
        setBookmarkToBeEdited(bookmark);

    const onViewChange = useCallback(
        (view: BookmarkView) => {
            setBookmarkState(view);
            onViewChanged && onViewChanged(view);
        },
        [setBookmarkState, onViewChanged]
    );

    const onSave = useCallback(
        async (name: string, description: string, isShared = false) => {
            try {
                const payload = await capturePayload();
                if (payload) {
                    store.addBookmark({
                        name: name,
                        description: description,
                        payload: payload,
                        appKey: currentApp?.key,
                        contextId: hasContext ? currentContext?.id : null,
                        isShared: isShared,
                    });
                    onViewChange('AllBookmarks');
                }
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext, capturePayload, onViewChange, store, hasContext]
    );

    const onEditSave = useCallback(
        async (bookmarkId: string, bookmark: BookmarkPatchRequest) => {
            store.updateBookmark(bookmarkId, bookmark);
            onViewChange('AllBookmarks');
        },
        [onViewChange, store]
    );

    useEffect(() => {
        onViewChange(openOnCreate ? 'Creating' : 'AllBookmarks');
    }, [openOnCreate]);

    useEffect(() => {
        currentContext && hasContext
            ? setOpenAccordions({
                [currentContext!.id]: true,
            })
            : setOpenAccordions({ [contextlessBookmark]: true });
    }, [currentContext, hasContext]);

    if (bookmarkState === 'Creating') {
        return (
            <BookmarkForm
                onCancel={() => onViewChange('AllBookmarks')}
                onSave={onSave}
                contextName={hasContext ? currentContext?.title : null}
            />
        );
    }

    if (bookmarkState === 'Editing') {
        return (
            <BookmarkForm
                onCancel={() => onViewChange('AllBookmarks')}
                onEditSave={onEditSave}
                contextName={hasContext ? currentContext?.title : null}
                bookmark={bookmarkToBeEdited}
            />
        );
    }

    return (
        <>
            <div className={styles.buttonContainer}>
                <Button
                    onClick={() => onViewChange('Creating')}
                    ref={tooltipRef}
                    disabled={disableCreateButton}
                >
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
                    {Object.values(createGroupByContextId(allBookmarks)).map((context) => {
                        const bookmarks = Object.values(
                            createGroupByContext(allBookmarks)[context!.id]
                        );
                        return (
                            <AccordionItem
                                label={
                                    hasContext
                                        ? `${context.name} (${context.type})`
                                        : contextlessBookmark
                                }
                                key={context.id}
                                isOpen={openAccordions[context.id]}
                                onChange={() => handleOpenAccordionChange(context.id)}
                            >
                                {bookmarks?.map((bookmark: BookmarkListResponse) => {
                                    return (
                                        <Bookmark
                                            bookmark={bookmark}
                                            accordionOpen={openAccordions[context!.id]}
                                            onViewChange={onViewChange}
                                            setEditBookmark={handleBookmarkToBeEdited}
                                            onClose={onClose}
                                            key={bookmark.id}
                                        />
                                    );
                                })}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            )}
        </>
    );
};

export default SideSheetManager;
