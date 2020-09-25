import { fusionElement } from '../base';
import Element from './element';

/** required elements */
import '../button';
import '../overlay';
import '../quick-fact';

export const ApplicationGuideElementTag = 'fusion-application-guide';

@fusionElement(ApplicationGuideElementTag)
export default class _element extends Element { }
declare global {
    interface HTMLElementTagNameMap {
        [ApplicationGuideElementTag]: _element
    }
}

export * from './element';
export * from './events';