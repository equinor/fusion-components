import { createReducer } from 'typesafe-actions';
import { addBookmark } from '../actions/bookmarks';
import { removeStatus, removeError, State, Status } from '../state';

export const addBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(addBookmark.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(addBookmark.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(addBookmark.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));

export default addBookmarkReducer;
