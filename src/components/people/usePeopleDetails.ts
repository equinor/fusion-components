import { useState, useCallback, useEffect } from 'react';
import { PersonDetails, useFusionContext } from '@equinor/fusion';

export const usePeopleDetails = (personId?: string, person?: PersonDetails) => {
    const [isFetching, setIsFetching] = useState(false);
    const [personDetails, setPersonDetails] = useState<PersonDetails | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const fusionContext = useFusionContext();

    const fetchPersonData = useCallback(async (personId: string) => {
        setIsFetching(true);
        setPersonDetails(null);
        try {
            const response = await fusionContext.http.apiClients.people.getPersonDetailsAsync(
                personId
            );
            setPersonDetails(response.data);
            setIsFetching(false);
            setError(null);
        } catch (e) {
            setPersonDetails(null);
            setIsFetching(false);
            setError(e);
        }
    }, []);

    useEffect(() => {
        if (personId) {
            fetchPersonData(personId);
        }
    }, [fetchPersonData, personId]);

    return personId
        ? { personDetails, isFetching, error }
        : { error: null, personDetails: person, isFetching: false };
};

export default usePeopleDetails;
