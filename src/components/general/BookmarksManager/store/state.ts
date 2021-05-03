import { BookmarkListResponse, BookmarkPayloadResponse } from '@equinor/fusion';
import { BookmarksActions as Actions } from './actions/bookmarks';
import { ApiError } from './actions/bookmarks';
export enum Status {
    Fetching,
    Idle,
    Failure,
}

export type State = {
    status: Status[];
    errors: ApiError[];
    bookmark?: BookmarkListResponse;
    bookmarks: BookmarkListResponse[];
    bookmarkPayload?: BookmarkPayloadResponse;
};

export const removeStatus = (state: State, status: Status) =>
    state.status.filter((x) => x !== status);
export const removeError = (state: State, action: Actions) =>
    state.errors.filter((x) => x.action.type !== action.type);
