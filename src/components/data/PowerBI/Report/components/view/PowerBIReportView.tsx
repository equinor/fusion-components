import React, { useContext, useEffect, FunctionComponent, useCallback, useMemo, useState } from 'react';

import { PowerBIEmbed, EventHandler } from 'powerbi-client-react';

import { context, PowerBIEmbedEvents } from '../../context';
import { IEmbedConfiguration, service as PowerBIServices , factories } from 'powerbi-client';
import useConfig from './useConfig';

import * as styles from './styles.less';
import usePowerBIFilters from './useFilters';

export type PowerBIComponentProps = {
    config?: Omit<IEmbedConfiguration, 'accessToken'>;
};

const service = new PowerBIServices.Service(
    factories.hpmFactory,
    factories.wpmpFactory,
    factories.routerFactory
);

export const PowerBIReportView: FunctionComponent<PowerBIComponentProps> = (props: PowerBIComponentProps) => {
    const { metrics, component, event$ } = useContext(context);

    const embedConfig = useConfig(props.config);
    const eventHandlers = useMemo(
        () =>
            Object.values(PowerBIEmbedEvents).reduce(
                (cur, type) => cur.set(type, (event, entity) => event$.next({ type, event, entity })),
                new Map<any, EventHandler>()
            ),
        [event$]
    );

    const getEmbeddedComponent = useCallback((value) => (component.current = value), [component]);

    usePowerBIFilters(event$, props.config?.filters);

    // when access token changes reload the component
    useEffect(() => {
        if (!embedConfig?.accessToken) return;
        metrics.performance.mark('load');
        try {
            // component might been unmounted
            component.current?.reload();
        } catch {}
    }, [metrics, component, embedConfig?.accessToken]);

    // only render component when access token
    if (embedConfig?.accessToken) {
        const cssClassName = styles.iframeContainer;
        return <PowerBIEmbed {...{ embedConfig, eventHandlers, getEmbeddedComponent, cssClassName, service }}></PowerBIEmbed>;
    }
    return null;
};

export default PowerBIReportView;
