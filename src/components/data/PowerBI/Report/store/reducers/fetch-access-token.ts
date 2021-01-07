import { createReducer } from 'typesafe-actions';

import { State, Status, removeError, removeStatus } from '../state';

import {
  AccessActions as Actions,
  fetchAccessToken as actions
} from '../actions/access';

export const fetchAccessTokenReducer = (initial: State) => createReducer<State, Actions>(initial)
  .handleAction(actions.request, (state, action) => ({
    ...state,
    status: [...state.status, Status.AcquiringAccessToken],
    errors: removeError(state, action)
  }))
  .handleAction(actions.success, (state, action) => ({
    ...state,
    status: removeStatus(state, Status.AcquiringAccessToken),
    token: action.payload,
  }))
  .handleAction(actions.failure, (state, action) => ({
    ...state,
    status: removeStatus(state, Status.AcquiringAccessToken),
    errors: [...state.errors, action.payload],
  }))

export default fetchAccessTokenReducer;