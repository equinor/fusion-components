import { LitElement, customElement, property, css, html } from 'lit-element';

import { iconOpen } from './open.svg';
import { iconClose } from './close.svg';

import styles from './element.css';

@customElement('fusion-app-guide-fab')
export class AppGuideFAB extends LitElement {
    @property({ type: Boolean })
    activated: boolean;

    static styles = styles;

    render() {
        return html`<button class="fab ${this.activated ? 'active' : ''}">
            ${this.activated ? iconClose : iconOpen}
        </button>`;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'fusion-app-guide-fab': AppGuideFAB;
        }
    }
}

export default AppGuideFAB;
