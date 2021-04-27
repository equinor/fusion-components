import { useCurrentApp, useCurrentContext, useSelector } from '@equinor/fusion';
import { Button, ModalSideSheet, useTooltipRef } from '@equinor/fusion-components';
import { useCallback, useEffect, useState } from 'react';
import { BookmarksManagerProps } from '..';
import BookmarkForm from '../components/BookmarkForm';
import AllBookmarks from './AllBookmarks';
import useBookmarkContext from '../hooks/useBookmarkContext';
import {
    useViewContext,
    useViewDispatchContext,
} from '../components/Provider/BookmarkComponentProvider';

type BookmarkState = 'AllBookmarks' | 'Creating' | 'Editing';
type BookmarkSideSheetProps<T> = BookmarksManagerProps<T> & {
    isOpen: boolean;
    onClose: () => void;
};

function BookmarkSideSheet<T>({
    isOpen,
    onClose,
    anchorId,
    capturePayload,
    applyBookmark,
}: BookmarkSideSheetProps<T>) {
    const { store } = useBookmarkContext();
    const currentApp = useCurrentApp();

    // const viewContext = useViewContext();
    // const dispatch = useViewDispatchContext();
    // const showAllBookmarks = useCallback(() => dispatch('AllBookmarks'), []);
    // const hideAllBookmarks = useCallback(() => dispatch('Creating'), []);

    const [bookmarkState, setBookmarkState] = useState<BookmarkState>('AllBookmarks');
    const tooltipRef = useTooltipRef(
        'Add a bookmark to easily get back to this view later.',
        'below'
    );
    const bookmarks = useSelector(store, 'bookmarks');

    const NewBookmarkButton = () => {
        return (
            <Button onClick={() => setBookmarkState('Creating')} ref={tooltipRef}>
                New bookmark
            </Button>
        );
    };

    useEffect(() => {
        store.requestBookmarks(currentApp.key);
    }, [store]);
    return (
        <ModalSideSheet
            header={
                bookmarkState === 'AllBookmarks' ? 'Bookmarks Manager' : 'Save filter as bookmark'
            }
            onClose={onClose}
            show={isOpen}
            size="medium"
            id={anchorId}
            headerIcons={bookmarkState === 'AllBookmarks' ? [<NewBookmarkButton />] : []}
        >
            <AllBookmarks
                allBookmarks={bookmarks}
                currentApp={currentApp}
                applyBookmark={applyBookmark}
                bookmarkState={bookmarkState}
                setBookmarkState={setBookmarkState}
                capturePayload={capturePayload}
            />
        </ModalSideSheet>
    );
}

export default BookmarkSideSheet;
