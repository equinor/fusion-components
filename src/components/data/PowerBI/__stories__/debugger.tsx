import { FC, MutableRefObject, useEffect } from 'react';
import { Subscription } from 'rxjs';
import { pluck, distinctUntilChanged, filter } from 'rxjs/operators';

import { PowerBIReportContext } from '../Report';

export const Debugger: FC<{ context: MutableRefObject<PowerBIReportContext | undefined> }> = ({ context }) => {
    useEffect(() => {
        if (!context.current) return;
        const { store, metrics, event$ } = context.current;
        const sub = new Subscription();
        metrics && sub.add(metrics.subscribe((a) => console.log('METRIC:', a)));
        sub.add(store.subscribe((a) => console.log('STATE:', a)));
        sub.add(
            store.state$
                .pipe(
                    pluck('token'),
                    distinctUntilChanged(),
                    filter((a) => !!a)
                )
                .subscribe((token) => {
                    const expiresIn = Math.floor((token!.expirationUtc.getTime() - Date.now()) / 60000);
                    console.log(`TOKEN: expires ${token!.expirationUtc} in ${expiresIn} minutes`);
                })
        );
        sub.add(event$.subscribe((x) => console.log('PBI-EVENT:', x)));
        sub.add(store.action$.subscribe((a) => console.log('ACTION:', a)));
        return () => sub.unsubscribe();
    }, [context.current]);
    return (
        <>
            <h2>Debug panel</h2>
            <div>
                <button onClick={() => context.current?.store.requestEmbedInfo()}>requestEmbedInfo</button>
                <button onClick={() => context.current?.store.requestAccessToken()}>requestAccessToken</button>
                <button
                    onClick={() => context.current?.component?.current && context.current!.component.current.reload()}
                >
                    reload
                </button>
            </div>
        </>
    );
};
