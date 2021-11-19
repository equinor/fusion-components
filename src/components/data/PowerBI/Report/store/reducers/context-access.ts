import { createReducer } from 'typesafe-actions';

import { State, Status, removeError, removeStatus } from '../state';

import { ContextActions as Action, checkContextAccess, setContextAccess } from '../actions/context';

export const checkAccessContextReducer = (initial: State) =>
    createReducer<State, Action>(initial)
        .handleAction(checkContextAccess.request, (state, action) => ({
            ...state,
            hasContextAccess: undefined,
            status: [...state.status, Status.AccessCheck],
            errors: removeError(state, action),
        }))
        .handleAction(checkContextAccess.success, (state) => ({
            ...state,
            hasContextAccess: true,
            status: removeStatus(state, Status.AccessCheck),
        }))
        .handleAction(checkContextAccess.failure, (state, action) => ({
            ...state,
            hasContextAccess: false,
            status: removeStatus(state, Status.AccessCheck),
            errors: [...state.errors, action.payload],
        }))

        .handleAction(setContextAccess, (state, action) =>
            state.hasContextAccess === action.payload
                ? state
                : { ...state, hasContextAccess: action.payload }
        );

export default checkAccessContextReducer;
