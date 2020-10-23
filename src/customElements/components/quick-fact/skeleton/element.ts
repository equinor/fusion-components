import { LitElement, html } from "../../base";

import styles from './element.css';

function random(min: number, max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export class QuickFactSkeleton extends LitElement {
    static styles = styles;

    render() {
        return html`
            <h2><span class="skeleton" style="width: ${random(40, 40) }%"></span></h2>
            <p>
                <span class="skeleton" style="width: ${random(20, 80) }%"></span>
                <span class="skeleton" style="width: ${random(20, 80) }%"></span>
            </p>
            <p>
                <span class="skeleton" style="width: ${random(20, 80) }%"></span>
                <span class="skeleton" style="width: ${random(20, 80) }%"></span>
            </p>
        `;
    }
}

export default QuickFactSkeleton;