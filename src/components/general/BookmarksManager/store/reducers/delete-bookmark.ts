import { createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
// import actions from '../actions/delete';
// import { DeleteActions as Actions } from '../actions/delete';
import { BookmarksActions as Actions, actions } from '../actions/bookmarks';

export const deleteBookmarkReducer = (initial: State) =>
    createReducer<State, Actions>(initial)
        .handleAction(actions.delete.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.delete.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(actions.delete.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default deleteBookmarkReducer;
