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
};

export const BookmarksManager = <T extends unknown, TPromise extends unknown>({
    capturePayload,
    applyBookmark,
    name,
    anchorId,
}: BookmarksManagerProps<T, TPromise>): JSX.Element => {
    const [isSideSheetOpen, setIsSideSheetOpen] = useState<boolean>(false);

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
            <BookmarkProvider onBookmarkApplied={onBookmarkApplied}>
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
                />
            </BookmarkProvider>
        </>
    );
};

export default BookmarksManager;
