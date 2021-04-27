import { HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';
import { ActionType, createAsyncAction } from 'typesafe-actions';

type DeletePayload = {
    bookmarkId: string;
    appKey: string;
};
type ApiError = ActionError<HttpClientRequestFailedError<any>>;
export const action = createAsyncAction(
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_REQUEST',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_SUCCESS',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_FAILURE',
    '@FUSION_COMPONENTS/BOOKMARKS/DELETE_BOOKMARK_CANCEL'
)<DeletePayload, DeletePayload, ApiError, string | void>();
export type DeleteActions = ActionType<typeof action>;

export default action;
