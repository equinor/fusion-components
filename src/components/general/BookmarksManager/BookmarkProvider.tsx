import { useEffect, PropsWithChildren, FunctionComponent, useMemo } from 'react';
import {
    useApiClients,
    BookmarkPayloadResponse,
    useSelector,
    useCurrentContext,
    useContextManager,
} from '@equinor/fusion';
import { bookmarkContext } from './BookmarkContext';
import { Subscription } from 'rxjs';
import createStore from './store';

type Props = PropsWithChildren<{
    onBookmarkApplied?: (bookmark: BookmarkPayloadResponse, awaitForContextSwitch: boolean) => void;
}>;

const { Provider } = bookmarkContext;

export const BookmarkProvider: FunctionComponent<Props> = ({
    children,
    onBookmarkApplied,
}: Props) => {
    const clients = useApiClients();
    const store = useMemo(() => createStore(clients), [clients]);
    const payload = useSelector(store, 'bookmarkPayload');

    const currentContext = useCurrentContext();
    const contextManager = useContextManager();

    useEffect(() => {
        const subscription = new Subscription(() => store.unsubscribe());
        () => subscription.unsubscribe();
    }, [store]);

    useEffect(() => {
        const apply = async () => {
            if (!(onBookmarkApplied && payload)) {
                return;
            }

            if (currentContext?.id !== payload?.context?.id) {
                await contextManager.setCurrentContextIdAsync(payload.context.id);
                onBookmarkApplied(payload, true);
            } else {
                onBookmarkApplied(payload, false);
            }
        };
        apply();
    }, [payload]);

    return <Provider value={{ store }}>{children}</Provider>;
};

export default BookmarkProvider;
