import { ApplicationGuidanceAnchor } from '../types';


export type AppGuideAnchorConnectEventDetail = ApplicationGuidanceAnchor & {
    disconnectedCallback: (cb: VoidFunction) => void;
}

/**
 * event for notifying observers that element has connected to the dom
 */
export class AppGuideAnchorConnectEvent extends CustomEvent<AppGuideAnchorConnectEventDetail> {
    constructor(args: CustomEventInit<AppGuideAnchorConnectEventDetail>) {
        super('app-guide-anchor', args);
    }
}

declare global {
    interface ElementEventMap {
        'app-guide-anchor': AppGuideAnchorConnectEvent;
    }
}