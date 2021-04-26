import { createAsyncAction, ActionType } from 'typesafe-actions';
import { BookmarkListResponse, HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

export type BookmarksActions = ActionType<typeof actions>;

type FetchRequestPayload = {
    appKey: string;
};
export const fetchBookmarks = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_CANCEL'
)<
    FetchRequestPayload,
    BookmarkListResponse[],
    ActionError<HttpClientRequestFailedError<any>>,
    void | string
>();

type DeleteRequestPayload = {
    bookmarkId: string;
    appKey: string;
};
export const deleteBookmark = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_CANCEL'
)<DeleteRequestPayload, void, ActionError<HttpClientRequestFailedError<any>>, void | string>();
const actions = { fetchBookmarks, deleteBookmark };

export default actions;
