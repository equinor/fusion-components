import { ModalSideSheet, Tabs, Tab } from '@equinor/fusion-components';
import NewBookmark from './components/NewBookmark';
import { models } from 'powerbi-client';
import useBookmarks, { PBIBookmark } from './useBookmarks';
import * as styles from './styles.less';
import AllBookmarks from './components/AllBookmarks';
import { useContextManager } from '@equinor/fusion';
import { useState, useCallback, FC } from 'react';

type BookmarkSideSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    captureBookmark: () => Promise<models.IReportBookmark | undefined>;
    applyBookmark: (bookmark: string, awaitForContextSwitch: boolean) => Promise<void>;
    hasContext?: boolean;
};

type TabKey = 'add-new' | 'see-all' | string;

const BookmarkSideSheet: FC<BookmarkSideSheetProps> = ({
    isOpen,
    onClose,
    captureBookmark,
    applyBookmark,
    hasContext,
}) => {
    const [selectedTabKey, setSelectedTabKey] = useState<TabKey>('add-new');
    const { currentContextName, currentContextId, updateBookmark, allBookmarks } = useBookmarks(
        hasContext
    );
    const contextManager = useContextManager();

    const captureAndSaveBookmarkAsync = useCallback(
        async (bookmarkName: string) => {
            try {
                const bookmark = await captureBookmark();
                if (!bookmark?.state) {
                    return;
                }
                updateBookmark(
                    {
                        bookMark: bookmark.state,
                        bookmarkId: (new Date().getTime() + Math.random()).toString(),
                        bookmarkName,
                    },
                    'add'
                );
            } catch (e) {
                console.error(e);
            }
        },
        [updateBookmark, captureBookmark]
    );

    const selectBookmark = useCallback(
        async (bookmark: PBIBookmark, contextId: string) => {
            onClose();
            if (!bookmark.bookMark) {
                return;
            }
            if (currentContextId !== contextId) {
                await contextManager.setCurrentContextIdAsync(contextId);
                applyBookmark(bookmark.bookMark, true);
                return;
            }

            applyBookmark(bookmark.bookMark, false);
        },
        [applyBookmark, currentContextId]
    );

    const updateSelectedTab = useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

    return (
        <ModalSideSheet header="Power BI bookmarks" onClose={onClose} show={isOpen} size="medium">
            <Tabs activeTabKey={selectedTabKey} onChange={updateSelectedTab}>
                <Tab tabKey="add-new" title="Add new" isCurrent={selectedTabKey === 'add-new'}>
                    <NewBookmark
                        contextName={currentContextName}
                        onCancel={onClose}
                        onSave={captureAndSaveBookmarkAsync}
                    />
                </Tab>
                <Tab tabKey="se-all" title="See all" isCurrent={selectedTabKey === 'see-all'}>
                    <div className={styles.container}>
                        <AllBookmarks
                            allBookmarks={allBookmarks}
                            currentContextId={currentContextId}
                            updateBookmark={updateBookmark}
                            onBookmarkSelect={selectBookmark}
                        />
                    </div>
                </Tab>
            </Tabs>
        </ModalSideSheet>
    );
};
export default BookmarkSideSheet;
