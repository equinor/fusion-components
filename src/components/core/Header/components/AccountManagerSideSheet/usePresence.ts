import { PersonPresence, useApiClients } from '@equinor/fusion';
import { useCallback, useEffect, useState } from 'react';

const usePresence = (id: string) => {
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
            } catch (e) {
                setPresenceError(e);
            } finally {
                setIsFetchingPresence(false);
            }
        },
        [apiClients]
    );

    useEffect(() => {
        fetchPresenceStatus(id);
    }, [fetchPresenceStatus]);

    return { presence, isFetchingPresence, presenceError };
};
export default usePresence;
