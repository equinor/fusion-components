import { fusionElement, LitElement, property, html, svg } from '../../../base';
import { formatDateTime, IFusionContext } from '@equinor/fusion';
import * as marked from 'marked';
import { formatDistance } from 'date-fns';

import styles from './element.css';
import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';

// @TODO move to fusion-icon service
const iconEdit = svg`<svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.3006 3.58789C18.0506 3.58789 17.7906 3.68789 17.6006 3.87789L15.7706 5.70789L19.5206 9.45789L21.3506 7.62789C21.7406 7.23789 21.7406 6.60789 21.3506 6.21789L19.0106 3.87789C18.8106 3.67789 18.5606 3.58789 18.3006 3.58789ZM14.7006 9.60789L15.6206 10.5279L6.56063 19.5879H5.64062V18.6679L14.7006 9.60789ZM3.64062 17.8379L14.7006 6.77789L18.4506 10.5279L7.39062 21.5879H3.64062V17.8379Z"
        fill="currentColor"
    />
</svg>`;

// @TODO move to fusion-icon service
const iconCreate = svg`<svg
    class="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 13H17V11H13V7H11V11H7V13H11V17H13V13Z"
        fill="currentColor"
    />
</svg>`;

/**
 * element to display a quick fact
 */
@fusionElement('fusion-app-guide-quick-fact-view')
export class AppGuideViewQuickFactElement extends LitElement {
    static styles = styles;

    /**
     * quick fact to show
     */
    @property({ attribute: false })
    quickFact: QuickFact;

    /**
     * show skeleton when quick fact is loading
     */
    @property({ attribute: false })
    showSkeleton: boolean;


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
                >${iconEdit}</button>
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
                    ${iconCreate} Create new
                </button>
                <p>Anyone can create and edit Quickfacts</p>
            </div>
        `;
    }

    render() {
        if (this.showSkeleton && !this.quickFact) {
            return this.renderSkeletons();
        }

        if (!this.quickFact) {
            return this.renderNoQuickFactMessage();
        }

        const body = ([marked(this.quickFact.bodyMarkdown)] as unknown) as TemplateStringsArray;

        // @TODO this should not be here
        const fusionContext = window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;
        const fusionUrl = fusionContext.http.serviceResolver.getFusionBaseUrl();

        const modified = this.quickFact.updated || this.quickFact.created;
        const publisher = this.quickFact.updatedBy || this.quickFact.createdBy;

        return html`
            ${this.renderToolbar()}
            <div class="quick-fact">
                <h2>${this.quickFact.title}</h2>
                ${html(body)}
            </div>
            <div class="date" title="${formatDateTime(modified)}">
                <span>Last updated ${formatDistance(modified, new Date())} ago by</span>
                <span class="person-photo" title="${publisher.name}">
                    <img src="${fusionUrl}/images/profiles/${publisher.azureUniqueId}" />
                    ${/* @TODO: Use the person-photo element when ready */''}
                </span>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-quick-fact-view': AppGuideViewQuickFactElement;
    }
}

export default AppGuideViewQuickFactElement;


