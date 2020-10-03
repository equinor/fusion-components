// import { cssVariables, bodyStyle } from '../../styles';
import { css } from '../../../base';

/**
 * @TODO css variables
 */

export const style = css`
    :host {
        --editor-color-background: var(--color-black-alt4);
        --editor-color-text: var(--color-primary);
    }

    #editor {
        padding: 0;
    }

    .ProseMirror {
        background: var(--editor-color-background);
        border-radius: var(--border-radius, 4px) var(--border-radius, 4px) 0 0;
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
        border-radius: var(--border-radius, 4px);
        color: var(--color-contrast);
        cursor: pointer;
    }

    #menu .button:hover {
        color: var(--color-primary);
    }

    #menu .button.active {
        display: none;
    }
`;

export default [
    // cssVariables,
    // bodyStyle,
    style
];