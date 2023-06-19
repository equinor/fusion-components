import { BookmarkPayloadResponse } from '@equinor/fusion';
import { useCallback, useState } from 'react';
import BookmarksManagerSideSheetOptions from './BookmarksManagerSideSheetOptions';

type BookmarkPayload<TPayload> = Omit<BookmarkPayloadResponse, 'payload'> & {
    payload: TPayload;
};

export type BookmarksManagerProps<TPayload, TPromise> = {
    capturePayload: () => Promise<TPayload>;
    applyBookmark: (
        bookmarkPayload: BookmarkPayload<TPayload>,
        awaitForContextSwitch: boolean
    ) => Promise<TPromise>;
    name: string;
    anchorId: string;
    hasContext: boolean;
    onBookmarkDeleted?: () => void;
    onBookmarkEdited?: () => void;
    openOnCreate?: boolean;
    disableCreateButton?: boolean;
};

export const BookmarksManager = <T extends unknown, TPromise extends unknown>({
    capturePayload,
    applyBookmark,
    name,
    anchorId,
    hasContext,
    onBookmarkDeleted,
    onBookmarkEdited,
    openOnCreate,
    disableCreateButton = false,
}: BookmarksManagerProps<T, TPromise>): JSX.Element => {
    const [isSideSheetOpen, setIsSideSheetOpten] = useState<boolean>(false);

    return (
        <BookmarksManagerSideSheetOptions
            capturePayload={capturePayload}
            applyBookmark={applyBookmark}
            name={name}
            anchorId={anchorId}
            hasContext={hasContext}
            onBookmarkDeleted={onBookmarkDeleted}
            onBookmarkEdited={onBookmarkEdited}
            openOnCreate={openOnCreate}
            disableCreateButton={disableCreateButton}
            isSideSheetOpen={isSideSheetOpen}
            setIsSideSheetOpen={setIsSideSheetOpten}
        />
    );
};

export default BookmarksManager;
