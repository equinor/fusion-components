import { useCurrentContext, Context, useApiClients, ApiClients } from '@equinor/fusion';
import * as React from 'react';
import { HttpResponse } from '@equinor/fusion/lib/http/HttpClient';

const useHangingGardenGetData = <T, C extends keyof ApiClients, E extends keyof ApiClients[C]>(
    client: C,
    endpoint: E
) => {
    const currentContext = useCurrentContext();
    const api = useApiClients();
    const [error, setError] = React.useState<Error | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);

    const fetchData = React.useCallback(
        async (invalidateCache?: boolean) => {
            if (!currentContext?.id) return;
            setIsFetching(true);
            try {
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

                setIsFetching(false);
                return {
                    data: response.data,
                    cacheAge,
                    cacheDurationInMinutes: cacheDuration,
                };
            } catch (e) {
                setError(e);
                setIsFetching(false);
                return null;
            }
        },
        [client, endpoint, api, currentContext]
    );

    const getData = React.useCallback(
        (invalidateCache?: boolean) => {
            setError(null);
            setIsFetching(false);
            return fetchData(invalidateCache);
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
