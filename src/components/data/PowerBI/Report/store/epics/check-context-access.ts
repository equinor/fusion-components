import { Observable, from, of } from 'rxjs';
import { filter, switchMap, map, takeUntil, catchError } from 'rxjs/operators';

import { isActionOf, ActionType } from 'typesafe-actions';

import { ApiClients } from '@equinor/fusion';

import { StatefulObserver } from '@equinor/fusion/lib/epic';
import { ContextActions, checkContextAccess as checkContextAccessAction } from '../actions/context';

export type Dependencies = { clients: ApiClients };

export const checkContextAccess = <S = any>(
    action$: Observable<ContextActions>,
    _: StatefulObserver<S>,
    { clients }: Dependencies
) => {
    const fetch = (action: ActionType<typeof checkContextAccessAction.request>) => {
        const { reportId, externalId, type } = action.payload;
        return from(clients.report.checkContextAccess(reportId, externalId, type)).pipe(
            map(() => checkContextAccessAction.success()),
            catchError((error) => of(checkContextAccessAction.failure({ action, error }))),
            takeUntil(action$.pipe(filter(isActionOf(checkContextAccessAction.cancel))))
        );
    };

    return action$.pipe(filter(isActionOf(checkContextAccessAction.request)), switchMap(fetch));
};

export default checkContextAccess;
