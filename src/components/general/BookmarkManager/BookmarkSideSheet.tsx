import * as React from 'react';
import { ModalSideSheet, Tabs, Tab } from '@equinor/fusion-components';
import NewBookmark from './components/NewBookmark';
import useBookmarks, { Bookmark } from './useBookmarks';
import * as styles from './styles.less';
import AllBookmarks from './components/AllBookmarks';
import { useContextManager } from '@equinor/fusion';
import { BookmarkManagerProps } from '.';

type BookmarkSideSheetProps<T> = BookmarkManagerProps<T> & {
    isOpen: boolean;
    onClose: () => void;
};

type TabKey = 'add-new' | 'see-all' | string;

function BookmarkSideSheet<T>({
    isOpen,
    onClose,
    captureBookmark,
    applyBookmark,
    hasContext,
    name,
    anchorId,
}: BookmarkSideSheetProps<T>) {
    const [selectedTabKey, setSelectedTabKey] = React.useState<TabKey>('add-new');
    const { currentContextName, currentContextId, updateBookmark, allBookmarks } = useBookmarks(
        hasContext
    );
    const contextManager = useContextManager();

    const captureAndSaveBookmarkAsync = React.useCallback(
        async (bookmarkName: string) => {
            try {
                const bookmark = await captureBookmark();
                if (!bookmark) {
                    return;
                }
                updateBookmark(
                    {
                        bookMark: bookmark,
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
        async (bookmark: Bookmark<T>, contextId: string) => {
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
        <ModalSideSheet header={name} onClose={onClose} show={isOpen} size="medium" id={anchorId}>
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
}
export default BookmarkSideSheet;
