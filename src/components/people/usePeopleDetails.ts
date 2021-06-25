import { useState, useCallback, useEffect } from 'react';
import { PersonDetails, useApiClients } from '@equinor/fusion';
interface PersonId {
    id: string;
}
interface Person {
    person: PersonDetails;
}
type UsePeopleDetailsProps = PersonId | Person;
export const usePeopleDetails = (props: UsePeopleDetailsProps) => {
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
        [apiClients.people]
    );

    useEffect(() => {
        const isPersonId = (data: UsePeopleDetailsProps): data is PersonId => {
            return (data as PersonId).id !== undefined;
        };

        if (isPersonId(props)) {
            fetchPersonData(props.id);
        } else {
            setPersonDetails(props.person);
            setIsFetching(false);
            setError(null);
        }
    }, [props, fetchPersonData]);

    return { personDetails, isFetching, error };
};

export default usePeopleDetails;
