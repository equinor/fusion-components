import { useAppSettings, useCurrentApp, useCurrentContext } from '@equinor/fusion';
import { useCallback, useMemo } from 'react';

export type Bookmark<T> = {
    bookmarkName: string;
    bookmarkId: string;
    bookMark: T | null;
};

export type BookmarkContext<T> = {
    contextName: string;
    contextId: string;
    bookmarks?: Bookmark<T>[];
};
type ContextSetting<T> = {
    fusionContext?: BookmarkContext<T>[];
};

type UseBookmarksProps<T> = {
    allBookmarks: BookmarkContext<T>[];
    updateBookmark: (
        bookmark: Bookmark<T>,
        operation: UpdateBookmarkOperation,
        contextId?: string
    ) => void;
    currentContextName: string;
    currentContextId: string;
};

export type UpdateBookmarkOperation = 'update' | 'add' | 'delete';

const contextSelector = <T>(state: ContextSetting<T>, contextId: string) =>
    state?.fusionContext?.find((c) => c.contextId === contextId)?.bookmarks || [];

const getUpdatedBookmark = <T>(
    appSettings: ContextSetting<T>,
    bookmark: Bookmark<T>,
    operation: UpdateBookmarkOperation,
    contextId: string
) => {
    const currentContextBookmarks = contextSelector(appSettings, contextId);
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

export default <T>(hasContext?: boolean): UseBookmarksProps<T> => {
    const currentContext = useCurrentContext();
    const currentApp = useCurrentApp();
    const [appSettings, setAppSettings] = useAppSettings<ContextSetting<T>>({ fusionContext: [] });

    const currentContextName = useMemo(
        () => (hasContext ? currentContext?.title : currentApp?.name) || 'Global',
        [currentContext, currentApp, hasContext]
    );

    const currentContextId = useMemo(
        () => (hasContext ? currentContext?.id : currentApp?.key) || 'global',
        [currentContext, currentApp, hasContext]
    );

    const updateBookmarkContext = useCallback(
        (newBookmarkContext: BookmarkContext<T>) => {
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
        (bookmark: Bookmark<T>, operation: UpdateBookmarkOperation, contextId?: string) => {
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
            const updatedContextBookmark: BookmarkContext<T> = {
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