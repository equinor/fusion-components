import { createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const fetchBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(actions.fetchBookmark.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.fetchBookmark.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
            bookmark: action.payload,
        }))
        .handleAction(actions.fetchBookmark.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default fetchBookmarkReducer;
