import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from '../actions/bookmarks';
import { removeStatus, removeError, State, Status } from '../state';

export const addBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.add.request,
            (state: State, action: ActionType<typeof actions.add.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.add.success,
            (state: State, _action: ActionType<typeof actions.add.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.add.failure,
            (state: State, action: ActionType<typeof actions.add.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );

export default addBookmarkReducer;
