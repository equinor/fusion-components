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

type BookmarkManagerProps = {
    captureBookmark: () => Promise<models.IReportBookmark>;
};

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ captureBookmark }) => {
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
            />
        </>
    );
};

export default BookmarkManager;
