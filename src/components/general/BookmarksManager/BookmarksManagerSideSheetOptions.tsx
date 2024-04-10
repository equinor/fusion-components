import {
    HeaderAppAsidePortal,
    IconButton,
    useTooltipRef,
    BookmarksIcon,
    styling,
    useAnchor,
} from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import BookmarkProvider from './BookmarkProvider';
import BookmarkSideSheet from './BookmarkSideSheet';
import { BookmarkPayloadResponse } from '@equinor/fusion';

export type BookmarkPayload<TPayload> = Omit<BookmarkPayloadResponse, 'payload'> & {
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
    isSideSheetOpen: boolean;
    setIsSideSheetOpen: (open: boolean) => void;
    disableCreateButton?: boolean;
};

export const BookmarksManagerSideSheetOptions = <T extends unknown, TPromise extends unknown>({
    capturePayload,
    applyBookmark,
    name,
    anchorId,
    hasContext,
    onBookmarkDeleted,
    onBookmarkEdited,
    openOnCreate,
    isSideSheetOpen,
    setIsSideSheetOpen,
    disableCreateButton = false,
}: BookmarksManagerProps<T, TPromise>): JSX.Element => {
    const tooltipRef = useTooltipRef(name);
    const ref = useAnchor<HTMLButtonElement>({ id: anchorId, scope: 'portal' });

    const openSideSheet = useCallback(() => setIsSideSheetOpen(true), []);
    const closeSideSheet = useCallback(() => setIsSideSheetOpen(false), []);
    const onBookmarkApplied = useCallback(
        async (bookmark: BookmarkPayloadResponse, awaitForContextSwitch: boolean) => {
            await applyBookmark(
                {
                    id: bookmark.id,
                    context: bookmark.context,
                    payload: bookmark.payload as T,
                },
                awaitForContextSwitch
            );
        },
        [applyBookmark]
    );

    return (
        <>
            <BookmarkProvider
                onBookmarkApplied={onBookmarkApplied}
                onBookmarkEdited={onBookmarkEdited}
                onBookmarkDeleted={onBookmarkDeleted}
            >
                <HeaderAppAsidePortal>
                    <div ref={tooltipRef}>
                        <IconButton onClick={openSideSheet} ref={ref}>
                            <BookmarksIcon color={styling.colors.blackAlt2} />
                        </IconButton>
                    </div>
                </HeaderAppAsidePortal>
                <BookmarkSideSheet
                    isOpen={isSideSheetOpen}
                    onClose={closeSideSheet}
                    capturePayload={capturePayload}
                    anchorId={anchorId}
                    hasContext={hasContext}
                    openOnCreate={openOnCreate}
                    disableCreateButton={disableCreateButton}
                />
            </BookmarkProvider>
        </>
    );
};

export default BookmarksManagerSideSheetOptions;
