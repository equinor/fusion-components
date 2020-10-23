import { fusionElement } from '../../base';
import Element from './element';

export const QuickFactSkeletonTag = 'fusion-quick-fact-skeleton';

@fusionElement(QuickFactSkeletonTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [QuickFactSkeletonTag]: _element
    }
}

export * from './element';