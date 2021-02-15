import { LitElement, property, html, directives, queryAssignedNodes } from '../../base';

import { overlay } from './overlay.svg';

import styles from './element.css';
import { OverlayAnchor } from '../anchor';

export interface OverlayScrimElementProps {
    active?: boolean;
}

export class OverlayScrimElement extends LitElement implements OverlayScrimElementProps {
    static styles = styles;

    @property({ type: Boolean, reflect: true })
    active?: boolean;

    @property({ type: Array, attribute: false })
    anchors: OverlayAnchor[] = [];

    render() {
        const classes = directives.classMap({ active: this.active });
        const rects = this.anchors.map((el) => ({ id: el.anchor, rect: el.bounds() }));
        return html`
            <div id="overlay" class="${classes}">
                ${overlay(rects)}
                <slot name="placeholders"></slot>
                <slot></slot>
            </div>
        `;
    }
}

export default OverlayScrimElement;
