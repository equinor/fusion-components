import { css } from '../../base';
// import { cssVariables, buttonStyle, toolbarHeaderStyle } from '../../styles';

/**
 * @TODO variables
 */
export const style = css`
    #toolbar {
        display: grid;
        grid-gap: 0.5rem;
        grid-auto-flow: column;
        justify-content: flex-end;
    }

    input {
        background: var(--color-black-alt4);
        padding: 0.5rem;
        border: none;
        border-bottom: 1px solid var(--color-black-alt3);
        border-radius: var(--border-radius, 4px) var(--border-radius, 4px) 0 0;
        margin-bottom: calc(var(--grid-unit, 8px) * 2);
        color: var(--color-primary);
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: var(--color-contrast, #0084c4);
    }

    label {
        font-size: 12px;
        line-height: 16px;
        color: #6f6f6f;
    }
`;

export default [style];
