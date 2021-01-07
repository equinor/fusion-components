import { Observable, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { actions, Actions } from '../store';

import { TelemetryActions } from '@equinor/fusion';

const requests = (action$: Observable<Actions>) =>
  action$.pipe(
    filter(isActionOf([
      actions.fetchAccessToken.request,
      actions.fetchEmbedInfo.request,
      actions.checkContextAccess.request,
    ])),
    map(({ type }) => TelemetryActions.event({
      name: 'action.request',
      properties: { action: type }
    }))
  );

const failures = (action$: Observable<Actions>) =>
  action$.pipe(
    filter(isActionOf([
      actions.fetchAccessToken.failure,
      actions.fetchEmbedInfo.failure,
    ])),
    map(({ type, payload }) => {
      const { statusCode, url } = payload.error;
      return TelemetryActions.error({
        name: 'action.error',
        properties: { error: { action: type, statusCode, url } }
      })
    })
  );

const tokenRefresh = (action$: Observable<Actions>) =>
  action$.pipe(
    filter(isActionOf(actions.refreshAccessToken)),
    map(a => TelemetryActions.event({ name: 'token.refresh' }))
  );


export const trackers = (action$: Observable<Actions>) => merge(
  requests(action$),
  failures(action$),
  tokenRefresh(action$)
);

export default trackers;