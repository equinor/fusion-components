import { css } from '../../../base';

export const style = css`

    :host {
        display: inline-flex;
    }

    #container {
        overflow: hidden;
        width: var(--photo-size, 48);
        height: var(--photo-size, 48);
        border: var(--border-width, 2px) solid var(--border-color, transperant);
        border-radius: 50%;
    }

    #thumbnail, svg {
        height: 100%;
        width: 100%;
    }

    svg {
        object-fit:cover;
    }

    #thumbnail {
        background-position: center;
        background-size: cover;
    }
`;

export default style;