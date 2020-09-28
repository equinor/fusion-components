import { fusionElement } from '../base';
import Element from './element';

export const ButtonElementTag = 'fusion-button';

@fusionElement(ButtonElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [ButtonElementTag]: _element
    }
}

export * from './element';