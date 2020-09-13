import { fusionElement } from '../../base';
import Element from './element';

import './editor';

const QuickFactEditElementTag = 'fusion-quick-fact-edit';

@fusionElement(QuickFactEditElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [QuickFactEditElementTag]: _element
    }
}

export * from './element';
