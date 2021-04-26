import React, { useEffect, PropsWithChildren, FunctionComponent, useMemo } from 'react';

import { useCurrentContext, useApiClients } from '@equinor/fusion';

import { context } from './BookmarkContext';
import { Subscription } from 'rxjs';

type Props = PropsWithChildren<{}>;

const { Provider } = context;

export const BookmarkProvider: FunctionComponent<Props> = ({ children }: Props) => {
    const clients = useApiClients();
    const store = useMemo(() => createStore(clients), [clients]);
    const currentContext = useCurrentContext();

    // configure store and teardown
    useEffect(() => {
        const subscription = new Subscription(() => store.unsubscribe());

        // when embed info is loaded, request access token

        () => subscription.unsubscribe();
    }, [store]);

    return <Provider value={store}>{children}</Provider>;
};

export default BookmarkProvider;
