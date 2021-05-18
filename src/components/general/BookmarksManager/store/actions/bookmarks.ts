import { createAsyncAction, ActionType } from 'typesafe-actions';
import {
    BookmarkListResponse,
    BookmarkRequest,
    HttpClientRequestFailedError,
    BookmarkResponse,
    BookmarkPayloadResponse,
} from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

type FailedErrorType = string | void;
export type ApiError = ActionError<HttpClientRequestFailedError<any>>;

export type ApiErrorHead = ActionError<HttpClientRequestFailedError<any>> & {
    bookmarkId: string;
};
type FetchRequestPayload = {
    appKey: string;
};
export const fetchAll = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_CANCEL'
)<FetchRequestPayload, BookmarkListResponse[], ApiError, FailedErrorType>();

export const fetch = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARK_CANCEL'
)<string, BookmarkListResponse, ApiError, FailedErrorType>();

type DeletePayload = {
    bookmarkId: string;
    appKey: string;
};
export const remove = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_CANCEL'
)<DeletePayload, DeletePayload, ApiError, FailedErrorType>();

export const add = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_CANCEL'
)<BookmarkRequest, BookmarkResponse, ApiError, FailedErrorType>();
type UpdatePayload = {
    bookmark: Partial<Omit<BookmarkRequest, 'appKey' | 'contextId'>>;
    bookmarkId: string;
};
export const update = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_CANCEL'
)<UpdatePayload, BookmarkResponse, ApiError, string | void>();

export const apply = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/APPLY_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/APPLY_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/APPLY_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/APPLY_BOOKMARK_CANCEL'
)<string, BookmarkPayloadResponse, ApiError, string | void>();

type FavouriteBookmarkPayload = {
    bookmarkId: string;
    appKey: string;
};

export const favourite = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/FAVOURITE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/FAVOURITE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/FAVOURITE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/FAVOURITE_BOOKMARK_CANCEL'
)<FavouriteBookmarkPayload, FavouriteBookmarkPayload, ApiError, string | void>();
export const unFavourite = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/UNFAVOURITE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/UNFAVOURITE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/UNFAVOURITE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/UNFAVOURITE_BOOKMARK_CANCEL'
)<FavouriteBookmarkPayload, FavouriteBookmarkPayload, ApiError, string | void>();

export const head = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/HEAD_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/HEAD_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/HEAD_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/HEAD_BOOKMARK_CANCEL'
)<string, string, ApiErrorHead, string | void>();

export const actions = {
    fetchAll,
    remove,
    add,
    update,
    apply,
    favourite,
    unFavourite,
    head,
    fetch,
};
export type BookmarksActions = ActionType<typeof actions>;
export default actions;
