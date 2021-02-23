import { OverlayAnchor } from '../overlay/anchor';
import { OverLayScope } from './element';

export enum OverlayEventType {
    activated = 'overlay-activated',
    deactivated = 'overlay-deactivated',
    scope = 'overlay-scope',
    selection = 'overlay-selection',
    anchor = 'overlay-anchor',
}

export type OverlayEventDetail = {
    selected?: OverlayAnchor;
    scope?: OverLayScope;
    active?: boolean;
};

export class OverlayEvent<T extends OverlayEventType> extends CustomEvent<OverlayEventDetail> {
    constructor(type: T, init: CustomEventInit<OverlayEventDetail>) {
        super(type, init);
    }
}

declare global {
    interface ElementEventMap {
        [OverlayEventType.activated]: OverlayEvent<OverlayEventType.activated>;
        [OverlayEventType.deactivated]: OverlayEvent<OverlayEventType.deactivated>;
        [OverlayEventType.scope]: OverlayEvent<OverlayEventType.scope>;
        [OverlayEventType.selection]: OverlayEvent<OverlayEventType.selection>;
        [OverlayEventType.anchor]: OverlayEvent<OverlayEventType.anchor>;
    }
}
