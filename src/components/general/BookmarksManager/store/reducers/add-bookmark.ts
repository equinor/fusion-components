import { createReducer } from 'typesafe-actions';
import { AddActions as Actions } from '../actions/add';
import actions from '../actions/add';
import { removeStatus, removeError, State, Status } from '../state';

export const addBookmarkReducer = (initial: State) =>
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
export default addBookmarkReducer;
