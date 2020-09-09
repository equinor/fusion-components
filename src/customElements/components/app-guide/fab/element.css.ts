import { css } from '../../base';

export const style = css`
    .fab {
        position: fixed;
        bottom: 32px;
        right: 32px;
        border-radius: 50%;
        z-index: 99999999999999999;
        background: #243746;
        color: #0084c4;
        font-size: 32px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        border: none;
        cursor: pointer;
        outline: none;
        transition: all 0.2s;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.14);
    }

    .fab:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 0 16px rgba(0, 0, 0, 0.12),
            0 0 24px rgba(0, 0, 0, 0.12);
    }

    .active {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 0 16px rgba(0, 0, 0, 0.12),
            0 0 24px rgba(0, 0, 0, 0.12);
    }
`;

export default [style];
