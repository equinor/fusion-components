import { css } from '../../../base';

export const style = css`

    :host {
        --border-color: transperant;
        --border-width: 2px;

        --photo-size-base: var(--grid-unit, 8px);
        --photo-size-multiplier: 5px;
        --photo-size-modifier: 0px;
        --photo-size: calc(var(--grid-unit, 48px) * (var(--photo-size-multiplier) + var(--photo-size-modifier)));
    }

    :host([size="xlarge"]) {
        --photo-size-multiplier: 7px;
        --border-width: 3px;
    }

    :host([size="large"]) {
        --photo-size-multiplier: 6px;
        --border-width: 3px;
    }

    :host([size="medium"]) {
        --photo-size-multiplier: 5px;
        --border-width: 2px;
    }

    :host([size="small"]) {
        --photo-size-multiplier: 4px;
        --border-width: 1px;
    }

    /** --- Compact mode */    
    :host([compact]) {
        --photo-size-modifier: -1px;
    }

    :host([compact="false"]) {
        --photo-size-modifier: 0px;
    }
`;

export default style;