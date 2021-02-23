import Element from './element';
import { fusionElement } from '../base';

import './view';
import './edit';
import './skeleton';

const QuickFactElementTag = 'fusion-quick-fact';

@fusionElement(QuickFactElementTag)
export default class _element extends Element {}

declare global {
    interface HTMLElementTagNameMap {
        [QuickFactElementTag]: _element;
    }
}

export * from './element';
export * from './events';
