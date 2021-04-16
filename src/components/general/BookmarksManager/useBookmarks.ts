import { useAppSettings, useCurrentApp, useCurrentContext } from '@equinor/fusion';
import { useMemo } from 'react';

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
    currentContextName: string;
    currentContextId: string;
};

export default <T>(hasContext?: boolean): UseBookmarksProps<T> => {
    const currentContext = useCurrentContext();
    const currentApp = useCurrentApp();

    /**
     * @todo Different hook for the new bookmark service
     * @todo change useAppSettings with the new service
     */
    const [appSettings, setAppSettings] = useAppSettings<ContextSetting<T>>({ fusionContext: [] });
    const currentContextName = useMemo(
        () => (hasContext ? currentContext?.title : currentApp.name) || 'Global',
        [currentContext, currentApp, hasContext]
    );
    const currentContextId = useMemo(
        () => (hasContext ? currentContext?.id : currentApp?.key) || 'global',
        [currentContext, currentApp, hasContext]
    );

    return {
        allBookmarks: appSettings.fusionContext || [],
        currentContextId,
        currentContextName,
    };
};
