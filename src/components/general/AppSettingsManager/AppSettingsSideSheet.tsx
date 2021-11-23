import { useCallback, useState } from 'react';
import { ModalSideSheet, Tabs, Tab } from '@equinor/fusion-components';
import NewBookmark from './components/NewBookmark';
import useBookmarks, { Bookmark } from './useBookmarks';
import { useStyles } from './AppsettingsSideSheet.style';
import AllBookmarks from './components/AllBookmarks';
import { useContextManager } from '@equinor/fusion';
import { AppSettingsManagerProps } from '.';

type AppSettingsSideSheetProps<T> = AppSettingsManagerProps<T> & {
    isOpen: boolean;
    onClose: () => void;
};

type TabKey = 'add-new' | 'see-all' | string;

function AppSettingsSideSheet<T>({
    isOpen,
    onClose,
    captureAppSetting,
    applyAppSetting,
    hasContext,
    name,
    anchorId,
}: AppSettingsSideSheetProps<T>) {
    const [selectedTabKey, setSelectedTabKey] = useState<TabKey>('add-new');
    const { currentContextName, currentContextId, updateBookmark, allBookmarks } = useBookmarks(
        hasContext
    );
    const styles = useStyles();
    const contextManager = useContextManager();

    const captureAndSaveBookmarkAsync = useCallback(
        async (bookmarkName: string) => {
            try {
                const bookMark = await captureAppSetting();
                if (!bookMark) {
                    return;
                }
                updateBookmark(
                    {
                        bookMark,
                        bookmarkId: (new Date().getTime() + Math.random()).toString(),
                        bookmarkName,
                    },
                    'add'
                );
            } catch (e) { }
        },
        [updateBookmark, captureAppSetting]
    );

    const selectBookmark = useCallback(
        async (bookmark: Bookmark<T>, contextId: string) => {
            onClose();
            if (!bookmark.bookMark) {
                return;
            }
            if (currentContextId !== contextId) {
                await contextManager.setCurrentContextIdAsync(contextId);
                applyAppSetting(bookmark.bookMark, true);
                return;
            }

            applyAppSetting(bookmark.bookMark, false);
        },
        [applyAppSetting, currentContextId]
    );

    const updateSelectedTab = useCallback((tabKey: string) => setSelectedTabKey(tabKey), []);

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
export default AppSettingsSideSheet;
