import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const deleteBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.remove.request,
            (state: State, action: ActionType<typeof actions.remove.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.remove.success,
            (state: State, action: ActionType<typeof actions.remove.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.remove.failure,
            (state: State, action: ActionType<typeof actions.remove.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default deleteBookmarkReducer;
