import { css, unsafeCSS } from 'lit-element';

export const cssVariables = css`
    :host {
        --grid-unit: 8px;
        --border-radius: 4px;
        --color-primary: #243746;
        --color-contrast: #52c0ff;
        --color-text: #ffffff;
        --color-border: #ffffff;
    }
`;

export const buttonStyle = css`
    ${unsafeCSS(cssVariables)}

    .button {
        border: 1px solid var(--color-border);
        color: var(--color-contrast);
        background: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(var(--grid-unit) * 4);
        padding: 0 calc(var(--grid-unit) * 2);
        margin-right: var(--grid-unit);
    }

    .button:not([disabled]):hover,
    .button:not([disabled]).active {
        background: var(--color-text);
        color: var(--color-primary);
    }

    .button:last-child {
        margin-right: 0;
    }

    .button.borderless {
        border-color: transparent;
    }

    .button[disabled],
    .button[disabled]:hover {
        opacity: 0.75;
        border-color: transparent;
        cursor: default;
        color: var(--color-contrast);
        background: none;
    }

    .button.small {
        font-size: 12px;
        padding: 0 var(--grid-unit);
        height: calc(var(--grid-unit) * 3);
    }
`;

export const bodyStyle = css`
    ${unsafeCSS(cssVariables)}

    .quick-fact h2 {
        margin-top: 0;
        font-size: 16px;
        color: var(--color-contrast);
        font-weight: normal;
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

export const actionsStyle = css`
    ${unsafeCSS(cssVariables)}

    .actions {
        border-top: 1px solid rgba(255, 255, 255, .2);
        padding: var(--grid-unit);
        display: flex;
        justify-content: flex-end;
        margin: calc(var(--grid-unit) * 2) calc(var(--grid-unit) * -3) calc(var(--grid-unit) * -3);
    }
`;
