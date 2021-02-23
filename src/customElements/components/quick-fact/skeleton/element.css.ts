import { css } from '../../base';

/**
 * @TODO variables
 */
const style = css`
    .skeleton {
        display: block;
        width: 80%;
        height: 1em;
        background-image: linear-gradient(
            90deg,
            var(--color-black-alt4),
            var(--color-black-alt5),
            var(--color-black-alt4)
        );
        background-position: 0% 0%;
        background-size: 200% 1em;
        animation: skeleton-slide 2s infinite forwards linear;
        border-radius: 4px;
        margin: 0.2em 0;
    }

    h2 .skeleton {
        width: 60%;
        background-image: linear-gradient(
            90deg,
            var(--color-black-alt3),
            var(--color-black-alt4),
            var(--color-black-alt3)
        );
    }
    @keyframes skeleton-slide {
        from {
            background-position: 0% 0%;
        }
        to {
            background-position: -200% 0%;
        }
    }
`;

export default [style];
