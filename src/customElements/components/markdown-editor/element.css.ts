import { css, unsafeCSS } from '../base';
import { theme } from '@equinor/fusion-react-styles';

export const style = css`
    :host {
        --editor-color-text: ${unsafeCSS(
            theme.colors.text.static_icons__tertiary.getVariable('color')
        )};
        --editor-border-color: ${unsafeCSS(
            theme.colors.ui.background__medium.getVariable('color')
        )};
        --editor-border-color-active: ${unsafeCSS(
            theme.colors.interactive.primary__resting.getVariable('color')
        )};
        --editor-button-disabled-color: ${unsafeCSS(
            theme.colors.interactive.disabled__text.getVariable('color')
        )};
        --editor-button-hover-color: ${unsafeCSS(
            theme.colors.interactive.primary__hover.getVariable('color')
        )};
        --editor-button-hover-background: ${unsafeCSS(
            theme.colors.interactive.primary__selected_hover.getVariable('color')
        )};
        --editor-button-active-color: ${unsafeCSS(
            theme.colors.text.static_icons__default.getVariable('color')
        )};
        --editor-button-active-background: ${unsafeCSS(
            theme.colors.interactive.primary__selected_highlight.getVariable('color')
        )};
        cursor: auto;
    }

    .container {
        height: 100%;
        border: 1px solid var(--editor-border-color);
        border-radius: 4px;
        padding: 8px;
    }

    #editor {
        padding: 0.5rem;
        height: calc(100% - 3rem);
    }

    #editor p {
        font-size: 16px;
        margin: 0.5rem 0;
    }

    #editor p:last-child {
        margin-bottom: 0;
    }

    #editor p:first-child {
        margin-top: 0;
    }

    .ProseMirror {
        color: var(--editor-color-text);
        padding: 0.5rem;
        white-space: pre-wrap;
        height: 100%;
        overflow: auto;
    }

    .ProseMirror > *:first-child {
        margin-top: 0;
    }

    .ProseMirror-focused {
        outline: none;
        border-color: var(--color-contrast);
    }

    #menu {
        display: flex;
        background: none;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--editor-border-color);
        color: var(--editor-color-text);
    }

    #menu .button {
        background: none;
        border: none;
        color: var(--color-contrast);
        cursor: pointer;
        font-family: Equinor, sans-serif;
    }

    #menu .button:hover {
        color: var(--editor-button-hover-color);
        background: var(--editor-button-hover-background);
    }

    #menu .button.disabled {
        color: var(--editor-button-disabled-color);
        cursor: not-allowed;
    }

    #menu .button.active {
        color: var(--editor-button-active-color);
        background: var(--editor-button-active-background);
    }

    #menu .button.heading {
        font-size: 18px;
        font-weight: 600;
    }

    #menu .button.paragraph {
        font-weight: 600;
    }
`;

export default [style];
