import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';
import { OverLayScope } from '../overlay';

export enum ApplicationGuideEventType {
    activated = 'application-guide-activated',
    deactivated = 'application-guide-deactivated',
    scope = 'application-guide-scope',
    show = 'application-guide-show',
    selection = 'application-guide-selection',
}

export type ApplicationGuideEventDetail = {
    selected?: { scope: string; anchor: string };
    scope?: OverLayScope;
    active?: boolean;
    info?: QuickFact;
};

export class ApplicationGuideEvent<
    T extends ApplicationGuideEventType | unknown = unknown
> extends CustomEvent<ApplicationGuideEventDetail> {
    constructor(type: T, init: CustomEventInit<ApplicationGuideEventDetail>) {
        super(type as ApplicationGuideEventType, init);
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
