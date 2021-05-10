import { createReducer } from 'typesafe-actions';
import { State } from '../state';
import { fetchBookmarksReducer } from './fetch-bookmarks';
import { deleteBookmarkReducer } from './delete-bookmark';
import { addBookmarkReducer } from './add-bookmark';
import { updateBookmarkReducer } from './update-bookmark';
import { applyBookmarksReducer } from './apply-bookmark';
import { favouriteBookmarkReducer } from './favourite-bookmark';
import { unFavouriteBookmarkReducer } from './unFavourite-bookmark';
import { fetchBookmarkReducer } from './fetch-bookmark';
import { headBookmarkReducer } from './head-bookmark';

export const reducer = (initial: State) =>
    createReducer(initial, {
        ...fetchBookmarksReducer(initial).handlers,
        ...deleteBookmarkReducer(initial).handlers,
        ...addBookmarkReducer(initial).handlers,
        ...updateBookmarkReducer(initial).handlers,
        ...applyBookmarksReducer(initial).handlers,
        ...favouriteBookmarkReducer(initial).handlers,
        ...unFavouriteBookmarkReducer(initial).handlers,
        ...headBookmarkReducer(initial).handlers,
        ...fetchBookmarkReducer(initial).handlers,
    });

export default reducer;
