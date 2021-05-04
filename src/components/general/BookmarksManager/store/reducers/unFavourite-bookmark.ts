import { ActionType, createReducer } from 'typesafe-actions';
import { removeStatus, removeError, State, Status } from '../state';
import { actions } from '../actions/bookmarks';

export const unFavouriteBookmarkReducer = (initial: State) =>
    createReducer(initial)
        .handleAction(
            actions.unFavourite.request,
            (state: State, action: ActionType<typeof actions.unFavourite.request>) => ({
                ...state,
                status: [...state.status, Status.Fetching],
                errors: removeError(state, action),
            })
        )
        .handleAction(
            actions.unFavourite.success,
            (state: State, _action: ActionType<typeof actions.unFavourite.success>) => ({
                ...state,
                status: removeStatus(state, Status.Idle),
            })
        )
        .handleAction(
            actions.unFavourite.failure,
            (state: State, action: ActionType<typeof actions.unFavourite.failure>) => ({
                ...state,
                status: removeStatus(state, Status.Failure),
                errors: [...state.errors, action.payload],
            })
        );
export default unFavouriteBookmarkReducer;
