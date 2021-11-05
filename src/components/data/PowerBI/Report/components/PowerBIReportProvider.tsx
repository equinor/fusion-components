import { useEffect, PropsWithChildren, FunctionComponent, useRef, useMemo } from 'react';

import { useCurrentContext, useTelemetryLogger, useApiClients } from '@equinor/fusion';

import {
    context,
    PowerBIEmbedComponent,
    PowerBIEmbedEventEntry,
    PowerBIReportContext,
} from '../context';
import { Subject, Subscription } from 'rxjs';
import PowerBITelemetryObserver from '../telemetry/observer';
import { createStore, actions } from '../store';
import { distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

type Props = PropsWithChildren<{ id: string; hasContext: boolean }>;

const { Provider } = context;

export const PowerBIReportProvider: FunctionComponent<Props> = ({
    children,
    id,
    hasContext,
}: Props) => {
    const clients = useApiClients();
    const store = useMemo(() => createStore(id, clients), [id, clients]);

    const component = useRef<PowerBIEmbedComponent | undefined>(undefined);

    const logger = useTelemetryLogger();

    const metrics = useMemo(() => new PowerBITelemetryObserver(store, logger), [store, logger]);

    const event$ = useMemo(() => new Subject<PowerBIEmbedEventEntry>(), [store]);

    const value = useMemo<PowerBIReportContext>(
        () => ({ store, event$, metrics, component }),
        [store, event$, metrics, component]
    );

    const currentContext = useCurrentContext();
    const rls = useMemo(() => {
        if (currentContext?.externalId && currentContext?.type) {
            return {
                externalId: currentContext.externalId,
                type: currentContext.type.id,
            };
        }
    }, [currentContext?.externalId, currentContext?.type]);

    // configure store and teardown
    useEffect(() => {
        const subscription = new Subscription(() => store.unsubscribe());
        // when context access is set to ´true´ request embed info
        subscription.add(
            store.state$
                .pipe(
                    distinctUntilKeyChanged('hasContextAccess'),
                    filter((x) => Boolean(x.hasContextAccess))
                )
                .subscribe(() => store.requestEmbedInfo())
        );

        // when embed info is loaded, request access token
        subscription.add(
            store.action$
                .pipe(filter(isActionOf(actions.fetchEmbedInfo.success)))
                .subscribe(() => store.requestAccessToken())
        );
        () => subscription.unsubscribe();
    }, [store]);

    useEffect(() => {
        if (!hasContext) {
            store.contextAccess = true;
        } else if (rls) {
            return store.checkContextAccess(rls);
        }
    }, [store, rls, hasContext]);

    return <Provider value={value}>{children}</Provider>;
};

export default PowerBIReportProvider;
