import { ActionType } from 'typesafe-actions';
import { HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';
import { deleteBookmark, fetchBookmarks } from '../actions/bookmarks';

export const actions = {
    ...deleteBookmark,
    ...fetchBookmarks,
};

export type ApiError = ActionError<HttpClientRequestFailedError<any>>;

export type Actions = ActionType<typeof actions>;
