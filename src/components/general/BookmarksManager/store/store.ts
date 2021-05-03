import { EpicReducer } from '@equinor/fusion/lib/epic';
import { State } from './state';
import { actions, BookmarksActions as Actions } from './actions/bookmarks';
import { BookmarkRequest } from '@equinor/fusion';
export class Store extends EpicReducer<State, Actions> {
    requestBookmarks(appKey: string): VoidFunction {
        this.dispatch(actions.fetch.request({ appKey }));
        return () => this.dispatch(actions.fetch.cancel());
    }
    deleteBookmark(appKey: string, bookmarkId: string): VoidFunction {
        this.dispatch(actions.delete.request({ appKey, bookmarkId }));
        return () => this.dispatch(actions.delete.cancel());
    }
    addBookmark(bookmark: BookmarkRequest): VoidFunction {
        this.dispatch(actions.add.request(bookmark));
        return () => this.dispatch(actions.add.cancel());
    }
    updateBookmark(
        bookmarkId: string,
        bookmark: Partial<Omit<BookmarkRequest, 'appKey' | 'contextId'>>
    ): VoidFunction {
        this.dispatch(actions.update.request({ bookmarkId, bookmark }));
        return () => this.dispatch(actions.update.cancel());
    }
    applyBookmark(bookmarkId: string): VoidFunction {
        this.dispatch(actions.apply.request(bookmarkId));
        return () => this.dispatch(actions.apply.cancel());
    }
    favouriteBookmark(appKey: string, bookmarkId: string): VoidFunction {
        this.dispatch(actions.favourite.request({ appKey, bookmarkId }));
        return () => this.dispatch(actions.favourite.cancel());
    }
    unFavouriteBookmark(appKey: string, bookmarkId: string): VoidFunction {
        this.dispatch(actions.unFavourite.request({ appKey, bookmarkId }));
        return () => this.dispatch(actions.unFavourite.cancel());
    }
    headBookmark(bookmarkId: string): VoidFunction {
        this.dispatch(actions.head.request(bookmarkId));
        return () => this.dispatch(actions.head.cancel());
    }
}

export default Store;
