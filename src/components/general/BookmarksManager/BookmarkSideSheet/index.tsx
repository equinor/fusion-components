import { useCurrentApp, useCurrentContext } from '@equinor/fusion';
import { Button, ModalSideSheet, useTooltipRef } from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import { BookmarksManagerProps } from '..';
import BookmarkForm from '../components/BookmarkForm';
import useBookmarks from '../useBookmarks';
import AllBookmarks from './AllBookmarks';

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
    const currentApp = useCurrentApp();
    const currentContext = useCurrentContext();
    const { allBookmarks, saveBookmarkAsync, bookmarksError } = useBookmarks();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const showAllBookmarks = useCallback(() => setIsSaving(false), []);
    const hideAllBookmarks = useCallback(() => setIsSaving(true), []);
    const tooltipRef = useTooltipRef(
        'Add a bookmark to easily get back to this view later.',
        'below'
    );
    const onSave = useCallback(
        async (name: string, description: string, isShared: boolean = false) => {
            try {
                const payload = await capturePayload();
                if (payload) {
                    saveBookmarkAsync({
                        name: name,
                        description: description,
                        payload: payload,
                        appKey: currentApp.key,
                        contextId: currentContext.id,
                        isShared: isShared,
                    });
                    setIsSaving(false);
                }
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );
    const NewBookmarkButton = () => {
        return (
            <Button onClick={hideAllBookmarks} ref={tooltipRef}>
                New bookmark
            </Button>
        );
    };

    return (
        <ModalSideSheet
            header={isSaving ? 'Save filter as bookmark' : 'Bookmarks Manager'}
            onClose={onClose}
            show={isOpen}
            size="medium"
            id={anchorId}
            headerIcons={isSaving ? [] : [<NewBookmarkButton />]}
        >
            {isSaving ? (
                <BookmarkForm
                    onCancel={showAllBookmarks}
                    onSave={onSave}
                    contextName={currentContext.title}
                />
            ) : currentContext ? (
                <AllBookmarks
                    allBookmarks={allBookmarks}
                    currentContextId={currentContext.id}
                    applyBookmark={applyBookmark}
                />
            ) : null}
        </ModalSideSheet>
    );
}

export default BookmarkSideSheet;
