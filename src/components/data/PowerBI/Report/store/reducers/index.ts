import { createReducer } from 'typesafe-actions';
import { Actions } from '../actions';
import { State } from '../state';

import { checkAccessContextReducer } from './context-access';
import { fetchAccessTokenReducer } from './fetch-access-token';
import { fetchEmbedInfoReducer } from './fetch-embed-info';

export const reducer = (initial: State) => createReducer<State, Actions>(initial, {
  ...checkAccessContextReducer(initial).handlers,
  ...fetchAccessTokenReducer(initial).handlers,
  ...fetchEmbedInfoReducer(initial).handlers,
})


export default reducer;