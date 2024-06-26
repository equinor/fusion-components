import { Observable, from, of, merge, fromEvent, interval } from 'rxjs';
import {
    filter,
    switchMap,
    map,
    catchError,
    takeUntil,
    delay,
    withLatestFrom,
    throttleTime,
} from 'rxjs/operators';

import { isActionOf, ActionType } from 'typesafe-actions';

import { ApiClients } from '@equinor/fusion';

import { StatefulObserver } from '@equinor/fusion/lib/epic';

import actions from '../actions/access';
import { AccessToken } from '@equinor/fusion/lib/http/apiClients/models/report';

export type Dependencies = { clients: ApiClients };

const MINUTES_BEFORE_EXPIRATION = 1;
const REFRESH_OFFSET = MINUTES_BEFORE_EXPIRATION * 60 * 1000;

const accessTokenExpireTime = (token: AccessToken, offset: number = REFRESH_OFFSET): number => {
    const expires = token.expirationUtc.getTime();
    const now = new Date(Date.now()).getTime();
    return expires - now - offset;
};

const shouldUpdateToken = (token: AccessToken, offset: number = REFRESH_OFFSET) =>
    accessTokenExpireTime(token, offset) <= 0;

/**
 * Epic for access token
 * Will fetch a token on request, cancel on signal and handle error
 * When token is successfully fetched, a refresh will be scehduled
 * Also handles request for refresh (uses store id) and dispatches request for new token
 */
export const accessToken = <S extends { id: string; token: AccessToken }>(
    action$: Observable<ActionType<typeof actions>>,
    state$: StatefulObserver<S>,
    { clients }: Dependencies
): Observable<ActionType<typeof actions>> => {
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
    const acquired$ = action$.pipe(
        filter(isActionOf(actions.fetchAccessToken.success)),
        switchMap((action) => {
            const expires = accessTokenExpireTime(action.payload);
            return of(actions.refreshAccessToken({ reason: 'expired since acquired' })).pipe(
                delay(expires)
            );
        })
    );

    /**
     * request new token when window tab is activated
     */
    const activated$ = fromEvent(document, 'visibilitychange').pipe(
        // only trigger when tab is active
        filter(() => !document.hidden),
        // include current state
        withLatestFrom(state$),
        // select token from state
        map(([_, state]) => state.token),
        // only continue of a token exists
        filter((x) => !!x),
        // only continue if token expired
        filter(shouldUpdateToken),
        // dispatch request for update of token
        map(() => actions.refreshAccessToken({ reason: 'tab activated' }))
    );

    const refresh$ = action$.pipe(
        filter(isActionOf(actions.refreshAccessToken)),
        withLatestFrom(state$),
        throttleTime(60 * 1000),
        map(([_, state]) => actions.fetchAccessToken.request({ reportId: state.id, silent: true }))
    );

    return merge(request$, acquired$, activated$, refresh$);
};

export default accessToken;
