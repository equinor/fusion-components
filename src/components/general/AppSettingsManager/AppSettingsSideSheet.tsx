import * as React from 'react';
import { ModalSideSheet, Tabs, Tab } from '@equinor/fusion-components';
import NewBookmark from './components/NewBookmark';
import useBookmarks, { Bookmark } from './useBookmarks';
import * as styles from './styles.less';
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
    const [selectedTabKey, setSelectedTabKey] = React.useState<TabKey>('add-new');
    const { currentContextName, currentContextId, updateBookmark, allBookmarks } = useBookmarks(
        hasContext
    );
    const contextManager = useContextManager();

    const captureAndSaveBookmarkAsync = React.useCallback(
        async (bookmarkName: string) => {
            try {
                const bookmark = await captureAppSetting();
                if (!bookmark) {
                    return;
                }
                updateBookmark(
                    {
                        bookmark,
                        bookmarkId: (new Date().getTime() + Math.random()).toString(),
                        bookmarkName,
                    },
                    'add'
                );
            } catch (e) {}
        },
        [updateBookmark, captureAppSetting]
    );

    const selectBookmark = React.useCallback(
        async (bookmark: Bookmark<T>, contextId: string) => {
            onClose();
            if (!bookmark.bookmark) {
                return;
            }
            if (currentContextId !== contextId) {
                await contextManager.setCurrentContextIdAsync(contextId);
                applyAppSetting(bookmark.bookmark, true);
                return;
            }

            applyAppSetting(bookmark.bookmark, false);
        },
        [applyAppSetting, currentContextId]
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
export default AppSettingsSideSheet;
