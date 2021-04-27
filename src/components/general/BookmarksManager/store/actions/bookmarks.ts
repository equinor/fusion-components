import { createAsyncAction, ActionType } from 'typesafe-actions';
import {
    BookmarkListResponse,
    BookmarkRequest,
    HttpClientRequestFailedError,
    BookmarkResponse,
} from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

type FailedErrorType = string | void;
export type ApiError = ActionError<HttpClientRequestFailedError<any>>;
type FetchRequestPayload = {
    appKey: string;
};
export const fetchBookmarks = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_CANCEL'
)<FetchRequestPayload, BookmarkListResponse[], ApiError, FailedErrorType>();
type DeletePayload = {
    bookmarkId: string;
    appKey: string;
};

export const deleteBookmark = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_CANCEL'
)<DeletePayload, DeletePayload, ApiError, FailedErrorType>();

export const addBookmark = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_CANCEL'
)<BookmarkRequest, BookmarkResponse, ApiError, FailedErrorType>();
type UpdatePayload = {
    bookmark: Partial<Omit<BookmarkRequest, 'appKey' | 'contextId'>>;
    bookmarkId: string;
};
export const updateBookmark = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_CANCEL'
)<UpdatePayload, BookmarkResponse, ApiError, string | void>();
export const actions = {
    fetch: fetchBookmarks,
    delete: deleteBookmark,
    add: addBookmark,
    update: updateBookmark,
};
export type BookmarksActions = ActionType<typeof actions>;
export default actions;
