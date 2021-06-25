import { PersonDetails, PersonPresence, useApiClients } from '@equinor/fusion';
import { useCallback, useEffect, useState } from 'react';

type PersonId = {
    id: string;
};
type Person = {
    person: PersonDetails;
};
type PersonArgs = PersonId | Person;
const usePresence = (personArg: PersonArgs, fetch: boolean) => {
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
        const isPersonId = (data: PersonArgs): data is PersonId => {
            return (data as PersonId).id !== undefined;
        };
        const now = new Date();
        const diff = now.getTime() - (lastFetched ? lastFetched.getTime() : 0);
        if (diff / 1000 > 10 && fetch) {
            if (isPersonId(personArg)) {
                fetchPresenceStatus(personArg.id);
            } else {
                fetchPresenceStatus(personArg.person.azureUniqueId);
            }
        }
    }, [fetchPresenceStatus, fetch, lastFetched, personArg]);

    return { presence, isFetchingPresence, presenceError };
};
export default usePresence;
