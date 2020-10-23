import { OverlayAnchor } from './element';

export type OverlayAnchorConnectEventDetail = OverlayAnchor & {
    disconnectedCallback: (cb: VoidFunction) => void;
}

/**
 * event for notifying observers that element has connected to the dom
 */
export class OverlayAnchorConnectEvent extends CustomEvent<OverlayAnchorConnectEventDetail> {
    static readonly eventName = 'app-guide-anchor';
    constructor(args: CustomEventInit<OverlayAnchorConnectEventDetail>) {
        super(OverlayAnchorConnectEvent.eventName.toString(), args);
    }
}

declare global {
    interface ElementEventMap {
        [OverlayAnchorConnectEvent.eventName]: OverlayAnchorConnectEvent;
    }
}