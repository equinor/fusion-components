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

const powerBIContextSelector = (state: ContextSetting, contextId: string) =>
    state?.fusionContext?.find((c) => c.contextId === contextId)?.bookmarks || [];

const getUpdatedBookmark = (
    appSettings: ContextSetting,
    bookmark: PBIBookmark,
    operation: UpdateBookmarkOperation,
    contextId: string
) => {
    const currentContextBookmarks = powerBIContextSelector(appSettings, contextId);
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

export default (
    hasContext?: boolean
): {
    allBookmarks: BookmarkContext[];
    updateBookmark: (
        bookmark: PBIBookmark,
        operation: UpdateBookmarkOperation,
        contextId?: string
    ) => void;
    currentContextName: string;
    currentContextId: string;
} => {
    const currentContext = useCurrentContext();
    const currentApp = useCurrentApp();
    const [appSettings, setAppSettings] = useAppSettings<ContextSetting>({ fusionContext: [] });

    const currentContextName = useMemo(
        () => (hasContext ? currentContext?.title : currentApp?.name) || 'Global',
        [currentContext, currentApp, hasContext]
    );

    const currentContextId = useMemo(
        () => (hasContext ? currentContext?.id : currentApp?.key) || 'global',
        [currentContext, currentApp, hasContext]
    );

    const updateBookmarkContext = useCallback(
        (newBookmarkContext: BookmarkContext) => {
            if (
                appSettings?.fusionContext === undefined ||
                !appSettings.fusionContext.some((c) => c.contextId === newBookmarkContext.contextId)
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
        (bookmark: PBIBookmark, operation: UpdateBookmarkOperation, contextId?: string) => {
            const contextIdentification = contextId || currentContextId;
            const contextName = contextId
                ? appSettings.fusionContext.find((c) => c.contextId === contextId)?.contextName ||
                  currentContextName
                : currentContextName;

            const updatedBookmarks = getUpdatedBookmark(
                appSettings,
                bookmark,
                operation,
                contextIdentification
            );
            const updatedContextBookmark: BookmarkContext = {
                bookmarks: updatedBookmarks,
                contextId: contextIdentification,
                contextName: contextName,
            };
            updateBookmarkContext(updatedContextBookmark);
        },
        [currentContextId, appSettings, updateBookmarkContext, currentContextName]
    );

    return {
        allBookmarks: appSettings.fusionContext || [],
        updateBookmark,
        currentContextName,
        currentContextId,
    };
};
