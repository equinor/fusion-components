
import Element from './element';
import { fusionElement } from '../base';

import './view';
import './skeleton';

const QuickFactElementTag = 'fusion-quick-fact';

@fusionElement(QuickFactElementTag)
export default class _element extends Element{}

declare global {
    interface HTMLElementTagNameMap {
        [QuickFactElementTag]: _element;
    }
}


export * from './edit';
export * from './view';