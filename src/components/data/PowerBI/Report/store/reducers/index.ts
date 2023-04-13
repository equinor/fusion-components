import { createReducer } from 'typesafe-actions';
import { Actions, actions } from '../actions';
import { State } from '../state';

import { checkAccessContextReducer } from './context-access';
import { fetchAccessTokenReducer } from './fetch-access-token';
import { fetchEmbedInfoReducer } from './fetch-embed-info';

export const reducer = (initial: State) =>
    createReducer<State, Actions>(initial, {
        ...checkAccessContextReducer(initial).handlers,
        ...fetchAccessTokenReducer(initial).handlers,
        ...fetchEmbedInfoReducer(initial).handlers,
    }).handleAction(actions.reset, (state) => {
        return {
            id: state.id,
            errors: [],
            status: [],
        };
    });

export default reducer;
