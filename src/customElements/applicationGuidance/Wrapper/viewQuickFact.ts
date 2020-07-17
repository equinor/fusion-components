import { LitElement, customElement, property, html, css } from 'lit-element';
import { formatDateTime, IFusionContext } from '@equinor/fusion';
import { ApplicationGuidanceQuickFact } from '../types';
import * as marked from 'marked';
import { buttonStyle, bodyStyle, iconButtonStyle, toolbarHeaderStyle } from '../styles';
import { formatDistance } from 'date-fns';

@customElement('app-guide-view-quick-fact')
export default class ApplicationGuidanceViewQuickFact extends LitElement {
    @property({ type: Object })
    quickFact: ApplicationGuidanceQuickFact;

    @property({ type: Boolean, attribute: 'is-fetching-active-quick-fact' })
    isFetchingActiveQuickFact: boolean;

    static get styles() {
        return [
            buttonStyle,
            iconButtonStyle,
            toolbarHeaderStyle,
            bodyStyle,
            css`
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
            `,
        ];
    }

    private handleEditClick = () => {
        this.dispatchEvent(new CustomEvent('edit'));
    };

    private renderToolbar(disabled = false) {
        return html`
            <div class="toolbar-header">
                <div class="spacer"></div>
                <button
                    class="icon-button"
                    title="Edit this Quickfact"
                    ?disabled="${disabled}"
                    @click="${this.handleEditClick}"
                >
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.3006 3.58789C18.0506 3.58789 17.7906 3.68789 17.6006 3.87789L15.7706 5.70789L19.5206 9.45789L21.3506 7.62789C21.7406 7.23789 21.7406 6.60789 21.3506 6.21789L19.0106 3.87789C18.8106 3.67789 18.5606 3.58789 18.3006 3.58789ZM14.7006 9.60789L15.6206 10.5279L6.56063 19.5879H5.64062V18.6679L14.7006 9.60789ZM3.64062 17.8379L14.7006 6.77789L18.4506 10.5279L7.39062 21.5879H3.64062V17.8379Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        `;
    }

    private renderSkeletons() {
        return html`
            ${this.renderToolbar(true)}
            <div class="quick-fact">
                <h2><span class="skeleton"></span></h2>
                <p>
                    <span class="skeleton"></span><br />
                    <span class="skeleton"></span>
                </p>
                <p>
                    <span class="skeleton"></span><br />
                    <span class="skeleton"></span>
                </p>
            </div>
        `;
    }

    private renderNoQuickFactMessage() {
        return html`
            <div class="quick-fact">
                <h2>There's no quick fact for this element.</h2>
                <button class="button create-button" @click="${this.handleEditClick}">
                    <svg
                        class="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 13H17V11H13V7H11V11H7V13H11V17H13V13Z"
                            fill="currentColor"
                        />
                    </svg>

                    Create new
                </button>
                <p>Anyone can create and edit Quickfacts</p>
            </div>
        `;
    }

    render() {
        if (this.isFetchingActiveQuickFact && !this.quickFact) {
            return this.renderSkeletons();
        }

        if (!this.quickFact) {
            return this.renderNoQuickFactMessage();
        }

        const body = ([marked(this.quickFact.bodyMarkdown)] as unknown) as TemplateStringsArray;

        const fusionContext = window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;
        const fusionUrl = fusionContext.http.serviceResolver.getFusionBaseUrl();

        return html`
            ${this.renderToolbar()}
            <div class="quick-fact">
                <h2>${this.quickFact.title}</h2>
                ${html(body)}
            </div>
            <div class="date" title="${formatDateTime(this.quickFact.created)}">
                <span>Last updated ${formatDistance(this.quickFact.created, new Date())} ago by</span>
                <span class="person-photo" title="${this.quickFact.createdBy.name}">
                    <img src="${fusionUrl}/images/profiles/${this.quickFact.createdBy.azureUniqueId}" />
                    ${/* @TODO: Use the person-photo element when ready */''}
                </span>
            </div>
        `;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-guide-view-quick-fact': any;
        }
    }
}
