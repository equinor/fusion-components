import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const applyBookmarksReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.apply.request,
            (state: State, action: ActionType<typeof actions.apply.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.apply.success,
            (state: State, action: ActionType<typeof actions.apply.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
                bookmarkPayload: action.payload,
            })
        )
        .handleAction(
            actions.apply.failure,
            (state: State, action: ActionType<typeof actions.apply.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default applyBookmarksReducer;
