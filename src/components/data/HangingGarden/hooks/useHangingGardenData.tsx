import { useCurrentContext, ApiClients } from '@equinor/fusion';
import * as React from 'react';
import useHangingGardenGetData from './useHangingGardenGetData';
import { formatDistance } from 'date-fns';

/**
 * The useHangingGardenData hook fetched and stores your raw garden data. It also gives you cache invalidation capabilities and error handling. 
 * 
 * @param client Name of ApiClient to be used when fetching data.
 * @param endpoint Name of endpoint on given ApiClient to be used when fetching data.
 * @param applyToFetchedData Optional. A function that takes in and return the fetched data. Can be used if one wants "massage" the dat before returned
 * @param searchableValues Optional. A function that is used in a map to add a searchable field to each fetched item. 
 * @returns data: fetched data, array of T. error: null if OK, else a GardenError object. isFetching: fetching state. retry: a function to initiate a new fetch. Will first remove current data.
 * invalidate: a function to initiate a new fetch. Will NOT first remove current data. cacheIsInvalid: state of the cache, is invalid if cache is 30 min or older. cacheAge: age of cache in minutes
 * @example 
 *  
 * 
export const setItemSearchableValues = (commpkg: HandoverPackage) => ({
    ...commpkg,
    searchableValues: [
        commpkg.commpkgNo,
        commpkg.description,
        commpkg.area,
        commpkg.responsible,
    ].join(),
});
 * 
 *  const applyToFetchedData = (data: HandoverPackage[]) => data.filter((item) => !item.isDemolition);
 * 
 * const {
        data,
        error,
        isFetching,
        retry,
        invalidate,
        cacheAge,
        cacheIsInvalid,
    } = useHangingGardenData(
        'dataProxy',
        'getHandoverAsync',
        applyToFetchedData,
        setItemSearchableValues
    );
 */

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
        if (cacheCheckTimerRef.current) clearTimeout(cacheCheckTimerRef.current);

        checkCacheValidity();

        return () => cacheCheckTimerRef.current && clearTimeout(cacheCheckTimerRef.current);
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
        setData([]);
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
