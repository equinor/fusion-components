import { useContext, useMemo } from 'react';

import { IEmbedConfiguration } from 'powerbi-client';

import deepmerge from 'deepmerge';

import { useSelector } from '@equinor/fusion/lib/epic';
import { context } from '../../context';
import { createConfig } from './embed-config';

export const useConfig = (options: IEmbedConfiguration = {}) => {
    const pbiContext = useContext(context);
    if (!pbiContext) return {};
    const { store } = pbiContext;

    const embedInfo = useSelector(store, 'embedInfo');
    const config = useMemo(() => embedInfo && createConfig(embedInfo), [embedInfo]);
    const accessToken = useSelector(store, 'token')?.token;
    const embedConfig = useMemo<IEmbedConfiguration | null>(() => {
        if (!config) return null;
        return { ...deepmerge(config, options), accessToken };
    }, [config, options, accessToken]);
    return embedConfig;
};

export default useConfig;
