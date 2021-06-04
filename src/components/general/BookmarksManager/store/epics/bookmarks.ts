import { Observable, from, of } from 'rxjs';
import { filter, map, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { ApiClients } from '@equinor/fusion';
import { combineEpics, StatefulObserver } from '@equinor/fusion/lib/epic';
import { actions, BookmarksActions as Actions } from '../actions/bookmarks';
import { State } from '../state';

export type Dependencies = { clients: ApiClients };

const fetchBookmarks = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.fetchAll;
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

const fetchBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.fetch;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.getBookmark(action.payload)).pipe(
                map((res) => success(res.data)),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

const deleteBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.remove;
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

const addBookmark = (
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
const updateBookmark = (
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

const applyBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.apply;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.applyBookmark(action.payload)).pipe(
                map((res) => success(res.data)),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

const favouriteBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.favourite;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.addToFavourites({ bookmarkId: action.payload.bookmarkId })).pipe(
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
const unFavouriteBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.unFavourite;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.deleteFavouriteBookmark(action.payload.bookmarkId)).pipe(
                map((res) =>
                    success({
                        appKey: action.payload.appKey,
                        bookmarkId: action.payload.bookmarkId,
                    })
                ),
                catchError((error) => of(failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

const headBookmark = (
    action$: Observable<Actions>,
    _: StatefulObserver<State>,
    { clients }: Dependencies
) => {
    const { request, success, failure, cancel } = actions.head;
    return action$.pipe(
        filter(isActionOf(request)),
        switchMap((action) =>
            from(clients.bookmarks.headBookmark(action.payload)).pipe(
                map((res) => success(action.payload)),
                catchError((error) => of(failure({ action, error, bookmarkId: action.payload }))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    );
};

const onBookmarkNotExist = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.head.failure)),
        map((action) => actions.fetch.request(action.payload.bookmarkId))
    );

const onBookmarkAdded = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.add.success)),
        map((action) => actions.fetchAll.request({ appKey: action.payload.appKey }))
    );

const onBookmarkDeleted = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.remove.success)),
        map((action) => actions.fetchAll.request({ appKey: action.payload.appKey }))
    );
const onBookmarkUpdated = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.update.success)),
        map((action) => actions.fetchAll.request({ appKey: action.payload.appKey }))
    );

const onBookmarkFavourited = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.favourite.success)),
        map((action) => actions.fetchAll.request({ appKey: action.payload.appKey }))
    );

const onBookmarkUnFavourited = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.unFavourite.success)),
        map((action) => actions.fetchAll.request({ appKey: action.payload.appKey }))
    );

const epics = combineEpics<Actions, Actions, State>(
    fetchBookmarks,
    fetchBookmark,
    deleteBookmark,
    addBookmark,
    updateBookmark,
    applyBookmark,
    favouriteBookmark,
    unFavouriteBookmark,
    headBookmark,
    onBookmarkUpdated,
    onBookmarkAdded,
    onBookmarkDeleted,
    onBookmarkFavourited,
    onBookmarkUnFavourited,
    onBookmarkNotExist
);

export default epics;
