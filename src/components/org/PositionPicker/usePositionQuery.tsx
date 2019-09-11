import { useState, useCallback, useEffect } from 'react';
import { useFusionContext, useDebouncedAbortable, Position } from '@equinor/fusion';

const usePositionQuery = (
    projectId: string
): [Error | null, boolean, Position[], (query: string) => void] => {
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [query, setQuery] = useState('');
    const [positions, setPositions] = useState<Position[]>([]);
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);

    const fusionContext = useFusionContext();

    const canQuery = (query: string) => !!query && query.length > 2;

    const fetchPosition = useCallback(async (projectId: string) => {
        setPositions([]);
        setIsFetching(true);
        try {
            const response = await fusionContext.http.apiClients.org.getPositionsAsync(projectId);
            setPositions(response.data);
            setIsFetching(false);
        } catch (e) {
            setError(e);
            setIsFetching(false);
            setPositions([]);
        }
    }, []);

    useDebouncedAbortable(fetchPosition, projectId);

    const search = (query: string) => {
        query = query.toLowerCase();
        setQuery(query);

        if (canQuery(query)) {
            const now = Date.now();
            setFilteredPositions(
                positions
                    .filter(
                        position =>
                            position.name.toLowerCase().includes(query) ||
                            position.instances.some(
                                i =>
                                    now >= i.appliesFrom.getTime() &&
                                    now <= i.appliesTo.getTime() &&
                                    i.assignedPerson &&
                                    i.assignedPerson.name.toLowerCase().includes(query)
                            )
                    )
                    .slice(0, 10)
            );
        }
    };

    return [error, isFetching, filteredPositions, search];
};

export default usePositionQuery;
