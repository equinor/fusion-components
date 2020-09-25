import { css } from "../../base";

export const style = css`
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 99999999999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        will-change: opacity;
    }

    #overlay.active {
        opacity: 1;
        pointer-events: all;
    }
`;

export default style;