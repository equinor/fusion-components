import {
    HeaderAppAsidePortal,
    IconButton,
    useTooltipRef,
    BookmarksIcon,
    styling,
    useAnchor,
} from '@equinor/fusion-components';
import { useCallback, useState } from 'react';
import BookmarkSideSheet from './BookmarkSideSheet';

export type ApplyBookmark<TPayload> = {
    id: string;
    name: string;
    appKey: string;
    context: {
        name: string;
        id: string;
    };
    payload: TPayload;
};

export type BookmarksManagerProps<TPayload> = {
    capturePayload: () => Promise<TPayload>;
    applyBookmark: (bookmarkSetting: ApplyBookmark<TPayload>) => Promise<void>;
    name: string;
    anchorId: string;
};

function BookmarksManager<T>(props: BookmarksManagerProps<T>) {
    const [isSideSheetOpen, setIsSideSheetOpen] = useState<boolean>(false);
    const openSideSheet = useCallback(() => setIsSideSheetOpen(true), []);
    const closeSideSheet = useCallback(() => setIsSideSheetOpen(false), []);
    const tooltipRef = useTooltipRef(props.name);
    const ref = useAnchor<HTMLButtonElement>({ id: props.anchorId, scope: 'portal' });
    return (
        <>
            <HeaderAppAsidePortal>
                <div ref={tooltipRef}>
                    <IconButton onClick={openSideSheet} ref={ref}>
                        <BookmarksIcon color={styling.colors.blackAlt2} />
                    </IconButton>
                </div>
            </HeaderAppAsidePortal>
            <BookmarkSideSheet isOpen={isSideSheetOpen} onClose={closeSideSheet} {...props} />
        </>
    );
}

export default BookmarksManager;
