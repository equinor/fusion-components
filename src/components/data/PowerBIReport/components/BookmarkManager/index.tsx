import {
    HeaderContentPortal,
    IconButton,
    BookmarksIcon,
    useTooltipRef,
    styling,
    HeaderAppAsidePortal,
    useAnchor,
} from '@equinor/fusion-components';
import * as React from 'react';
import BookmarkSideSheet from './BookmarkSideSheet';
import { models } from 'powerbi-client';

type BookmarkManagerProps = {
    captureBookmark: () => Promise<models.IReportBookmark | undefined>;
    applyBookmark: (bookmark: string, awaitForContextSwitch: boolean) => Promise<void>;
    hasContext?: boolean;
};

const BookmarkManager: React.FC<BookmarkManagerProps> = ({
    captureBookmark,
    applyBookmark,
    hasContext,
}) => {
    const [isSideSheetOpen, setIsSideSheetOpen] = React.useState<boolean>(false);
    const openSideSheet = React.useCallback(() => setIsSideSheetOpen(true), []);
    const closeSideSheet = React.useCallback(() => setIsSideSheetOpen(false), []);

    const tooltipRef = useTooltipRef('Power BI bookmarks');
    const ref = useAnchor<HTMLButtonElement>({ id: 'bookmarks-btn', scope: 'portal' });

    return (
        <>
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
                captureBookmark={captureBookmark}
                applyBookmark={applyBookmark}
                hasContext={hasContext}
            />
        </>
    );
};

export default BookmarkManager;
