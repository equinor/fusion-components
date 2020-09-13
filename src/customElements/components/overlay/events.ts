import { OverlayAnchor } from "./anchor";

export const enum OverlayElementEventType {
    activated = 'overlay-activated',
    deactivated = 'overlay-deactivated',
    scope = 'overlay-scope',
    selection = 'overlay-selection',
}

export type OverlayElementEventDetail = {
    selected?: OverlayAnchor;
    scope?: string;
    active?: boolean;
}

export class OverlayElementEvent<T extends OverlayElementEventType> extends CustomEvent<OverlayElementEventDetail> {
    constructor(type: T, init: CustomEventInit<OverlayElementEventDetail>) {
        super(type, init);
    }
}

declare global {
    interface ElementEventMap {
        [OverlayElementEventType.activated]: OverlayElementEvent<OverlayElementEventType.activated>;
        [OverlayElementEventType.deactivated]: OverlayElementEvent<OverlayElementEventType.deactivated>;
        [OverlayElementEventType.scope]: OverlayElementEvent<OverlayElementEventType.scope>;
        [OverlayElementEventType.selection]: OverlayElementEvent<OverlayElementEventType.selection>;
    }
}