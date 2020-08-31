import { css } from '../base';

export const style = css`
    :host {
        --editor-color-background: var(--color-black-alt5);
        --editor-color-text: var(--color-primary);
        --editor-color-active: var(--color-primary-hover-alt1)
        --grid-unit: 8px;
        --border-radius: 4px;
    }

    #editor {
        padding: calc(var(--grid-unit) * 1px);
    }

    #editor p {
        font-size: 16px;
        margin: var(--grid-unit) 0;
    }

    #editor p:last-child {
        margin-bottom: 0;
    }

    #editor p:first-child {
        margin-top: 0;
    }

    .ProseMirror {
        background: var(--editor-color-background);
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        color: var(--editor-color-text);
        border-bottom: 1px solid var(--color-black-alt3);
        padding: var(--grid-unit);
    }

    .ProseMirror-focused {
        outline: none;
        border-color: var(--color-contrast);
    }

    #menu {
        display: flex;
        padding: calc(var(--grid-unit) * 0.5);
        background: none;
    }

    #menu .button {
        background: none;
        border: none;
        border-radius: var(--border-radius);
        color: var(--color-contrast);
        cursor: pointer;
        font-family: Equinor, sans-serif;
    }

    #menu .button:hover {
        color: var(--color-primary);
    }

    #menu .button.disabled {
        background: var(--editor-color-background);
        cursor: not-allowed;
    }

    #menu .button.active {
        color: var(--editor-color-text);
    }

    #menu .button.heading {
        font-size: 18px;
        font-weight: 600;
    }

    #menu .button.paragraph {
        font-weight: 600;
    }
`;

export default [
    style
];