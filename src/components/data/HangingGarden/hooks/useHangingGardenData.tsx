import { useCurrentContext, Context, useApiClients, ApiClients } from '@equinor/fusion';
import * as React from 'react';
import moment from 'moment';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';

const useHangingGardenData = <T, C extends keyof ApiClients, E extends keyof ApiClients[C]>(
    client: C,
    endpoint: E,
    applyToFetchedData?: ((data: T[]) => T[]) | null,
    searchableValues?: ((data: T) => T) | null
) => {
    const currentContext = useCurrentContext();
    const api = useApiClients();
    const [data, setData] = React.useState<T[]>([]);
    const [error, setError] = React.useState<Error | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);
    const [cacheAgeDate, setCacheAgeDate] = React.useState<Date>(new Date());
    const [cacheDuration, setCacheDuration] = React.useState<number>(30);
    const [cacheAge, setCacheAge] = React.useState('');

    const [cacheIsInvalid, setCacheIsInvalid] = React.useState(true);
    const cacheCheckTimerRef = React.useRef<NodeJS.Timeout>();

    const checkCacheValidity = React.useCallback(() => {
        setCacheAge(moment(cacheAgeDate).fromNow());
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

    const reset = React.useCallback(() => {
        setData([]);
        setError(null);
        setIsFetching(false);
    }, []);

    React.useEffect(() => {
        reset();
    }, [currentContext]);

    const getData = React.useCallback(
        async (currentContext: Context, invalidateCache: boolean) => {
            const response = (await (api[client][endpoint] as any)(
                currentContext.id,
                invalidateCache
            )) as HttpResponse<T[]>;

            const cacheAgeHeader = response.headers.get('x-pp-cache-age');
            const cacheAge =
                cacheAgeHeader === null || cacheAgeHeader === 'live'
                    ? new Date()
                    : new Date(cacheAgeHeader);
            const cacheDurationHeader = response.headers.get('x-pp-cache-duration-minutes');
            const cacheDuration = parseInt(cacheDurationHeader || '30', 10);

            return {
                data: response.data,
                cacheAge,
                cacheDurationInMinutes: cacheDuration,
            };
        },
        [client, endpoint, api, currentContext]
    );

    const formatData = React.useCallback(
        (data: T[]) => {
            const formattedData = applyToFetchedData ? applyToFetchedData(data) : data;
            return searchableValues ? formattedData.map(searchableValues) : formattedData;
        },
        [searchableValues, applyToFetchedData]
    );

    const fetch = React.useCallback(
        async (invalidateCache: boolean) => {
            if (!currentContext) {
                reset();
                return;
            }

            try {
                setIsFetching(true);
                const result = await getData(currentContext, invalidateCache);

                setError(null);
                setData(formatData(result.data));
                setCacheAgeDate(result.cacheAge);
                setCacheDuration(result.cacheDurationInMinutes);
            } catch (e) {
                console.error(e);
                setError(e);
            } finally {
                setIsFetching(false);
            }
        },
        [currentContext, getData, formatData]
    );

    React.useEffect(() => {
        fetch(false);
    }, [currentContext?.id]);

    const retry = React.useCallback(() => {
        reset();
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
