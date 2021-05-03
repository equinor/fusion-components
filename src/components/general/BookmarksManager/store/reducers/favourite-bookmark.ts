import { createReducer } from 'typesafe-actions';
import { actions } from '../actions/bookmarks';
import { removeStatus, removeError, State, Status } from '../state';

export const favouriteBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(actions.favourite.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.favourite.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(actions.favourite.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default favouriteBookmarkReducer;
