import { Observable, from, of, merge, concat } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { ApiClients } from '@equinor/fusion';
import { combineEpics, StatefulObserver } from '@equinor/fusion/lib/epic';

import { Actions, actions } from './actions';
import { State } from './state';

export type Dependencies = { clients: ApiClients };

export const fetchReport = <S = any>(
  action$: Observable<Actions>,
  _: StatefulObserver<S>,
  { clients }: Dependencies
) =>
  action$.pipe(
    filter(isActionOf(actions.fetchReport.request)),
    switchMap(action => from(clients.report.getReportAsync(action.payload)).pipe(
      map(res => actions.fetchReport.success(res.data)),
      catchError(error => of(actions.fetchReport.failure({ action, error }))),
      takeUntil(action$.pipe(
        filter(isActionOf(actions.fetchReport.cancel))
      ))
    )),
  );

export const fetchReportAccessDescription = <S = any>(
  action$: Observable<Actions>,
  _: Observable<S>,
  { clients }: Dependencies
) =>
  action$.pipe(
    filter(isActionOf(actions.fetchReportAccessDescription.request)),
    switchMap(action => from(clients.report.getAccessDescription(action.payload)).pipe(
      map(res => actions.fetchReportAccessDescription.success(res.data)),
      catchError(error => of(actions.fetchReportAccessDescription.failure({ action, error }))),
      takeUntil(action$.pipe(
        filter(isActionOf(actions.fetchReportAccessDescription.cancel))
      ))
    )),
  );

export const fetchReportDescription = <S = any>(
  action$: Observable<Actions>,
  _: Observable<S>,
  { clients }: Dependencies
) =>
  action$.pipe(
    filter(isActionOf(actions.fetchReportDescription.request)),
    switchMap(action => from(clients.report.getDescription(action.payload)).pipe(
      map(res => actions.fetchReportDescription.success(res.data)),
      catchError(error => of(actions.fetchReportDescription.failure({ action, error }))),
      takeUntil(action$.pipe(
        filter(isActionOf(actions.fetchReportDescription.cancel))
      ))
    )),
  );

export const fetchReportRequirements = <S = any>(
  action$: Observable<Actions>,
  _state$: StatefulObserver<S>,
  { clients }: Dependencies
) =>
  action$.pipe(
    filter(isActionOf(actions.fetchReportRequirements.request)),
    switchMap(action => from(clients.report.getRlsRequirements(action.payload)).pipe(
      map(res => actions.fetchReportRequirements.success(res.data)),
      catchError(error => of(actions.fetchReportRequirements.failure({ action, error }))),
      takeUntil(action$.pipe(
        filter(isActionOf(actions.fetchReportRequirements.cancel))
      ))
    )),
  );

export const initialize = (
  action$: Observable<Actions>,
  state$: StatefulObserver<State>,
  deps: Dependencies
) => {
  const abort$ = action$.pipe(filter(isActionOf(actions.initialize.cancel)));
  const request$ = (id: string) =>
    merge(
      fetchReport(of(actions.fetchReport.request(id)), state$, deps),
      fetchReportRequirements(of(actions.fetchReportRequirements.request(id)), state$, deps),
      fetchReportDescription(of(actions.fetchReportDescription.request(id)), state$, deps),
      fetchReportAccessDescription(of(actions.fetchReportAccessDescription.request(id)), state$, deps),
    );
  return action$.pipe(
    filter(isActionOf(actions.initialize.request)),
    switchMap(action => concat(
      request$(action.payload),
      of(actions.initialize.success())
    ).pipe(takeUntil(abort$))),
  );
}

export const epics = {
  fetchReportAccessDescription,
  fetchReportDescription,
  fetchReportRequirements,
  initialize
}

export const epic = combineEpics<Actions, Actions, State>(...Object.values(epics));

export default epic;
