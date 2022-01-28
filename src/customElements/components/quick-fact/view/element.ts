import { fusionElement, LitElement, property, html, svg } from '../../base';
import { formatDateTime } from '@equinor/fusion';
import { marked } from 'marked';
import { formatDistance } from 'date-fns';

import styles from './element.css';

/** @TODO - fix export in api */
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

const elementName = 'fusion-quick-fact-view';

/**
 * element to display a quick fact
 */
@fusionElement(elementName)
export class QuickFactViewElement extends LitElement {
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

    render() {
        if (!this.quickFact) {
            return '';
        }

        const body = [marked.parse(this.quickFact.bodyMarkdown)] as unknown as TemplateStringsArray;

        // @TODO this should not be here
        // const fusionContext = window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;
        // const fusionUrl = fusionContext.http.serviceResolver.getFusionBaseUrl();

        const modified = this.quickFact.updated || this.quickFact.created;
        const publisher = this.quickFact.updatedBy || this.quickFact.createdBy;

        return html`
            <header>
                <h2>${this.quickFact.title}</h2>
                <div id="toolbar">
                    <slot name="toolbar"></slot>
                </div>
            </header>
            <section>${html(body)}</section>
            <footer title="${formatDateTime(modified)}">
                <span
                    >Last updated ${formatDistance(modified, new Date())} ago by
                    <span class="publisher-name">${publisher.name}</span>
                </span>
            </footer>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: QuickFactViewElement;
    }
}

export default QuickFactViewElement;
