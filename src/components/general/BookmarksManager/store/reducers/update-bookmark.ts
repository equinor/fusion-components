import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';
export const updateBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.update.request,
            (state: State, action: ActionType<typeof actions.update.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.update.success,
            (state: State, _action: ActionType<typeof actions.update.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.update.failure,
            (state: State, action: ActionType<typeof actions.update.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default updateBookmarkReducer;
