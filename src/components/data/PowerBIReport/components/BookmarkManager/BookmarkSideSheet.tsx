import * as React from 'react';
import { ModalSideSheet, Tabs, Tab } from '@equinor/fusion-components';
import NewBookmark from './components/NewBookmark';
import { models } from 'powerbi-client';
import useBookmarks, { PBIBookmark } from './useBookmarks';
import * as styles from './styles.less';
import AllBookmarks from './components/AllBookmarks';
import { useContextManager } from '@equinor/fusion';

type BookmarkSideSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    captureBookmark: () => Promise<models.IReportBookmark | undefined>;
    applyBookmark: (bookmark: string, awaitForContextSwitch: boolean) => Promise<void>;
    hasContext?: boolean;
};

type TabKey = 'add-new' | 'see-all' | string;

const BookmarkSideSheet: React.FC<BookmarkSideSheetProps> = ({
    isOpen,
    onClose,
    captureBookmark,
    applyBookmark,
    hasContext,
}) => {
    const [selectedTabKey, setSelectedTabKey] = React.useState<TabKey>('add-new');
    const { currentContextName, currentContextId, updateBookmark, allBookmarks } = useBookmarks(
        hasContext
    );
    const contextManager = useContextManager();

    const captureAndSaveBookmarkAsync = React.useCallback(
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
            } catch (e) {}
        },
        [updateBookmark, captureBookmark]
    );

    const selectBookmark = React.useCallback(
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

    const updateSelectedTab = React.useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

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
