import { css } from '../../base';

export const style = css`
    #container {
        position: fixed;
        border-radius: 4px;
        cursor: pointer;
        transition: box-shadow 0.2s;
    }
    #container.active {
        box-shadow: 0 0 0 2px var(--overlay-placeholder-border-color, #52c0ff);
    }
`;

export default [style];
