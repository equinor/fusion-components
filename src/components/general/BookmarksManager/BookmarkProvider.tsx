import { useEffect, PropsWithChildren, FunctionComponent, useMemo } from 'react';

import { useApiClients } from '@equinor/fusion';

import { bookmarkContext } from './BookmarkContext';
import { Subscription } from 'rxjs';
import createStore from './store';

type Props = PropsWithChildren<{}>;

const { Provider } = bookmarkContext;

export const BookmarkProvider: FunctionComponent<Props> = ({ children }: Props) => {
    const clients = useApiClients();
    const store = useMemo(() => createStore(clients), [clients]);

    // configure store and teardown
    useEffect(() => {
        const subscription = new Subscription(() => store.unsubscribe());
        () => subscription.unsubscribe();
    }, [store]);

    return <Provider value={{ store }}>{children}</Provider>;
};

export default BookmarkProvider;
