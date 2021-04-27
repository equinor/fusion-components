import { Observable, from, of, merge } from 'rxjs';
import { filter, map, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { ApiClients } from '@equinor/fusion';
import { combineEpics, StatefulObserver } from '@equinor/fusion/lib/epic';
import { actions, Actions } from '../actions';
import { State } from '../state';

export type Dependencies = { clients: ApiClients };

export const fetchBookmarks = <S = any>(
    action$: Observable<Actions>,
    _: StatefulObserver<S>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.fetch;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.getBookmarks(action.payload.appKey)).pipe(
                map((res) => success(res.data)),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

export const deleteBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.delete;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.deleteBookmark(action.payload.bookmarkId)).pipe(
                map((res) =>
                    success({
                        bookmarkId: action.payload.bookmarkId,
                        appKey: action.payload.appKey,
                    })
                ),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

export const addBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.add;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.addBookmark(action.payload)).pipe(
                map((res) => success(res.data)),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};
export const updateBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.update;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(
                clients.bookmarks.updateBookmark(action.payload.bookmarkId, action.payload.bookmark)
            ).pipe(
                map((res) => success(res.data)),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};
const onBookmarkAdded = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.add.success)),
        map((action) => actions.fetch.request({ appKey: action.payload.appKey }))
    );

const onBookmarkDeleted = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.delete.success)),
        map((action) => actions.fetch.request({ appKey: action.payload.appKey }))
    );
const onBookmarkUpdated = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.update.success)),
        map((action) => actions.fetch.request({ appKey: action.payload.appKey }))
    );
const epics = combineEpics<Actions, Actions, State>(
    fetchBookmarks,
    deleteBookmark,
    addBookmark,
    updateBookmark,
    onBookmarkAdded,
    onBookmarkDeleted,
    onBookmarkUpdated
);

export default epics;
