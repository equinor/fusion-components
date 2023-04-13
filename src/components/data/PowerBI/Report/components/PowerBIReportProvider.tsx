import { useEffect, PropsWithChildren, FunctionComponent, useRef, useMemo, useState } from 'react';

import { useCurrentContext, useTelemetryLogger, useApiClients } from '@equinor/fusion';

import {
    context,
    PowerBIEmbedComponent,
    PowerBIEmbedEventEntry,
    PowerBIReportContext,
} from '../context';
import { of, Subject, Subscription } from 'rxjs';
import PowerBITelemetryObserver from '../telemetry/observer';
import { createStore } from '../store';
import { distinctUntilKeyChanged, filter, switchMap } from 'rxjs/operators';

type Props = PropsWithChildren<{
    id: string;
    hasContext: boolean;
    reloadOnContextChange?: boolean;
}>;

const { Provider } = context;

export const PowerBIReportProvider: FunctionComponent<Props> = ({
    children,
    id,
    hasContext,
}: Props) => {
    const clients = useApiClients();
    const store = useMemo(() => createStore(id, clients), [id, clients]);

    /** After initial fetch, allow fetched to happen silently. meaning to spinners.
     * Used with access check when changing context, else a spinner will overlay the report embed */
    const [silentAccessCheck, setSilentAccessCheck] = useState<boolean>(false);

    /*Null default, as to not set contextAccess before embedInfo has been fetched */
    const [hasRls, setHasRls] = useState<boolean | null>(null);
    const component = useRef<PowerBIEmbedComponent | undefined>(undefined);
    const logger = useTelemetryLogger();
    const metrics = useMemo(() => new PowerBITelemetryObserver(store, logger), [store, logger]);
    const event$ = useMemo(() => new Subject<PowerBIEmbedEventEntry>(), [store]);
    const value = useMemo<PowerBIReportContext>(
        () => ({ store, event$, metrics, component }),
        [store, event$, metrics, component]
    );

    const currentContext = useCurrentContext();
    const selectedContext = useMemo(() => {
        if (currentContext?.externalId && currentContext?.type) {
            return {
                externalId: currentContext.externalId,
                type: currentContext.type.id,
            };
        }
    }, [currentContext?.externalId, currentContext?.type]);

    // useEffect(() => {
    //     const subscription = store.subscribe((x) => console.log('😍 state changed', x));
    //     return () => subscription.unsubscribe();
    // }, [store]);

    // configure store and teardown
    useEffect(() => {
        const subscription = new Subscription(() => {
            store.reset();
        });

        store.requestEmbedInfo();

        subscription.add(
            store.state$
                .pipe(
                    distinctUntilKeyChanged('embedInfo'),
                    switchMap((x) =>
                        x?.embedInfo ? of(Boolean(x.embedInfo?.rlsConfiguration)) : of(null)
                    )
                )
                .subscribe((rls) => {
                    setHasRls(rls);
                    setSilentAccessCheck(false);
                })
        );

        subscription.add(
            store.state$
                .pipe(
                    distinctUntilKeyChanged('hasContextAccess'),
                    filter((x) => Boolean(x.hasContextAccess && !x.token))
                )
                .subscribe(() => store.requestAccessToken(silentAccessCheck))
        );

        return () => subscription.unsubscribe();
    }, [store, selectedContext]);

    useEffect(() => {
        return () => store.unsubscribe();
    }, [store]);

    useEffect(() => {
        /**
         * Determines context access on wither rapport uses RLS and if it uses context.
         * checkContextAccess should only run for reports using context AND RLS.
         */
        if (hasContext && hasRls) {
            store.checkContextAccess({ ...selectedContext, silent: silentAccessCheck });
            setSilentAccessCheck(true);
            return;
        }
        /**
         * if not using context, or hasRLS is determined to be false, the the process through to requestToken.
         * When EmbedInfo is fetched, the hasRls state should resolve to true/false or we have caught an error.
         */
        if (!hasContext || hasRls === false) store.contextAccess = true;
    }, [store, hasContext, hasRls, selectedContext]);

    return <Provider value={value}>{children}</Provider>;
};

export default PowerBIReportProvider;
