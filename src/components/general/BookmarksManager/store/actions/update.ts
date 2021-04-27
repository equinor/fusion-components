// import { BookmarkRequest, BookmarkResponse, HttpClientRequestFailedError } from '@equinor/fusion';
// import { ActionError } from '@equinor/fusion/lib/epic';
// import { ActionType, createAsyncAction } from 'typesafe-actions';

// type ApiError = ActionError<HttpClientRequestFailedError<any>>;
// type UpdatePayload = {
//     bookmark: Partial<Omit<BookmarkRequest, 'appKey' | 'contextId'>>;
//     bookmarkId: string;
// };
// export const action = createAsyncAction(
//     '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_REQUEST',
//     '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_SUCCESS',
//     '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_FAILURE',
//     '@FUSION_COMPONENTS/BOOKMARKS/UPDATE_BOOKMARK_CANCEL'
// )<UpdatePayload, BookmarkResponse, ApiError, string | void>();
// export type UpdateActions = ActionType<typeof action>;

// export default action;
