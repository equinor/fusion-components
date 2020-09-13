import { fusionElement } from '../../base';
import Element from './element';

export const OverlayScrimElementTag = 'fusion-overlay-scrim';

@fusionElement(OverlayScrimElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [OverlayScrimElementTag]: _element
    }
}

export * from './element';