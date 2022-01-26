import { Observable, from, of } from 'rxjs';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';

import { isActionOf } from 'typesafe-actions';

import { ApiClients } from '@equinor/fusion';
import { StatefulObserver } from '@equinor/fusion/lib/epic';

import {
    fetchEmbedInfo as fetchEmbedInfoAction,
    FetchEmbedInfoAction,
} from '../actions/embed-info';

export type Dependencies = { clients: ApiClients };

export const fecthEmbedInfo = <S = any>(
    action$: Observable<FetchEmbedInfoAction>,
    _: StatefulObserver<S>,
    { clients }: Dependencies
) =>
    action$.pipe(
        filter(isActionOf(fetchEmbedInfoAction.request)),
        switchMap((action) =>
            from(clients.report.getEmbedInfo(action.payload)).pipe(
                map((res) => fetchEmbedInfoAction.success(res.data)),
                catchError((error) => of(fetchEmbedInfoAction.failure({ action, error }))),
                takeUntil(action$.pipe(filter(isActionOf(fetchEmbedInfoAction.cancel))))
            )
        )
    );

export default fecthEmbedInfo;
