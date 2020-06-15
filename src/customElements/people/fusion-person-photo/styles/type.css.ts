import { css } from '../../../base';

export const style = css`
    :host([type="consultant"]) {
        --border-color: var(--color-secondary);
    } 

    :host([type="employee"]) {
        --border-color: var(--color-purple);
    } 

    :host([type="externalhire"]) {
        --border-color: var(--color-primary-accent);
    } 

    :host([type="local"]) {
        --border-color: var(--color-black-alt3);
    }
`;

export default style;