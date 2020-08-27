import { fusionElement, LitElement, property, html } from '../../base';

import { iconOpen } from './open.svg';
import { iconClose } from './close.svg';

import styles from './element.css';

@fusionElement('fusion-app-guide-fab')
export class AppGuideFAB extends LitElement {
    static styles = styles;
    
    @property({ type: Boolean })
    activated: boolean;


    render() {
        return html`<button class="fab ${this.activated ? 'active' : ''}">
            ${this.activated ? iconClose : iconOpen}
        </button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-fab': AppGuideFAB;
    }
}

export default AppGuideFAB;
