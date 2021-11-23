import { Observable, from, of, merge } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil, delay, tap } from 'rxjs/operators';

import { isActionOf, ActionType } from 'typesafe-actions';

import { ApiClients } from '@equinor/fusion';

import { StatefulObserver } from '@equinor/fusion/lib/epic';

import actions from '../actions/access';

export type Dependencies = { clients: ApiClients };

const refreshOffset = 60000;

/**
 * Epic for access token
 * Will fetch a token on request, cancel on signal and handle error
 * When token is successfully fetched, a refresh will be scehduled
 * Also handles request for refresh (uses store id) and dispatches request for new token
 */
export const accessToken = <S extends { id: string }>(
    action$: Observable<ActionType<typeof actions>>,
    state$: StatefulObserver<S>,
    { clients }: Dependencies
) => {
    const request$ = action$.pipe(
        filter(isActionOf(actions.fetchAccessToken.request)),
        switchMap((action) =>
            from(clients.report.getAccessToken(action.payload.reportId)).pipe(
                map((res) => actions.fetchAccessToken.success(res.data)),
                catchError((error) => of(actions.fetchAccessToken.failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(actions.fetchAccessToken.cancel))))
            )
        )
    );

    /**
     * when access token is acquired, schedule a refresh
     */
    const acquired$ = request$.pipe(
        filter(isActionOf(actions.fetchAccessToken.success)),
        switchMap((action) => {
            const { expirationUtc } = action.payload;
            const expires = expirationUtc.getTime() - Date.now() - refreshOffset;
            return of(actions.refreshAccessToken()).pipe(delay(expires));
        })
    );

    const refresh$ = acquired$.pipe(
        switchMap(() =>
            of(actions.fetchAccessToken.request({ reportId: state$.value.id, silent: true }))
        )
    );

    return merge(request$, acquired$, refresh$);
};

export default accessToken;
