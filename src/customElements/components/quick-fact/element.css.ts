import { css } from '../base';
// import { cssVariables, buttonStyle } from '../styles';

export const style = css`
    :host {
        --btn-background: #0084c4;
        --btn-color: #fff;
        color: #243746;
        cursor: move;
    }

    slot[name='empty'] {
        margin-top: 0px;
        font-size: 18px;
        font-weight: 500;
    }

    #content {
        padding: 1rem 1.5rem;
    }

    #not-found header {
        font-size: 1.1rem;
    }

    #not-found fusion-button {
        margin: 1rem 0;
    }

    .header {
        padding: 0 calc(var(--grid-unit) * 1) calc(var(--grid-unit) * 1);
        margin: calc(var(--grid-unit) * -2) calc(var(--grid-unit) * -3) calc(var(--grid-unit) * 3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .content {
        padding: calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3)
            calc(var(--grid-unit) * 3);
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

    fusion-button > svg {
        font-size: 1.5rem;
    }
`;

export const styles = [
    // cssVariables,
    // buttonStyle,
    style,
];

export default styles;
