import { css, unsafeCSS } from 'lit-element';

export const cssVariables = css`
    :host {
        --grid-unit: 8px;
        --border-radius: 4px;
        --color-primary: #243746;
        --color-contrast: #0084c4;
        --color-highlight: #52c0ff;
        --color-text: #243746;
        --color-border: #ffffff;
        --color-background: #ffffff;
    }
`;

export const buttonStyle = css`
    ${unsafeCSS(cssVariables)}

    .button {
        border: none;
        position: relative;
        color: white;
        background: var(--color-contrast);
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(var(--grid-unit) * 5);
        padding: 0 calc(var(--grid-unit) * 2);
        margin-right: var(--grid-unit);
    }

    .button.border {
        background: none;
        border: 1px solid var(--color-contrast);
        color: var(--color-contrast);
        height: calc((var(--grid-unit) * 5) - 2px);
    }

    .button:not([disabled]):hover,
    .button:not([disabled]).active {
        background: var(--color-text);
    }

    .button:last-child {
        margin-right: 0;
    }

    .button[disabled],
    .button[disabled]:hover {
        opacity: 0.75;
        border-color: transparent;
        cursor: not-allowed;
        color: #999999;
        background: #e2e2e2;
    }

    .button.border:hover {
        background: rgba(0, 132, 196, 0.20);
        border: 1px solid var(--color-contrast);
        color: var(--color-contrast);
    }

    .button.small {
        font-size: 12px;
        padding: 0 var(--grid-unit);
        height: calc(var(--grid-unit) * 3);
    }

    .button .icon {
        position: absolute;
        left: calc(var(--grid-unit) * 3);
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const iconButtonStyle = css`
    .icon-button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-contrast);
        cursor: pointer;
        border-radius: var(--border-radius);
        min-width: calc(var(--grid-unit) * 4);
        height: calc(var(--grid-unit) * 4);
    }

    .icon-button:hover {
        background: var(--color-primary);
        color: white;
    }

    .icon-button[disabled] {
        color: #999999;
    }
`;

export const toolbarHeaderStyle = css`
    .toolbar-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        padding: calc(var(--grid-unit) * 1);
        padding-bottom: 0;
    }

    .toolbar-header .spacer {
        height: 100%;
        flex-grow: 2;
    }
`;

export const bodyStyle = css`
    ${unsafeCSS(cssVariables)}

    .quick-fact {
        padding: calc(var(--grid-unit) * 3);
        padding-top: calc(var(--grid-unit) * 2);
    }

    .quick-fact h2 {
        margin-top: 0;
        font-size: 18px;
        font-weight: 500;
    }

    .quick-fact p {
        font-size: 16px;
        margin: var(--grid-unit) 0;
    }

    .quick-fact p:last-child {
        margin-bottom: 0;
    }

    .quick-fact p:first-child {
        margin-top: 0;
    }

    .quick-fact blockquote {
        border-left: 2px solid var(--color-contrast);
        margin: var(--grid-unit) var(--grid-unit) var(--grid-unit) calc(var(--grid-unit) * 2);
        padding: var(--grid-unit);
        background: rgba(255, 255, 255, 0.2);
    }
`;
