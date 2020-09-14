import { css } from '../../../base';
import { buttonStyle, toolbarHeaderStyle, iconButtonStyle, bodyStyle } from '../../styles';

export const style = css`
    .skeleton {
        display: block;
        width: 80%;
        height: calc(var(--grid-unit) * 2);
        background-image: linear-gradient(
            90deg,
            var(--color-black-alt4),
            var(--color-black-alt5),
            var(--color-black-alt4)
        );
        background-size: 200% calc(var(--grid-unit) * 2);
        animation: skeleton-slide 2s infinite forwards linear;
        border-radius: var(--border-radius);
    }

    h2 .skeleton {
        width: 60%;
        height: calc(var(--grid-unit) * 3);
        background-image: linear-gradient(
            90deg,
            var(--color-black-alt3),
            var(--color-black-alt4),
            var(--color-black-alt3)
        );
    }

    .create-button {
        width: 100%;
        box-sizing: border-box;
        margin-top: calc(var(--grid-unit) * 3);
    }

    .date {
        width: 100%;
        text-align: center;
        margin-bottom: calc(var(--grid-unit) * 4);
        color: var(--color-contrast);
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .person-photo {
        width: calc(var(--grid-unit) * 4);
        height: calc(var(--grid-unit) * 4);
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        margin-left: calc(var(--grid-unit) * 2);
    }

    .person-photo img {
        max-width: 100%;
    }

    @keyframes skeleton-slide {
        0% {
            background-position: 0% 0%;
        }

        50% {
            background-position: -100% 0%;
        }

        100% {
            background-position: -200% 0%;
        }
    }
`;

export const styles =[
    buttonStyle,
    iconButtonStyle,
    toolbarHeaderStyle,
    bodyStyle,
    style,
];

export default styles;