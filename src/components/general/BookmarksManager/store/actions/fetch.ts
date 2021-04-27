// import { BookmarkListResponse, HttpClientRequestFailedError } from '@equinor/fusion';
// import { ActionError } from '@equinor/fusion/lib/epic';
// import { ActionType, createAsyncAction } from 'typesafe-actions';

// type FetchRequestPayload = {
//     appKey: string;
// };

// type ApiError = ActionError<HttpClientRequestFailedError<any>>;

// export const action = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/FETCH_BOOKMARKS_CANCEL'
// )<FetchRequestPayload, BookmarkListResponse[], ApiError, string | void>();
// export type FetchActions = ActionType<typeof action>;

// export default action;
