import { css } from '../../../base';
import { cssVariables, buttonStyle, toolbarHeaderStyle } from '../../styles';

export const style = css`
    .form {
        padding: calc(var(--grid-unit) * 2);
    }

    input {
        background: var(--color-black-alt4);
        padding: var(--grid-unit);
        border: none;
        border-bottom: 1px solid var(--color-black-alt3);
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        margin-bottom: calc(var(--grid-unit) * 2);
        color: var(--color-primary);
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: var(--color-contrast);
    }

    label {
        font-size: 12px;
        line-height: 16px;
        color: #6f6f6f;
    }
`;

export const styles = [
    cssVariables,
    buttonStyle,
    toolbarHeaderStyle,
    style
];

export default styles;