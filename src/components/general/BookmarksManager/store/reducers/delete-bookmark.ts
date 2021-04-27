import { createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import actions from '../actions/delete';
import { DeleteActions as Actions } from '../actions/delete';

export const deleteBookmarkReducer = (initial: State) =>
    createReducer<State, Actions>(initial)
        .handleAction(actions.request, (state, action) => ({
            ...state,
            status: [...state.status, Status.Fetching],
            errors: removeError(state, action),
        }))
        .handleAction(actions.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Idle),
        }))
        .handleAction(actions.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.Failure),
            errors: [...state.errors, action.payload],
        }));
export default deleteBookmarkReducer;
