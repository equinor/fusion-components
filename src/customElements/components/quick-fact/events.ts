import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';
import { ViewMode } from './element';

export enum QuickFactEventType {
    show = 'quick-fact-show',
    fetch = 'quick-fact-fetch',
    fetched = 'quick-fact-fetched',
    created = 'quick-fact-created',
    updated = 'quick-fact-updated',
}

export type QuickFactEventDetail = {
    anchor?: string;
    scope?: string;
    info?: QuickFact;
    view?: ViewMode;
};

export class QuickFactEvent<T extends QuickFactEventType> extends CustomEvent<
    QuickFactEventDetail
> {
    constructor(type: T, init: CustomEventInit<QuickFactEventDetail>) {
        super(type, init);
    }
}

declare global {
    interface ElementEventMap {
        [QuickFactEventType.show]: QuickFactEvent<QuickFactEventType.show>;
        [QuickFactEventType.fetch]: QuickFactEvent<QuickFactEventType.fetch>;
        [QuickFactEventType.fetched]: QuickFactEvent<QuickFactEventType.fetched>;
        [QuickFactEventType.created]: QuickFactEvent<QuickFactEventType.created>;
        [QuickFactEventType.updated]: QuickFactEvent<QuickFactEventType.updated>;
    }
}
