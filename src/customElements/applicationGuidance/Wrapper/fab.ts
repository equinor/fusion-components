import { LitElement, customElement, property, css, html } from 'lit-element';

const openIcon = html`<svg
    width="14"
    height="25"
    viewBox="0 0 14 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M4.6875 17.3125C4.6875 15.9271 4.85938 14.8229 5.20312 14C5.54688 13.1771 6.22396 12.276 7.23438 11.2969C8.25521 10.3073 8.90104 9.60417 9.17188 9.1875C9.58854 8.55208 9.79688 7.86458 9.79688 7.125C9.79688 6.14583 9.55208 5.40104 9.0625 4.89062C8.58333 4.36979 7.875 4.10938 6.9375 4.10938C6.04167 4.10938 5.31771 4.36458 4.76562 4.875C4.22396 5.375 3.95312 6.05729 3.95312 6.92188H0.15625C0.177083 5.07812 0.802083 3.61979 2.03125 2.54688C3.27083 1.47396 4.90625 0.9375 6.9375 0.9375C9.03125 0.9375 10.6615 1.46875 11.8281 2.53125C13.0052 3.59375 13.5938 5.07812 13.5938 6.98438C13.5938 8.68229 12.8021 10.3542 11.2188 12L9.29688 13.8906C8.60938 14.6719 8.25521 15.8125 8.23438 17.3125H4.6875ZM4.42188 22.1719C4.42188 21.5573 4.61458 21.0625 5 20.6875C5.38542 20.3021 5.90625 20.1094 6.5625 20.1094C7.22917 20.1094 7.75521 20.3073 8.14062 20.7031C8.52604 21.0885 8.71875 21.5781 8.71875 22.1719C8.71875 22.7448 8.53125 23.224 8.15625 23.6094C7.78125 23.9948 7.25 24.1875 6.5625 24.1875C5.875 24.1875 5.34375 23.9948 4.96875 23.6094C4.60417 23.224 4.42188 22.7448 4.42188 22.1719Z"
        fill="#D5EAF4"
    />
</svg> `;

const closeIcon = html`<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="#D5EAF4"
    />
</svg> `;

@customElement('app-guide-fab')
export default class ApplicationGuidanceFAB extends LitElement {
    @property({ type: Boolean, attribute: 'active' })
    isActive: boolean;

    static get styles() {
        return css`
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
    }

    render() {
        return html` <button class="fab ${this.isActive ? 'active' : ''}">
            ${this.isActive ? closeIcon : openIcon}
        </button>`;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-guide-fab': any;
        }
    }
}