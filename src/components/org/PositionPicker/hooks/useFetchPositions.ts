import { Position, useApiClients } from '@equinor/fusion';
import { useCallback, useState } from 'react';

const useFetchPositions = () => {
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [positions, setPositions] = useState<Position[]>([]);
    const apiClients = useApiClients();

    const performFetchAsync = useCallback(
        async (projectId: string, contractId: string) => {
            return contractId
                ? apiClients.org.getContractPositionsAsync(projectId, contractId)
                : apiClients.org.getPositionsAsync(projectId);
        },
        [apiClients]
    );

    const fetchPositions = useCallback(
        async (projectId: string, contractId?: string) => {
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
        },
        [performFetchAsync]
    );

    return {
        fetchPositions,
        error,
        isFetching,
        positions,
    };
};

export default useFetchPositions;
