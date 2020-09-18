import { css } from '../../base';
import { cssVariables, buttonStyle } from '../styles';

export const style = css`
    .popover {
        position: fixed;
        right: calc(var(--grid-unit) * 4);
        padding: 0;
        background: var(--color-background);
        border-radius: var(--border-radius);
        border: 2px solid var(--color-primary);
        z-index: 99999999999999999999;
        width: calc(var(--grid-unit) * 38);
        opacity: 0;
        bottom: -100%;
        transition: all 0.2s;
        color: var(--color-primary);
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.14);
    }

    .popover.active {
        bottom: 88px;
        opacity: 1;
    }

    .header {
        padding: 0 calc(var(--grid-unit) * 1) calc(var(--grid-unit) * 1);
        margin: calc(var(--grid-unit) * -2) calc(var(--grid-unit) * -3)
            calc(var(--grid-unit) * 3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .content {
        padding: calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3)
            calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3);
    }

    .toolbar {
        background-color: var(--color-primary);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding: var(--grid-unit);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: calc(var(--grid-unit) * 2);
        height: calc(var(--grid-unit) * 4);
        color: white;
    }

    .toolbar button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
    }
`;

export const styles = [
    cssVariables,
    buttonStyle,
    style
];

export default styles;
