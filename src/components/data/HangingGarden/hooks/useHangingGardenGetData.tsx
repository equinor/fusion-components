import { useApiClients, ApiClients } from '@equinor/fusion';
import * as React from 'react';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';
import { ErrorTypes } from 'src/components/general/ErrorMessage';

export type GardenDataError = {
    errorType: ErrorTypes | 'noCache';
    error: any;
};

const useHangingGardenGetData = <T, C extends keyof ApiClients, E extends keyof ApiClients[C]>(
    client: C,
    endpoint: E
) => {
    const api = useApiClients();
    const [error, setError] = React.useState<GardenDataError | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);

    const fetchData = React.useCallback(
        async (currentContext: string, invalidateCache?: boolean) => {
            setIsFetching(true);
            try {
                const response = (await (api[client][endpoint] as any)(
                    currentContext,
                    invalidateCache
                )) as HttpResponse<T[]>;

                if (response.status === 202) {
                    setError({ errorType: 'noCache', error: response.data });
                    setIsFetching(false);
                    return null;
                }

                if (response.status === 200 && !response.data.length) {
                    setError({ errorType: 'noData', error: response.data });
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
                setError({ errorType: 'error', error: e });
                setIsFetching(false);
                return null;
            }
        },
        [client, endpoint, api]
    );

    const getData = React.useCallback(
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
