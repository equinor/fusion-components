import {
    HeaderContentPortal,
    IconButton,
    BookmarksIcon,
    useTooltipRef,
} from '@equinor/fusion-components';
import * as React from 'react';
import BookmarkSideSheet from './BookmarkSideSheet';
import { models } from 'powerbi-client';
import * as styles from './styles.less';
import { PBIBookmark } from './useBookmarks';

type BookmarkManagerProps = {
    captureBookmark: () => Promise<models.IReportBookmark>;
    applyBookmark: (bookmark: PBIBookmark) => Promise<void>;
};

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ captureBookmark, applyBookmark }) => {
    const [isSideSheetOpen, setIsSideSheetOpen] = React.useState<boolean>(false);
    const openSideSheet = React.useCallback(() => setIsSideSheetOpen(true), []);
    const closeSideSheet = React.useCallback(() => setIsSideSheetOpen(false), []);

    const tooltipRef = useTooltipRef('Power BI bookmarks');
    return (
        <>
            <HeaderContentPortal>
                <div className={styles.bookmarkButton}>
                    <IconButton onClick={openSideSheet} ref={tooltipRef}>
                        <BookmarksIcon />
                    </IconButton>
                </div>
            </HeaderContentPortal>
            <BookmarkSideSheet
                isOpen={isSideSheetOpen}
                onClose={closeSideSheet}
                captureBookmark={captureBookmark}
                applyBookmark={applyBookmark}
            />
        </>
    );
};

export default BookmarkManager;
