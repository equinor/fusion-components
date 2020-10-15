import { css } from '../base';

export const style = css`
    #overlay {
        position: var(--overlay-position, absolute);
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        will-change: opacity;
        z-index: 99;
    }

    #overlay.active {
        opacity: 1;
        pointer-events: all;
    }

    #overlay.fixed {
        position: fixed;
    }
`;

export default [style];