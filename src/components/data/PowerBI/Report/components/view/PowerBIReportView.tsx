import { useContext, useEffect, FC, useMemo } from 'react';
import { PowerBIEmbed, EventHandler } from 'powerbi-client-react';
import { context, PowerBIEmbedEvents } from '../../context';
import { IEmbedConfiguration, service as PowerBIServices, factories } from 'powerbi-client';
import useConfig from './useConfig';
import usePowerBIFilters from './useFilters';
import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export type PowerBIComponentConfig = Omit<IEmbedConfiguration, 'accessToken'>;

export type PowerBIComponentProps = {
    config?: PowerBIComponentConfig;
};

const service = new PowerBIServices.Service(
    factories.hpmFactory,
    factories.wpmpFactory,
    factories.routerFactory
);

const useStyles = makeStyles(
    () =>
        createStyles({
            iframeContainer: {
                display: 'flex',
                height: '100%',
                width: '100%',
                '&>iframe': { border: 'none' },
            },
        }),
    { name: 'fusion-powerBi-iframe' }
);

export const PowerBIReportView: FC<PowerBIComponentProps> = ({ config }: PowerBIComponentProps) => {
    const { metrics, component, event$ } = useContext(context);

    const embedConfig = useConfig(config);
    const eventHandlers = useMemo(
        () =>
            Object.values(PowerBIEmbedEvents).reduce(
                (cur, type) =>
                    cur.set(type, (event, entity) => event$.next({ type, event, entity })),
                new Map<any, EventHandler>()
            ),
        [event$]
    );

    const getEmbeddedComponent = (value) => {
        component.current = value;
    };

    usePowerBIFilters(event$, config?.filters);

    // when access token changes reload the component
    useEffect(() => {
        if (!embedConfig?.accessToken) return;
        metrics?.performance.mark('load');
        try {
            // component might been unmounted
            console.debug('updating access token');
            component?.current?.setAccessToken(embedConfig.accessToken);
        } catch (err) {
            // TODO - make own action
            console.error(err);
            metrics.error({ name: 'access_token_error', properties: { error: err } });
        }
    }, [metrics, component, embedConfig?.accessToken]);

    const cssClassName = useStyles().iframeContainer;
    // only render component when access token
    if (embedConfig) {
        return (
            <PowerBIEmbed
                {...{ embedConfig, eventHandlers, getEmbeddedComponent, cssClassName, service }}
            ></PowerBIEmbed>
        );
    }
    return null;
};

export default PowerBIReportView;
