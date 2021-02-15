import { useState, useCallback } from 'react';
import { useApiClients, ApiClients } from '@equinor/fusion';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';
import { GardenDataError } from '../models/GardenDataError';
/**
 * The useHangingGardenGetData is used by useHangingGardenData for the acutal api call, but can be used on it own.
 *
 * @param client Name of ApiClient to be used when fetching data.
 * @param endpoint Name of endpoint on given ApiClient to be used when fetching data.
 * @returns getData: takes in currentContext Id and InvalidateCache boolean. Does the api call and return the raw data. error: handles errors gives a GardenDataError or null. isFetching: a fetching flag boolean
 * @example
 * const { isFetching, error, getData } = useHangingGardenGetData('ApiClient', 'endpoint');
 *
 * const currentContext = useCurrentContext();
 * const data = await getData(currentContext.id, true);
 *
 */
const useHangingGardenGetData = <T, C extends keyof ApiClients, E extends keyof ApiClients[C]>(
    client: C,
    endpoint: E
) => {
    const api = useApiClients();
    const [error, setError] = useState<GardenDataError | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(
        async (currentContext: string, invalidateCache?: boolean) => {
            setIsFetching(true);
            try {
                const response = (await (api[client][endpoint] as any)(
                    currentContext,
                    invalidateCache
                )) as HttpResponse<T[]>;

                if (response.status === 202) {
                    setError({ errorType: 'noCache' });
                    setIsFetching(false);
                    return null;
                }

                if (response.status === 200 && !response.data.length) {
                    setError({ errorType: 'noData' });
                    setIsFetching(false);
                    return null;
                }

                const cacheAgeHeader = response.headers.get('x-pp-cache-age');
                const cacheAge =
                    cacheAgeHeader === null || cacheAgeHeader === 'live'
                        ? new Date()
                        : new Date(cacheAgeHeader);
                const cacheDurationHeader = response.headers.get('x-pp-cache-duration-minutes');
                const cacheDuration = parseInt(cacheDurationHeader || '30', 10);

                setIsFetching(false);
                return {
                    data: response.data,
                    cacheAge,
                    cacheDurationInMinutes: cacheDuration,
                };
            } catch (e) {
                setError({
                    errorType: e?.response?.error?.code || 'error',
                    errorResponse: e?.response?.error || null,
                });
                setIsFetching(false);
                return null;
            }
        },
        [client, endpoint, api]
    );

    const getData = useCallback(
        (currentContext: string, invalidateCache?: boolean) => {
            setError(null);
            setIsFetching(false);
            return fetchData(currentContext, invalidateCache);
        },
        [fetchData]
    );

    return {
        getData,
        error,
        isFetching,
    };
};

export default useHangingGardenGetData;