import { Observable, from, of, merge } from 'rxjs';
import { filter, map, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';
import { ApiClients } from '@equinor/fusion';
import { combineEpics, StatefulObserver } from '@equinor/fusion/lib/epic';
import {
    fetchBookmarks as fetchBookmarksAction,
    deleteBookmark as deleteBookmarkAction,
} from '../actions/bookmarks';
import { State } from '../state';
import { Actions } from '../actions';

export type Dependencies = { clients: ApiClients };

export const fetchBookmarks = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    action$.pipe(
        filter(isActionOf(fetchBookmarksAction.request)),
        switchMap((action) =>
            from(clients.bookmarks.getBookmarks(action.payload.appKey)).pipe(
                map((res) => fetchBookmarksAction.success(res.data)),
                catchError((error) => of(fetchBookmarksAction.failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(fetchBookmarksAction.cancel))))
            )
        )
    );
};

// export const deleteBookmark = (
//     action$: Observable<Actions>,
//     __state$: StatefulObserver<State>,
//     { clients }: Dependencies
// ) => {
//     action$.pipe(
//         filter(isActionOf(deleteBookmarkAction.request)),
//         switchMap((action) =>
//             from(clients.bookmarks.deleteBookmark(action.payload.bookmarkId)).pipe(
//                 switchMap((res) =>
//                     merge(
//                         of(deleteBookmarkAction.success(res.data)),
//                         of(fetchBookmarksAction.request({ appKey: action.payload.appKey }))
//                     )
//                 ),
//                 catchError((error) => of(deleteBookmarkAction.failure({ action, error }))),
//                 takeUntil(action$.pipe(filter(isActionOf(deleteBookmarkAction.cancel))))
//             )
//         )
//     );
// };

const epics = combineEpics<Actions, Actions, State>(fetchBookmarks);

export default epics;
