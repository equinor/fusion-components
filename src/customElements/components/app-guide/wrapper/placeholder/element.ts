import { LitElement, html, customElement, property, css } from 'lit-element';
import { ApplicationGuidanceAnchorRect, ApplicationGuidanceMessage } from '../../types';
import { cssVariables } from '../../styles';

import styles from './element.css';

@customElement('fusion-app-guide-placeholder')
export class AppGuidePlaceholderElement extends LitElement {
    static styles = styles;

    @property({ type: Object })
    rect: ApplicationGuidanceAnchorRect;

    @property({ type: Boolean, attribute: 'active' })
    isActive?: boolean;

    private handleClick = (e: MouseEvent) => {
        e.stopPropagation();

        const message: ApplicationGuidanceMessage = {
            type: 'application-guidance-anchor-activated',
            anchorId: this.id,
        };

        window.postMessage(message, window.location.origin);
    };

    render() {
        return html`
            <div
                @click=${this.handleClick}
                class="anchor ${this.isActive ? 'active' : ''}"
                style="width: ${this.rect.width}px; height: ${this.rect.height}px; top: ${this.rect
                    .top}px; left: ${this.rect.left}px; "
            ></div>
        `;
    }
}

export default AppGuidePlaceholderElement;

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-placeholder': AppGuidePlaceholderElement;
    }
}
