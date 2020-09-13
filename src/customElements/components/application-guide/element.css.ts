import { css } from '../base';

export const style = css`
    #fab {
        position: fixed;
        bottom: 32px;
        right: 32px;
        z-index: 99999999999999999;
        background: #243746;
        color: #0084c4;
    }

    #popover {
        position: fixed;
        right: 32px;
        padding: 0;
        background: var(--app-guide-popover-background, white);
        border-radius: var(--app-guide-popover-border-radius, 8px);
        border: 2px solid var(--color-primary);
        z-index: 99999999999999999999;
        width: 304px;
        opacity: 0;
        bottom: -100%;
        color: var(--color-primary);
        box-shadow: 
            0px 1px 10px rgba(0, 0, 0, 0.2), 
            0px 4px 5px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.14);
    }
    :host([active]) #popover {
        bottom: 88px;
        opacity: 1;
    }
`;

export default [style];