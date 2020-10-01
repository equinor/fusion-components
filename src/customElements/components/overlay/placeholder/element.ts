import { LitElement, property, html, directives } from '../../base';
import { AnchorRect } from '../anchor/anchor-rect';

import styles from './element.css';

/**
 * element to render a placeholder for an anchor
 */
export class OverlayPlaceholderElement extends LitElement {
    static styles = styles;

    @property({ type: Object })
    rect: AnchorRect;

    @property({ type: Boolean, reflect: true })
    active?: boolean;

    render() {
        const { active, rect } = this;
        const classes = directives.classMap({ active });
        const style = directives.styleMap({
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
        });
        return html`
            <div id="container" class="${classes}" style="${style}"></div>
        `;
    }
}

export default OverlayPlaceholderElement;
