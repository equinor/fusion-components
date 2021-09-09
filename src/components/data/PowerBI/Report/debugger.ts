import { useEffect } from 'react';

import { Subscription } from 'rxjs';
import { pluck, distinctUntilChanged, filter } from 'rxjs/operators';

import { Store } from './store';

export const useStateDebugger = (store: Store) => {
    useEffect(() => {
        if (!store) return;
        const sub = new Subscription();
        sub.add(store.subscribe((a) => console.log('STATE:', a)));
        sub.add(
            store.state$
                .pipe(
                    pluck('token'),
                    distinctUntilChanged(),
                    filter((a) => !!a)
                )
                .subscribe((token) => {
                    if (!token) return;
                    const expiresIn = Math.floor(
                        (token.expirationUtc.getTime() - Date.now()) / 60000
                    );
                    console.log(`TOKEN: expires ${token.expirationUtc} in ${expiresIn} minutes`);
                })
        );
        sub.add(store.action$.subscribe((a) => console.log('ACTION:', a)));
        return () => sub.unsubscribe();
    }, [store]);
};
