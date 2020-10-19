import { useCurrentContext, ApiClients } from '@equinor/fusion';
import * as React from 'react';
import { formatDistance } from 'date-fns';
import useHangingGardenGetData from './useHangingGardenGetData';

const useHangingGardenData = <T, C extends keyof ApiClients, E extends keyof ApiClients[C]>(
    client: C,
    endpoint: E,
    applyToFetchedData?: ((data: T[]) => T[]) | null,
    searchableValues?: ((data: T) => T) | null
) => {
    const currentContext = useCurrentContext();
    const { isFetching, error, getData } = useHangingGardenGetData(client, endpoint);
    const [data, setData] = React.useState<T[]>([]);

    const [cacheAgeDate, setCacheAgeDate] = React.useState<Date>(new Date());
    const [cacheDuration, setCacheDuration] = React.useState<number>(30);
    const [cacheAge, setCacheAge] = React.useState('');
    const [cacheIsInvalid, setCacheIsInvalid] = React.useState(true);
    const cacheCheckTimerRef = React.useRef<NodeJS.Timeout>();

    const checkCacheValidity = React.useCallback(() => {
        setCacheAge(formatDistance(cacheAgeDate, new Date()));
        const isInvalid =
            new Date(cacheAgeDate).setMinutes(cacheAgeDate.getMinutes() + cacheDuration) <
            Date.now();
        setCacheIsInvalid(isInvalid);
        cacheCheckTimerRef.current = setTimeout(checkCacheValidity, 60000);
    }, [cacheAgeDate, cacheDuration]);

    React.useEffect(() => {
        if (cacheCheckTimerRef.current) {
            clearTimeout(cacheCheckTimerRef.current);
        }

        checkCacheValidity();

        return () => {
            if (cacheCheckTimerRef.current) {
                clearTimeout(cacheCheckTimerRef.current);
            }
        };
    }, [checkCacheValidity]);

    const formatData = React.useCallback(
        (data: T[]) => {
            const formattedData = applyToFetchedData ? applyToFetchedData(data) : data;
            return searchableValues ? formattedData.map(searchableValues) : formattedData;
        },
        [searchableValues, applyToFetchedData]
    );

    const fetch = React.useCallback(
        async (invalidateCache: boolean) => {
            if (!currentContext) return;

            const result = await getData(currentContext.id, invalidateCache);
            setData(formatData((result?.data as T[]) || []));
            setCacheAgeDate(result?.cacheAge || new Date());
            setCacheDuration(result?.cacheDurationInMinutes || 30);
        },
        [currentContext, isFetching, error, getData, formatData]
    );

    React.useEffect(() => {
        fetch(false);
    }, [currentContext?.id]);

    const retry = React.useCallback(() => {
        setData([]);
        fetch(true);
    }, [fetch]);

    const invalidate = React.useCallback(() => {
        fetch(true);
    }, [fetch]);

    return {
        data,
        error,
        isFetching,
        retry,
        invalidate,
        cacheIsInvalid,
        cacheAge,
    };
};

export default useHangingGardenData;
