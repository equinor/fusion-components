// import { BookmarkResponse, BookmarkRequest, BookmarkListResponse } from '@equinor/fusion';

// import { useApiClients, useCurrentApp, useCurrentContext } from '@equinor/fusion';
// import { useCallback, useEffect, useState } from 'react';

// type UseBookmarksProps = {
//     allBookmarks: BookmarkListResponse[];
//     saveBookmarkAsync: (bookmark: BookmarkRequest) => void;
//     editBookmarkAsync: (
//         bookmarkId: string,
//         bookmark: Partial<Omit<BookmarkRequest, 'appkey' | 'contextId'>>
//     ) => void;
//     deleteBookmarkAsync: (bookmarkId: string) => void;
//     bookmarksError: Error | null;
//     isFetchingBookmarks: boolean;
// };

// export default (): UseBookmarksProps => {
//     const currentApp = useCurrentApp();
//     const currentContext = useCurrentContext();
//     const apiClients = useApiClients();
//     const [allBookmarks, setAllBookmarks] = useState<Omit<BookmarkResponse, 'payload'>[]>();
//     const [bookmarksError, setBookmarksError] = useState<Error | null>(null);
//     const [isFetchingBookmarks, setIsFetchingBookmarks] = useState<boolean>(false);

//     const fetchBookmarksAsync = useCallback(async () => {
//         setIsFetchingBookmarks(true);
//         try {
//             const response = await apiClients.bookmarks.getBookmarks(currentApp.key);
//             setAllBookmarks(response.data);
//         } catch (e) {
//             setBookmarksError(e);
//         } finally {
//             setIsFetchingBookmarks(false);
//         }
//     }, [apiClients, currentApp]);

//     const saveBookmarkAsync = useCallback(
//         async (bookmark: BookmarkRequest) => {
//             try {
//                 const response = await apiClients.bookmarks.addBookmark(bookmark);
//                 return response;
//             } catch (e) {}
//         },
//         [apiClients, currentApp, currentContext]
//     );

//     const editBookmarkAsync = useCallback(
//         async (
//             bookmarkId: string,
//             bookmark: Partial<Omit<BookmarkRequest, 'appkey' | 'contextId'>>
//         ) => {
//             try {
//                 const response = await apiClients.bookmarks.updateBookmark(bookmarkId, bookmark);
//                 return response;
//             } catch (e) {}
//         },
//         [apiClients, currentApp, currentContext]
//     );
//     const deleteBookmarkAsync = useCallback(
//         async (bookmarkId: string) => {
//             try {
//                 await apiClients.bookmarks.deleteBookmark(bookmarkId);
//             } catch (e) {}
//         },
//         [apiClients, currentApp, currentContext]
//     );
//     useEffect(() => {
//         fetchBookmarksAsync();
//     }, []);
//     return {
//         allBookmarks,
//         isFetchingBookmarks,
//         saveBookmarkAsync,
//         editBookmarkAsync,
//         deleteBookmarkAsync,
//         bookmarksError,
//     };
// };
