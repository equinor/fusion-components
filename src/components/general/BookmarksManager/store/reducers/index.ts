import { createReducer } from 'typesafe-actions';
import { Actions } from '../actions';
import { State } from '../state';

import { fetchBookmarksReducer } from './fetch-bookmarks';
import { deleteBookmarkReducer } from './delete-bookmark';
import { addBookmarkReducer } from './add-bookmark';
import { updateBookmarkReducer } from './update-bookmark';
export const reducer = (initial: State) =>
    createReducer<State, Actions>(initial, {
        ...fetchBookmarksReducer(initial).handlers,
        ...deleteBookmarkReducer(initial).handlers,
        ...addBookmarkReducer(initial).handlers,
        ...updateBookmarkReducer(initial).handlers,
    });

export default reducer;
