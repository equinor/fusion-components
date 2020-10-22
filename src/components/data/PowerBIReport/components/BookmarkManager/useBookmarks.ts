import {
    useAppSettings,
    useCurrentApp,
    useCurrentContext,
    useSettingSelector,
} from '@equinor/fusion';
import { useCallback, useMemo } from 'react';

export type PBIBookmark = {
    bookmarkName: string;
    bookmarkId: string;
    bookMark: string | null;
};

export type BookmarkContext = {
    contextName: string;
    contextId: string;
    bookmarks?: PBIBookmark[];
};
type ContextSetting = {
    fusionContext?: BookmarkContext[];
};

type UpdateBookmarkOperation = 'update' | 'add' | 'delete';

const getUpdatedBookmark = (
    currentContextBookmarks: PBIBookmark[],
    newBookmark: PBIBookmark,
    operation: UpdateBookmarkOperation
) => {
    switch (operation) {
        case 'update':
            return currentContextBookmarks.map((b) =>
                b.bookmarkId === newBookmark.bookmarkId ? newBookmark : b
            );
        case 'add':
            return [...currentContextBookmarks, newBookmark];
        case 'delete':
            return currentContextBookmarks.filter((b) => b.bookmarkId !== newBookmark.bookmarkId);
    }
};

export default (): {
    currentContextBookmarks: PBIBookmark[];
    allBookmarks: BookmarkContext[];
    updateBookmark: (newBookmark: PBIBookmark, operation: UpdateBookmarkOperation) => void;
    currentContextName: string;
} => {
    const currentContext = useCurrentContext();
    const currentApp = useCurrentApp();
    const [appSettings, setAppSettings] = useAppSettings<ContextSetting>();

    const currentContextName = useMemo(
        () => currentContext?.title || currentApp?.name || 'Global',
        [currentContext, currentApp]
    );

    const currentContextId = useMemo(() => currentContext?.id || currentApp?.key || 'global', [
        currentContext,
        currentApp,
    ]);

    const currentContextSelector = useCallback(
        (state: ContextSetting) =>
            state?.fusionContext?.find((c) => c.contextId === currentContextId)?.bookmarks || [],
        [currentContextId]
    );
    const currentContextBookmarks = useSettingSelector<ContextSetting, PBIBookmark[]>(
        currentContextSelector,
        appSettings
    );

    const updateBookmarkContext = useCallback(
        (newBookmarkContext: BookmarkContext) => {
            if (
                appSettings?.fusionContext === undefined ||
                !appSettings.fusionContext.find((c) => c.contextId === newBookmarkContext.contextId)
            ) {
                setAppSettings('fusionContext', [
                    ...appSettings?.fusionContext,
                    newBookmarkContext,
                ]);
                return;
            }
            setAppSettings(
                'fusionContext',
                appSettings?.fusionContext?.map((c) =>
                    c.contextId === newBookmarkContext.contextId ? newBookmarkContext : c
                ) || []
            );
        },
        [appSettings]
    );

    const updateBookmark = useCallback(
        (newBookmark: PBIBookmark, operation: UpdateBookmarkOperation) => {
            const updatedBookmarks = getUpdatedBookmark(
                currentContextBookmarks,
                newBookmark,
                operation
            );
            const updatedContextBookmark: BookmarkContext = {
                bookmarks: updatedBookmarks,
                contextId: currentContextId,
                contextName: currentContextName,
            };
            updateBookmarkContext(updatedContextBookmark);
        },
        [currentContextId, currentContextBookmarks, appSettings]
    );

    return {
        currentContextBookmarks,
        allBookmarks: appSettings.fusionContext,
        updateBookmark,
        currentContextName,
    };
};
