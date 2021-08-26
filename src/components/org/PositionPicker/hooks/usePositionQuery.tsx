import { useState, useCallback, useEffect } from 'react';
import { useFusionContext, Position } from '@equinor/fusion';
import { isAfter, isBefore } from 'date-fns';
import {
    hasNameMatchInQuery,
    isInstanceCurrent,
    sortInstancesByFrom,
    sortInstancesByTo,
} from '../utils';
import useFetchPositions from './useFetchPositions';

const hasPositionQueryMatch = (
    position: Position,
    query: string,
    allowFuture: boolean,
    allowPast: boolean
) => {
    const now = Date.now();
    const hasActiveInstance = position.instances.some(isInstanceCurrent);

    const immediateFutureInstance = sortInstancesByFrom(position.instances).filter((x) =>
        isAfter(x.appliesFrom, now)
    )[0];

    // Checks for match in assigned person name for closest future instance
    const hasImmediateFutureInstance = hasNameMatchInQuery(immediateFutureInstance, query);
    const immediatePastInstance = sortInstancesByTo(position.instances).filter((x) =>
        isBefore(x.appliesTo, now)
    )[0];

    // Checks for match in assigned person name for closest past instance
    const hasImmediatePastInstance = hasNameMatchInQuery(immediatePastInstance, query);
    const hasActiveInstanceMatch = position.instances.some(
        (i) => isInstanceCurrent(i) && hasNameMatchInQuery(i, query)
    );
    const hasPositionNameMatch = (position.name || '').toLowerCase().includes(query);
    const hasExternalIdMatch = (position.externalId || '').toLowerCase().includes(query);
    const hasImmediateFutureMatch = !hasActiveInstance && allowFuture && hasImmediateFutureInstance;
    const hasImmediatePastMatch = !hasActiveInstance && allowPast && hasImmediatePastInstance;

    return (
        hasActiveInstanceMatch ||
        hasPositionNameMatch ||
        hasExternalIdMatch ||
        hasImmediateFutureMatch ||
        hasImmediatePastMatch
    );
};

const usePositionQuery = (
    selectedPosition: Position | null,
    projectId: string,
    contractId?: string,
    allowFuture?: boolean,
    allowPast?: boolean
): [Error | null, boolean, Position[], (query: string) => void] => {
    const [query, setQuery] = useState('');
    const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);

    const canQuery = (query: string) => !!query && query.length > 2;

    const { error, fetchPositions, isFetching, positions } = useFetchPositions();

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
        if (!canQuery(query)) return;

        const now = Date.now();
        const filteredPositions = positions
            .filter((position) =>
                queryParts.every((query) =>
                    hasPositionQueryMatch(position, query, allowFuture, allowPast)
                )
            )
            .slice(0, 10);
        setFilteredPositions(filteredPositions);
    };

    return [error, isFetching, filteredPositions, search];
};

export default usePositionQuery;
