import { BookmarkListResponse } from '@equinor/fusion';
import { Actions, ApiError } from './actions';

export enum Status {
    Fetching,
    Idle,
    Failure,
}

export type State = {
    id: string;
    appKey: string;
    status: Array<Status>;
    errors: Array<ApiError>;
    bookmarks: BookmarkListResponse[];
};

export const removeStatus = (state: State, status: Status) =>
    state.status.filter((x) => x !== status);
export const removeError = (state: State, action: Actions) =>
    state.errors.filter((x) => x.action.type !== action.type);
