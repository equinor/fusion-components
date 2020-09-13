import { css } from '../base';

/**
 * @todo css attr
 */
export const style = css`

    :host{
        box-shadow: var(--btn-box-shadow);
        border-radius: var(--btn-border-radius, 4px);
        color: var(--btn-color);
        cursor: pointer;
        overflow: hidden;
        padding: var(--btn-padding, 0.5rem 1rem);
        display: inline-block;
        position: relative;
        border: 1px solid transparent;
    }

    :host:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        background: var(--btn-background);
        left: 0;
        top:0;
        transition: opacity .2s ease;
    }

    :host(:focus),
    :host(:active){
        outline: none;
    }

    :host([disabled]) {
        cursor: default;
        border-color: var(--btn-disabled, #ddd);
    }

    :host([disabled]):before {
        opacity: .25;
    }

    :host([outlined]) {
        color: var(--btn-background);
        border: 1px solid var(--btn-background);
    }

    :host([outlined]):before {
        opacity: 0;
    }

    :host([outlined]:hover):before {
        opacity: .2;
    }

    :host([fullwidth]) {
        display: block;
    }

    :host([raised]){
        will-change: box-shadow;
        --btn-box-shadow: 
            0px 1px 10px rgba(0, 0, 0, 0.2), 
            0px 4px 5px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.14);
    }

    :host([raised]:focus),
    :host([raised]:hover) {
        --btn-box-shadow: 
            0 0 4px rgba(0, 0, 0, 0.12), 
            0 0 16px rgba(0, 0, 0, 0.12),
            0 0 24px rgba(0, 0, 0, 0.12);
    }

    :host([round]) {
        border-radius: 50%;
        overflow: hidden;
        padding: var(--btn-padding, 0.25rem);
    }

    :host([size="large"]) {
        font-size: 32px;
    }

    button {
        position: relative;
        color: inherit;
        font-size: 1em;
        border: none;
        outline: none;
        background: none;
        padding: 0;
        margin: 0;
        cursor: inherit;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .label {
        flex: 1 1 auto;
    }
    ::slotted(svg){
        display: block;
        height: 1em;
        width: 1em;
    }
`;

export default style;