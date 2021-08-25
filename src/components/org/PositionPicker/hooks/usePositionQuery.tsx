import { useState, useCallback, useEffect } from 'react';
import { useFusionContext, Position } from '@equinor/fusion';
import { isAfter, isBefore } from 'date-fns';

const usePositionQuery = (
    selectedPosition: Position | null,
    projectId: string,
    contractId?: string,
    allowFuture?: boolean,
    allowPast?: boolean
): [Error | null, boolean, Position[], (query: string) => void] => {
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [query, setQuery] = useState('');
    const [positions, setPositions] = useState<Position[]>([]);
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);

    const fusionContext = useFusionContext();

    const canQuery = (query: string) => !!query && query.length > 2;

    const performFetchAsync = useCallback(async (projectId: string, contractId: string) => {
        return contractId
            ? fusionContext.http.apiClients.org.getContractPositionsAsync(projectId, contractId)
            : fusionContext.http.apiClients.org.getPositionsAsync(projectId);
    }, []);

    const fetchPositions = useCallback(async (projectId: string, contractId?: string) => {
        setPositions([]);
        setIsFetching(true);
        try {
            const response = await performFetchAsync(projectId, contractId);
            setPositions(response.data);
            setIsFetching(false);
        } catch (e) {
            setError(e);
            setIsFetching(false);
            setPositions([]);
        }
    }, []);

    useEffect(() => {
        fetchPositions(projectId, contractId);
    }, [projectId, contractId]);

    useEffect(() => {
        // Refetch positions when setting selected position
        if (selectedPosition && !positions.find((p) => p.id === selectedPosition.id)) {
            fetchPositions(projectId, contractId);
        }
    }, [selectedPosition]);

    const search = (query: string) => {
        const queryParts = query.toLowerCase().split(' ');
        setQuery(query);

        if (canQuery(query)) {
            const now = Date.now();
            setFilteredPositions(
                positions
                    .filter((position) =>
                        queryParts.every((query) => {
                            const hasActiveInstance = position.instances.some(
                                (i) =>
                                    now >= i.appliesFrom.getTime() && now <= i.appliesTo.getTime()
                            );
                            const activeInstanceMatches = position.instances.some(
                                (i) =>
                                    now >= i.appliesFrom.getTime() &&
                                    now <= i.appliesTo.getTime() &&
                                    i.assignedPerson &&
                                    i.assignedPerson.name.toLowerCase().includes(query)
                            );

                            const immediateFutureInstance = position.instances
                                .sort((a, b) => a.appliesFrom.getTime() - b.appliesFrom.getTime())
                                .filter((x) => isAfter(x.appliesFrom, now))[0];
                            const hasImmediateFutureInstance =
                                immediateFutureInstance?.assignedPerson?.name
                                    .toLowerCase()
                                    .includes(query);

                            const immediatePastInstance = position.instances
                                .sort((a, b) => b.appliesTo.getTime() - a.appliesTo.getTime())
                                .filter((x) => isBefore(x.appliesTo, now))[0];
                            const hasImmediatePastInstance =
                                immediatePastInstance?.assignedPerson?.name
                                    .toLowerCase()
                                    .includes(query);

                            return (
                                (position.name || '').toLowerCase().includes(query) ||
                                (position.externalId || '').toLowerCase().includes(query) ||
                                activeInstanceMatches ||
                                (!hasActiveInstance && allowFuture && hasImmediateFutureInstance) ||
                                (!hasActiveInstance && allowPast && hasImmediatePastInstance)
                            );
                        })
                    )
                    .slice(0, 10)
            );
        }
    };

    return [error, isFetching, filteredPositions, search];
};

export default usePositionQuery;
