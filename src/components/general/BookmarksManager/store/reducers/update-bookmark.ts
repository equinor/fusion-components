import { createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
// import actions from '../actions/fetch';
// import { FetchActions as Actions } from '../actions/fetch';
import { BookmarksActions as Actions, actions } from '../actions/bookmarks';
export const updateBookmarkReducer = (initial: State) =>
    createReducer<State, Actions>(initial)
        .handleAction(actions.update.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.update.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(actions.update.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default updateBookmarkReducer;
