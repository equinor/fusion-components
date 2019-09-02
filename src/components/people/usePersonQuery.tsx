import { useState, useCallback } from 'react';
import { useFusionContext, PersonDetails, useDebouncedAbortable } from '@equinor/fusion';

const usePersonQuery = (): [Error | null, boolean, PersonDetails[], (query: string) => void] => {
    const [error, setError] = useState(null);
    const [isQuerying, setQuerying] = useState(false);
    const [query, setQuery] = useState('');
    const [people, setPeople] = useState<PersonDetails[]>([]);

    const fusionContext = useFusionContext();

    const canQuery = (query: string) => !!query && query.length > 2;

    const fetchPeople = useCallback(async (query: string) => {
        if (canQuery(query)) {
            setPeople([]);
            try {
                const response = await fusionContext.http.apiClients.people.searchPersons(query);
                setPeople(response.data);
                setQuerying(false);
            } catch (e) {
                setError(e);
                setQuerying(false);
                setPeople([]);
            }
        }
    }, []);

    useDebouncedAbortable(fetchPeople, query);

    const search = (query: string) => {
        setQuerying(canQuery(query));
        setQuery(query);
    };

    return [error, isQuerying, people, search];
};

export default usePersonQuery;
