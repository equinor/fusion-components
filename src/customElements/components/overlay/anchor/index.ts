import { fusionElement } from '../../base';
import Element from './element';

export const OverlayAnchorElementTag = 'fusion-overlay-anchor';

@fusionElement(OverlayAnchorElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [OverlayAnchorElementTag]: _element
    }
}

export * from './element';
export * from './events';
export * from './anchor-rect';
