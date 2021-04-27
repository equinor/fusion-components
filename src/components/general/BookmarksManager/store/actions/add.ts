// import { BookmarkRequest, BookmarkResponse, HttpClientRequestFailedError } from '@equinor/fusion';
// import { ActionError } from '@equinor/fusion/lib/epic';
// import { ActionType, createAsyncAction } from 'typesafe-actions';

// type ApiError = ActionError<HttpClientRequestFailedError<any>>;

// export const action = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/ADD_BOOKMARK_CANCEL'
// )<BookmarkRequest, BookmarkResponse, ApiError, string | void>();
// export type AddActions = ActionType<typeof action>;
// export default action;
