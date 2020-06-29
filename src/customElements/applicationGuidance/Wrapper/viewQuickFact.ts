import { LitElement, customElement, property, html, css } from 'lit-element';
import { ApplicationGuidanceQuickFact } from '../types';
import * as marked from 'marked';
import { buttonStyle, bodyStyle, actionsStyle } from '../styles';

@customElement('app-guide-view-quick-fact')
export default class ApplicationGuidanceViewQuickFact extends LitElement {
    @property({ type: Object })
    quickFact: ApplicationGuidanceQuickFact;

    static get styles() {
        return [buttonStyle, bodyStyle, actionsStyle];
    }

    private handleEditClick = () => {
        this.dispatchEvent(new CustomEvent('edit'));
    };

    render() {
        if (!this.quickFact) {
            return html`
                <div>
                    There's no quick fact for this element.
                    <div class="actions">
                        <button class="button create-button" @click="${this.handleEditClick}">
                            Create new
                        </button>
                    </div>
                </div>
            `;
        }

        const body = ([marked(this.quickFact.bodyMarkdown)] as unknown) as TemplateStringsArray;

        return html`
            <div class="quick-fact">
                <h2>${this.quickFact.title}</h2>
                ${html(body)}
                <div class="actions">
                    <button class="button" @click="${this.handleEditClick}">Edit</button>
                </div>
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
