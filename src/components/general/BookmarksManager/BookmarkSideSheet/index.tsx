import { useCurrentApp, useHistory, useSelector } from '@equinor/fusion';
import { ModalSideSheet } from '@equinor/fusion-components';
import { useEffect, useState } from 'react';
import SideSheetManager from './SideSheetManager';
import useBookmarkContext from '../hooks/useBookmarkContext';
import { BookmarkView } from '../types';

type BookmarkSideSheetProps<TPayload> = {
    anchorId: string;
    capturePayload: () => Promise<TPayload>;
    isOpen: boolean;
    onClose: () => void;
    hasContext: boolean;
    openOnCreate?: boolean;
    disableCreateButton: boolean;
};

export const BookmarkSideSheet = <T extends unknown>({
    isOpen,
    onClose,
    anchorId,
    capturePayload,
    hasContext,
    disableCreateButton,
    openOnCreate = false
}: BookmarkSideSheetProps<T>): JSX.Element => {
    const [title, setTitle] = useState<string>('Bookmarks Manager');
    const { store } = useBookmarkContext();
    const bookmarks = useSelector(store, 'bookmarks');
    const currentApp = useCurrentApp();
    const history = useHistory();

    const onViewChanged = (view: BookmarkView) => {
        setTitle(view === 'AllBookmarks' ? 'Bookmarks Manager' : 'Save bookmark');
    };

    useEffect(() => {
        store.requestBookmarks(currentApp!.key);
    }, [store, currentApp]);

    useEffect(() => {
        const urlParams = new URLSearchParams(history.location.search);
        const bookmarkId = urlParams.get('bookmarkId');
        if (bookmarkId) {
            store.headBookmark(bookmarkId);
        }
    }, [history.location, store]);

    return (
        <ModalSideSheet header={title} onClose={onClose} show={isOpen} size="medium" id={anchorId}>
            <SideSheetManager
                allBookmarks={bookmarks}
                currentApp={currentApp}
                capturePayload={capturePayload}
                onViewChanged={onViewChanged}
                onClose={onClose}
                hasContext={hasContext}
                openOnCreate={openOnCreate}
                disableCreateButton={disableCreateButton}
            />
        </ModalSideSheet>
    );
};

export default BookmarkSideSheet;
