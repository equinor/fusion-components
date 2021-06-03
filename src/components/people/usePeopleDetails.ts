import { useState, useCallback, useEffect } from 'react';
import { PersonDetails, useApiClients } from '@equinor/fusion';

export const usePeopleDetails = (personId?: string, person?: PersonDetails) => {
    const [isFetching, setIsFetching] = useState(false);
    const [personDetails, setPersonDetails] = useState<PersonDetails | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const apiClients = useApiClients();

    const fetchPersonData = useCallback(
        async (personId: string) => {
            setIsFetching(true);
            setPersonDetails(null);
            try {
                const response = await apiClients.people.getPersonDetailsAsync(personId);
                setPersonDetails(response.data);
                setIsFetching(false);
            } catch (e) {
                setPersonDetails(null);
                setIsFetching(false);
                setError(e);
            }
        },
        [apiClients]
    );

    useEffect(() => {
        if (personId) {
            fetchPersonData(personId);
        } else {
            setPersonDetails(person);
            setIsFetching(false);
            setError(null);
        }
    }, [fetchPersonData, personId, person]);

    return { personDetails, isFetching, error };
};

export default usePeopleDetails;
