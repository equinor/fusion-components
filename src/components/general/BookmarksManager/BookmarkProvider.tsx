import { useEffect, PropsWithChildren, FunctionComponent, useMemo, useState } from 'react';
import {
    useApiClients,
    BookmarkPayloadResponse,
    useSelector,
    useCurrentContext,
    useContextManager,
    useNotificationCenter,
    useCurrentPersonDetails,
} from '@equinor/fusion';
import { bookmarkContext } from './BookmarkContext';
import createStore from './store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { actions } from './store/actions/bookmarks';
import { PersonPhoto } from '@equinor/fusion-components';

type ModalState = 'Show' | 'Close' | 'Open';
type Props = PropsWithChildren<{
    onBookmarkApplied?: (bookmark: BookmarkPayloadResponse, awaitForContextSwitch: boolean) => void;
}>;

const { Provider } = bookmarkContext;

export const BookmarkProvider: FunctionComponent<Props> = ({
    children,
    onBookmarkApplied,
}: Props) => {
    const [showModal, setShowModal] = useState<ModalState>('Close');
    const clients = useApiClients();
    const currentContext = useCurrentContext();
    const contextManager = useContextManager();
    const createNotification = useNotificationCenter();
    const { personDetails } = useCurrentPersonDetails();
    const store = useMemo(() => createStore(clients), [clients]);
    const payload = useSelector(store, 'bookmarkPayload');
    const headBookmark = useSelector(store, 'bookmark');

    useEffect(() => {
        () => store.unsubscribe();
    }, [store]);

    useEffect(() => {
        const subscription = new Subscription();

        subscription.add(
            store.action$.pipe(filter(isActionOf(actions.fetch.success))).subscribe((b) => {
                setShowModal('Show');
                store.applyBookmark(b.payload.id);
            })
        );

        subscription.add(
            store.action$
                .pipe(filter(isActionOf(actions.favourite.success)))
                .subscribe(() => setShowModal('Close'))
        );

        subscription.add(
            store.action$
                .pipe(filter(isActionOf(actions.head.success)))
                .subscribe((b) => store.applyBookmark(b.payload))
        );
        () => subscription.unsubscribe();
    }, [store]);

    useEffect(() => {
        const apply = async () => {
            if (!(onBookmarkApplied && payload)) {
                return;
            }

            if (currentContext?.id !== payload?.context?.id) {
                await contextManager.setCurrentContextIdAsync(payload!.context!.id);
                onBookmarkApplied(payload, true);
            } else {
                onBookmarkApplied(payload, false);
            }
        };
        apply();
    }, [payload, currentContext]);

    useEffect(() => {
        if (
            showModal === 'Show' &&
            headBookmark &&
            personDetails?.azureUniqueId !== headBookmark.createdBy.azureUniqueId
        ) {
            setShowModal('Open');
            const addBookmark = async () => {
                const response = await createNotification({
                    level: 'high',
                    title: `Launched bookmark: "${headBookmark.name}"`,
                    confirmLabel: 'Save to my bookmarks',
                    cancelLabel: `Don't save`,
                    body: (
                        <>
                            <div>{headBookmark.description && headBookmark.description}</div>
                            <div>Created by: {headBookmark.createdBy.name}</div>
                        </>
                    ),
                });
                if (!response.confirmed) {
                    setShowModal('Close');
                    return;
                }

                try {
                    store.favouriteBookmark(headBookmark.appKey, headBookmark.id);
                } catch (e) {}
            };
            addBookmark();
        }
    }, [createNotification, showModal, store, headBookmark, personDetails]);

    return <Provider value={{ store }}>{children}</Provider>;
};

export default BookmarkProvider;
