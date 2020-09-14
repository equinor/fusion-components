import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';

export const enum ApplicationGuideEventType {
    activated = 'application-guide-activated',
    deactivated = 'application-guide-deactivated',
    scope = 'application-guide-scope',
    show = 'application-guide-show',
    selection = 'application-guide-selection',
}

export type ApplicationGuideEventDetail = {
    selected?: string;
    scope?: string;
    active?: boolean;
    info?: QuickFact;
}

export class ApplicationGuideEvent<T extends ApplicationGuideEventType> extends CustomEvent<ApplicationGuideEventDetail> {
    constructor(type: T, init: CustomEventInit<ApplicationGuideEventDetail>) {
        super(type, init);
    }
}

declare global {
    interface ElementEventMap {
        [ApplicationGuideEventType.activated]: ApplicationGuideEvent<ApplicationGuideEventType.activated>;
        [ApplicationGuideEventType.deactivated]: ApplicationGuideEvent<ApplicationGuideEventType.deactivated>;
        [ApplicationGuideEventType.show]: ApplicationGuideEvent<ApplicationGuideEventType.show>;
        [ApplicationGuideEventType.selection]: ApplicationGuideEvent<ApplicationGuideEventType.selection>;
    }
}