import { css } from '../../../base';

const skeleton = (size: number) => css`
    .skeleton {
        background-image: linear-gradient(90deg, var(--color-black-alt4), var(--color-black-alt5), var(--color-black-alt4));
        background-size: 200% calc(var(--grid-unit) * ${size}px);
        animation: skeleton-slide 2s infinite forwards linear;
    }
    @keyframes skeleton-slide {
        0% { background-position: 0% 0%; }
        50% { background-position: -100% 0%; }
        100% { background-position: -200% 0%; }
    }
`;

export const style = css`
    ${skeleton(2)}
    .skeleton {
        height: 100%;
        width: 100%;
    }
`;

export default style;