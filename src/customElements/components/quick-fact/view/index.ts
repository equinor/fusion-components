import { fusionElement } from '../../base';
import Element from './element';

export const QuickFactViewElementTag = 'fusion-quick-fact-view';

@fusionElement(QuickFactViewElementTag)
export default class _element extends Element {}
declare global {
    interface HTMLElementTagNameMap {
        [QuickFactViewElementTag]: _element;
    }
}

export * from './element';
