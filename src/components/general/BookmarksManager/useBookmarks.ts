import { BookmarkResponse, BookmarkRequest, BookmarkListResponse } from '@equinor/fusion';

import { useApiClients, useCurrentApp, useCurrentContext } from '@equinor/fusion';
import { useCallback, useEffect, useState } from 'react';

type UseBookmarksProps = {
    allBookmarks: BookmarkListResponse[];
    saveBookmarkAsync: (bookmark: BookmarkRequest) => void;
    bookmarksError: Error | null;
    isFetchingBookmarks: boolean;
};

export default (): UseBookmarksProps => {
    const currentApp = useCurrentApp();
    const currentContext = useCurrentContext();
    const apiClients = useApiClients();
    const [allBookmarks, setAllBookmarks] = useState<Omit<BookmarkResponse, 'payload'>[]>();
    const [bookmarksError, setBookmarksError] = useState<Error | null>(null);
    const [isFetchingBookmarks, setIsFetchingBookmarks] = useState<boolean>(false);

    const fetchBookmarksAsync = useCallback(async () => {
        setIsFetchingBookmarks(true);
        try {
            const response = await apiClients.bookmarks.getBookmarks(currentApp.key);
            setAllBookmarks(response.data);
        } catch (e) {
            setBookmarksError(e);
        } finally {
            setIsFetchingBookmarks(false);
        }
    }, [apiClients, currentApp]);

    useEffect(() => {
        fetchBookmarksAsync();
    }, []);

    const saveBookmarkAsync = useCallback(
        async (bookmark: BookmarkRequest) => {
            try {
                const response = await apiClients.bookmarks.addBookmark(bookmark);
            } catch (e) {}
        },
        [apiClients, currentApp, currentContext]
    );

    return {
        allBookmarks,
        isFetchingBookmarks,
        saveBookmarkAsync,
        bookmarksError,
    };
};
