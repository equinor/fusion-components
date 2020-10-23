import { fusionElement } from '../base';
import Element from './element';

export const OverlayElementTag = 'fusion-overlay';

@fusionElement(OverlayElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [OverlayElementTag]: _element
    }
}

export * from './anchor';
export * from './element';
export * from './events';