import { EpicReducer, ActionPayload } from '@equinor/fusion/lib/epic';
import { State } from './state';
import { Actions, actions } from './actions';

export class Store extends EpicReducer<State, Actions> {
    requestBookmarks(appKey: string): VoidFunction {
        this.dispatch(actions.fetchBookmarks.request({ appKey }));
        return () => this.dispatch(actions.fetchBookmarks.cancel());
    }
    deleteBookmark(appKey: string, bookmarkId: string): VoidFunction {
        this.dispatch(actions.deleteBookmark.request({ appKey, bookmarkId }));
        return () => this.dispatch(actions.deleteBookmark.cancel());
    }
}

export default Store;
