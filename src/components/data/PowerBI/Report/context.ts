import { createContext, MutableRefObject } from 'react';

import { Report, Dashboard, service, Embed } from 'powerbi-client';

import { Store, State } from './store';
import { TelemetryObserver } from '@equinor/fusion';
import { Subject } from 'rxjs';

export type PowerBIEmbedComponent = Report | Dashboard;
export enum PowerBIEmbedEvents {
    Loaded = 'loaded',
    rendered = 'rendered',
    error = 'error',
    buttonClicked = 'buttonClicked',
    pageChanged = 'pageChanged',
}

export type PowerBIEmbedEventEntry = {
    type: PowerBIEmbedEvents;
    event?: service.ICustomEvent<any>;
    entity?: Embed;
};

export type PowerBIReportContext = {
    store: Store;
    // events dispatched from the embedded component
    event$: Subject<PowerBIEmbedEventEntry>;
    component?: MutableRefObject<PowerBIEmbedComponent | undefined>;
    metrics?: TelemetryObserver<State>;
};

export const context = createContext<PowerBIReportContext>({} as PowerBIReportContext);
