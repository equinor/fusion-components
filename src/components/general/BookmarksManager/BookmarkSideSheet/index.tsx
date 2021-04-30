import { useCurrentApp, useNotificationCenter, useSelector } from '@equinor/fusion';
import { ModalSideSheet } from '@equinor/fusion-components';
import { useEffect, useState } from 'react';
import { BookmarksManagerProps } from '..';
import SideSheetManager from './SideSheetManager';
import useBookmarkContext from '../hooks/useBookmarkContext';
import { BookmarkView } from '../types';

type BookmarkSideSheetProps<T> = BookmarksManagerProps<T> & {
    isOpen: boolean;
    onClose: () => void;
};

function BookmarkSideSheet<T>({
    isOpen,
    onClose,
    anchorId,
    capturePayload,
    bookmarkIdFromUrl,
}: BookmarkSideSheetProps<T>) {
    const [title, setTitle] = useState<string>('Bookmarks Manager');
    const { store } = useBookmarkContext();
    const currentApp = useCurrentApp();
    const createNotification = useNotificationCenter();
    const bookmarks = useSelector(store, 'bookmarks');
    const headBookmark = useSelector(store, 'bookmark');
    const onViewChanged = (view: BookmarkView) => {
        setTitle(view === 'AllBookmarks' ? 'Bookmarks Manager' : 'Save bookmark');
    };
    useEffect(() => {
        store.requestBookmarks(currentApp.key);
    }, [store]);
    useEffect(() => {
        if (bookmarkIdFromUrl) {
            store.headBookmark(bookmarkIdFromUrl);
        }
    }, [bookmarkIdFromUrl]);

    useEffect(() => {
        if (headBookmark) {
            const addBookmark = async () => {
                const response = await createNotification({
                    level: 'high',
                    title: `Launched bookmark "${headBookmark.name}" `,
                    confirmLabel: 'Save to my bookmarks',
                    cancelLabel: 'Cancel',
                    body: `${headBookmark.description} Created by: ${headBookmark.createdBy.name}`,
                });
                if (!response.confirmed) return;

                try {
                    store.favouriteBookmark(headBookmark.appKey, headBookmark.id);
                } catch (e) {}
            };
            addBookmark();
        }
    }, [headBookmark]);

    return (
        <ModalSideSheet header={title} onClose={onClose} show={isOpen} size="medium" id={anchorId}>
            <SideSheetManager
                allBookmarks={bookmarks}
                currentApp={currentApp}
                capturePayload={capturePayload}
                onViewChanged={onViewChanged}
                onClose={onClose}
            />
        </ModalSideSheet>
    );
}

export default BookmarkSideSheet;
