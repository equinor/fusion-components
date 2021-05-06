import { createReducer, ActionType } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const fetchBookmarksReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.fetchAll.request,
            (state: State, action: ActionType<typeof actions.fetchAll.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.fetch.success,
            (state: State, action: ActionType<typeof actions.fetchAll.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
                bookmarks: action.payload,
            })
        )
        .handleAction(
            actions.fetch.failure,
            (state: State, action: ActionType<typeof actions.fetchAll.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );

export default fetchBookmarksReducer;
