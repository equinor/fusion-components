import styles from './element.css';
import { LitElement, html, property, query } from '../base';

export type ButtonSize = 'small' | 'medium' | 'large';

export class ButtonElement extends LitElement {
    static styles = styles;

    @property({ type: Boolean, reflect: true })
    disabled?: boolean;

    @property({ type: Boolean, reflect: true })
    raised?: boolean;

    @property({ type: Boolean, reflect: true })
    type?: boolean;

    @property({ type: String, reflect: true })
    size?: ButtonSize;

    @property({type: Boolean, reflect: true}) 
    outlined?: boolean;

    @property({type: Boolean, reflect: true}) 
    fullwidth?: boolean;

    @query('#button')
    buttonElement!: HTMLElement;

    focus() {
        const { buttonElement } = this;
        buttonElement && buttonElement.focus();
    }

    blur() {
        const { buttonElement } = this;
        buttonElement && buttonElement.blur();
    }

    protected createRenderRoot() {
        return this.attachShadow({ mode: 'open', delegatesFocus: true });
    }

    protected render() {
        return html`
            <button id="button" ?disabled="${this.disabled}">
                <span class="leading-icon">
                    <slot name="icon"></slot>
                </span>
                <span class="label">
                    <slot></slot>
                </span>
            </button>
        `;
    }
}

export default ButtonElement;