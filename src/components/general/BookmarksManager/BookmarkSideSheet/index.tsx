import { useCurrentApp, useCurrentContext } from '.yalc/@equinor/fusion/lib';
import { Button, ModalSideSheet } from '@equinor/fusion-components';
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
    name,
    anchorId,
    capturePayload,
    applyBookmark,
}: BookmarkSideSheetProps<T>) {
    const currentApp = useCurrentApp();
    const currentContext = useCurrentContext();
    const { allBookmarks, saveBookmarkAsync } = useBookmarks();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const showAllBookmarks = useCallback(() => setIsSaving(false), []);
    const hideAllBookmarks = useCallback(() => setIsSaving(true), []);
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
                }
            } catch (e) {
                console.error(e);
            }
        },
        [currentApp, currentContext]
    );
    return (
        <ModalSideSheet
            header={name}
            onClose={onClose}
            show={isOpen}
            size="medium"
            id={anchorId}
            headerIcons={[<Button onClick={hideAllBookmarks}>New bookmark</Button>]}
        >
            {isSaving ? (
                <BookmarkForm
                    onCancel={showAllBookmarks}
                    onSave={onSave}
                    contextName={currentContext.title}
                />
            ) : (
                <AllBookmarks
                    allBookmarks={allBookmarks}
                    currentContextId={currentContext.id}
                    applyBookmark={applyBookmark}
                />
            )}
        </ModalSideSheet>
    );
}

export default BookmarkSideSheet;
