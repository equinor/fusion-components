import { useCurrentApp, useSelector } from '@equinor/fusion';
import { ModalSideSheet } from '@equinor/fusion-components';
import { useEffect, useState } from 'react';
import { BookmarksManagerProps } from '..';
import SideSheetManager from './SideSheetManager';
import useBookmarkContext from '../hooks/useBookmarkContext';
import { BookmarkView } from '../types';

type BookmarkSideSheetProps<T> = Pick<
    BookmarksManagerProps<T>,
    'anchorId' | 'capturePayload' | 'bookmarkIdFromUrl'
> & {
    isOpen: boolean;
    onClose: () => void;
};

const BookmarkSideSheet = <T extends unknown>({
    isOpen,
    onClose,
    anchorId,
    capturePayload,
    bookmarkIdFromUrl,
}: BookmarkSideSheetProps<T>): JSX.Element => {
    const [title, setTitle] = useState<string>('Bookmarks Manager');

    const { store } = useBookmarkContext();
    const bookmarks = useSelector(store, 'bookmarks');
    const currentApp = useCurrentApp();

    const onViewChanged = (view: BookmarkView) => {
        setTitle(view === 'AllBookmarks' ? 'Bookmarks Manager' : 'Save bookmark');
    };

    useEffect(() => {
        store.requestBookmarks(currentApp!.key);
    }, [store, currentApp]);

    useEffect(() => {
        if (bookmarkIdFromUrl) {
            store.headBookmark(bookmarkIdFromUrl);
        }
    }, [bookmarkIdFromUrl, store]);

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
};

export default BookmarkSideSheet;
