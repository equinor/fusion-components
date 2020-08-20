import { css } from '../../../base';
import { cssVariables } from '../../styles';

export const style = css`
    .anchor {
        position: fixed;
        border-radius: 6px;
        cursor: pointer;
        transition: box-shadow 0.2s, border-color 0.2s;
        border: 2px solid var(--color-primary);
        margin: -2px 0 0 -2px;
    }

    .anchor.active {
        border-color: var(--color-highlight);
    }
`;
export const styles = [
    cssVariables,
    style
];

export default styles;