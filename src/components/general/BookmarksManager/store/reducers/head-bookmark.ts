import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const headBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.head.request,
            (state: State, action: ActionType<typeof actions.head.request>) => ({
                ...state,
                bookmark: undefined,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.head.success,
            (state: State, _action: ActionType<typeof actions.head.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.head.failure,
            (state: State, action: ActionType<typeof actions.head.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default headBookmarkReducer;
