// import { createAsyncAction, ActionType } from 'typesafe-actions';
// import {
//     BookmarkListResponse,
//     BookmarkRequest,
//     HttpClientRequestFailedError,
//     BookmarkResponse,
// } from '@equinor/fusion';
// import { ActionError } from '@equinor/fusion/lib/epic';

// type FailedErrorType = string | void;
// type ApiError = ActionError<HttpClientRequestFailedError<any>>;
// type FetchRequestPayload = {
//     appKey: string;
// };
// export const fetchBookmarks = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_CANCEL'
// )<FetchRequestPayload, BookmarkListResponse[], ApiError, FailedErrorType>();
// type DeletePayload = {
//     bookmarkId: string;
//     appKey: string;
// };

// export const deleteBookmark = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_CANCEL'
// )<DeletePayload, DeletePayload, ApiError, FailedErrorType>();

// export const addBookmark = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_CANCEL'
// )<BookmarkRequest, BookmarkResponse, ApiError, FailedErrorType>();

// export const actions = {
//     fetch: fetchBookmarks,
//     delete: deleteBookmark,
//     add: addBookmark,
// };
// export type BookmarksActions = ActionType<typeof actions>;
// export default actions;
