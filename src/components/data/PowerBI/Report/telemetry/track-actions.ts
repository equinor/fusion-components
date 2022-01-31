import { Observable, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { actions, Actions } from '../store';

import { TelemetryActions } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

const requests = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(
            isActionOf([
                actions.fetchAccessToken.request,
                actions.fetchEmbedInfo.request,
                actions.checkContextAccess.request,
            ])
        ),
        map(({ type, payload }) =>
            TelemetryActions.event({
                name: 'action.request',
                properties: { action: type, payload },
            })
        )
    );

const failures = (action$: Observable<Actions>) =>
    action$.pipe(
        filter((action) => !!action.type.match(/FAILURE/)),
        map(({ type, payload }) => {
            const { statusCode, url } = (payload as ActionError).error;
            return TelemetryActions.error({
                name: 'action.error',
                properties: { error: { action: type, statusCode, url } },
            });
        })
    );

const tokenRefresh = (action$: Observable<Actions>) =>
    action$.pipe(
        filter(isActionOf(actions.refreshAccessToken)),
        map(() => TelemetryActions.event({ name: 'token.refresh' }))
    );

export const trackers = (action$: Observable<Actions>) =>
    merge(requests(action$), failures(action$), tokenRefresh(action$));

export default trackers;
