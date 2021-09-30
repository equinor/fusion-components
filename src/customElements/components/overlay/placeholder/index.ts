import { fusionElement } from '../../base';
import Element from './element';

export const OverlayPlaceholderElementTag = 'fusion-overlay-placeholder';

@fusionElement(OverlayPlaceholderElementTag)
export default class _element extends Element {}
declare global {
    interface HTMLElementTagNameMap {
        [OverlayPlaceholderElementTag]: _element;
    }
}

export * from './element';
