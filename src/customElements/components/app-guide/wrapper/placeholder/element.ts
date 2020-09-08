import { fusionElement, LitElement, property, html, directives } from '../../../base';

import { ApplicationGuidanceAnchorRect } from '../../anchor';

import styles from './element.css';

/**
 * element to render a placeholder for an anchor
 */
@fusionElement('fusion-app-guide-placeholder')
export class AppGuidePlaceholderElement extends LitElement {
    static styles = styles;

    @property({ type: Object })
    rect: ApplicationGuidanceAnchorRect;

    @property({ type: Boolean, attribute: 'active' })
    active?: boolean;

    render() {
        const { active, rect } = this;
        const classes = directives.classMap({ active, anchor: true });
        const style = directives.styleMap({
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
        });
        return html`
            <div class="${classes}" style="${style}"></div>
        `;
    }
}

export default AppGuidePlaceholderElement;

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-placeholder': AppGuidePlaceholderElement;
    }
}
