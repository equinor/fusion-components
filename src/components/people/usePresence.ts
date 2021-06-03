import { PersonPresence, useApiClients } from '@equinor/fusion';
import { useCallback, useEffect, useState } from 'react';

const usePresence = (id: string, isPopoverOpen: boolean = true) => {
    const [lastFetched, setLastFetched] = useState<Date | null>(null);
    const [presence, setPresence] = useState<PersonPresence | null>(null);
    const [isFetchingPresence, setIsFetchingPresence] = useState<boolean>(false);
    const [presenceError, setPresenceError] = useState<Error | null>(null);
    const apiClients = useApiClients();

    const fetchPresenceStatus = useCallback(
        async (id: string) => {
            setIsFetchingPresence(true);
            setPresenceError(null);

            try {
                const response = await apiClients.people.getPresenceAsync(id);
                setPresence(response.data);
                setLastFetched(new Date());
            } catch (e) {
                setPresenceError(e);
            } finally {
                setIsFetchingPresence(false);
            }
        },
        [apiClients]
    );

    useEffect(() => {
        const now = new Date();
        const diff = now.getTime() - (lastFetched ? lastFetched.getTime() : 0);
        if (diff / 1000 > 10 && isPopoverOpen) {
            fetchPresenceStatus(id);
        }
    }, [id, fetchPresenceStatus, isPopoverOpen, lastFetched]);

    return { presence, isFetchingPresence, presenceError };
};
export default usePresence;
