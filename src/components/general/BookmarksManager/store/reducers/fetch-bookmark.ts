import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const fetchBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.fetch.request,
            (state: State, action: ActionType<typeof actions.fetch.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.fetch.success,
            (state: State, action: ActionType<typeof actions.fetch.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
                bookmark: action.payload,
            })
        )
        .handleAction(
            actions.fetch.failure,
            (state: State, action: ActionType<typeof actions.fetch.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default fetchBookmarkReducer;
