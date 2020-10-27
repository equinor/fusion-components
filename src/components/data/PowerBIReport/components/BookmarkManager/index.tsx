import {
    HeaderContentPortal,
    IconButton,
    BookmarksIcon,
    useTooltipRef,
    styling,
    HeaderAppAsidePortal,
} from '@equinor/fusion-components';
import * as React from 'react';
import BookmarkSideSheet from './BookmarkSideSheet';
import { models } from 'powerbi-client';
import * as styles from './styles.less';

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
    return (
        <>
            <HeaderAppAsidePortal>
                <IconButton onClick={openSideSheet} ref={tooltipRef}>
                    <BookmarksIcon color={styling.colors.blackAlt2} />
                </IconButton>
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
