import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const deleteBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.delete.request,
            (state: State, action: ActionType<typeof actions.delete.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.delete.success,
            (state: State, action: ActionType<typeof actions.delete.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.delete.failure,
            (state: State, action: ActionType<typeof actions.delete.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default deleteBookmarkReducer;
