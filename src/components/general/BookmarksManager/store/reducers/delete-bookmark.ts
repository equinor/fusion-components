import { createReducer } from 'typesafe-actions';
import { BookmarksActions as Actions, deleteBookmark as actions } from '../actions/bookmarks';
import { removeStatus, removeError, State, Status } from '../state';

export const deleteBookmarkReducer = (initial: State) =>
    createReducer<State, Actions>(initial)
        .handleAction(actions.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(actions.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default deleteBookmarkReducer;
