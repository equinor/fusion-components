import { useAppSettings, useCurrentApp, useCurrentContext } from '@equinor/fusion';
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

export type UpdateBookmarkOperation = 'update' | 'add' | 'delete';

const getUpdatedBookmark = (
    currentContextBookmarks: PBIBookmark[],
    bookmark: PBIBookmark,
    operation: UpdateBookmarkOperation
) => {
    switch (operation) {
        case 'update':
            return currentContextBookmarks.map((b) =>
                b.bookmarkId === bookmark.bookmarkId ? bookmark : b
            );
        case 'add':
            return [...currentContextBookmarks, bookmark];
        case 'delete':
            return currentContextBookmarks.filter((b) => b.bookmarkId !== bookmark.bookmarkId);
    }
};

export default (): {
    currentContextBookmarks: PBIBookmark[];
    allBookmarks: BookmarkContext[];
    updateBookmark: (bookmark: PBIBookmark, operation: UpdateBookmarkOperation) => void;
    currentContextName: string;
    currentContextId: string;
} => {
    const currentContext = useCurrentContext();
    const currentApp = useCurrentApp();
    const [appSettings, setAppSettings] = useAppSettings<ContextSetting>({ fusionContext: [] });

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
    const currentContextBookmarks = useMemo(() => currentContextSelector(appSettings), [
        appSettings,
        currentContextSelector,
    ]);

    const updateBookmarkContext = useCallback(
        (newBookmarkContext: BookmarkContext) => {
            if (
                appSettings?.fusionContext === undefined ||
                !appSettings.fusionContext.find((c) => c.contextId === newBookmarkContext.contextId)
            ) {
                setAppSettings('fusionContext', [
                    ...(appSettings.fusionContext || []),
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
        (bookmark: PBIBookmark, operation: UpdateBookmarkOperation) => {
            const updatedBookmarks = getUpdatedBookmark(
                currentContextBookmarks,
                bookmark,
                operation
            );
            const updatedContextBookmark: BookmarkContext = {
                bookmarks: updatedBookmarks,
                contextId: currentContextId,
                contextName: currentContextName,
            };
            updateBookmarkContext(updatedContextBookmark);
        },
        [currentContextId, currentContextBookmarks, appSettings, updateBookmarkContext]
    );

    return {
        currentContextBookmarks,
        allBookmarks: appSettings.fusionContext || [],
        updateBookmark,
        currentContextName,
        currentContextId,
    };
};
