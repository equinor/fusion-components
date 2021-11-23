import { createReducer } from 'typesafe-actions';

import { State, Status, removeStatus } from '../state';

import { FetchEmbedInfoAction as Actions, fetchEmbedInfo as actions } from '../actions/embed-info';

export const fetchEmbedInfoReducer = (initial: State) =>
    createReducer<State, Actions>(initial)
        .handleAction(actions.request, (_, action) => ({
            id: action.payload,
            status: [Status.LoadingEmbedInfo],
            errors: [],
        }))
        .handleAction(actions.success, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.LoadingEmbedInfo),
            embedInfo: action.payload.embedConfig,
        }))
        .handleAction(actions.failure, (state, action) => ({
            ...state,
            status: removeStatus(state, Status.LoadingEmbedInfo),
            errors: [...state.errors, action.payload],
        }));

export default fetchEmbedInfoReducer;
