import { LitElement, customElement, property, html, css } from 'lit-element';
import { ApplicationGuidanceQuickFact, QuickFactEvent } from '../types';
import { ChangeEvent } from 'react';
import ApplicationGuidanceApi from '../api';
import '../Editor';
import { buttonStyle, cssVariables, actionsStyle } from '../styles';

@customElement('app-guide-edit-quick-fact')
export default class ApplicationGuidanceEditQuickFact extends LitElement {
    @property({ type: Object })
    quickFact: ApplicationGuidanceQuickFact;

    @property({ type: Object, attribute: false })
    editQuickFact: ApplicationGuidanceQuickFact | null;

    @property({ type: Boolean })
    isSaving: boolean = false;

    @property({ type: String })
    scope: string;

    @property({ type: Object })
    api: ApplicationGuidanceApi;

    static get styles() {
        return [
            cssVariables,
            buttonStyle,
            actionsStyle,
            css`
                input {
                    background: none;
                    padding: var(--grid-unit);
                    border: 1px dashed var(--color-border);
                    border-radius: var(--border-radius);
                    margin-bottom: calc(var(--grid-unit) * 2);
                    color: var(--color-contrast);
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box;
                }

                input:focus {
                    outline: none;
                }
            `,
        ];
    }

    firstUpdated() {
        if (!this.quickFact.title) {
            this.shadowRoot.querySelector('input')?.focus();
        }
    }

    private handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const quickFact = this.editQuickFact || this.quickFact;
        this.editQuickFact = {
            ...quickFact,
            title: e.target.value,
        };
    };

    private handleBodyChange = (e: CustomEvent) => {
        const quickFact = this.editQuickFact || this.quickFact;
        this.editQuickFact = {
            ...quickFact,
            bodyMarkdown: e.detail as string,
        };
    };

    private handleSave = async () => {
        if (!this.editQuickFact) {
            return;
        }

        this.isSaving = true;

        try {
            const updatedQuickFact = await this.api.updateQuickFactAsync(
                this.scope,
                this.editQuickFact
            );
            const event = new QuickFactEvent('quick-fact-updated', updatedQuickFact);
            this.dispatchEvent(event);
        } catch (e) {
            console.error(e);
        } finally {
            this.isSaving = false;
        }
    };

    private handleCancel = () => {
        const event = new CustomEvent('cancel');
        this.dispatchEvent(event);
    };

    private canSave = () => {
        return (
            !this.isSaving &&
            this.editQuickFact?.title &&
            this.editQuickFact?.bodyMarkdown &&
            (this.editQuickFact?.title !== this.quickFact.title ||
                this.editQuickFact?.bodyMarkdown !== this.quickFact.bodyMarkdown)
        );
    };

    renderActions() {
        return html`
            <div class="actions">
                <button class="button" ?disabled="${!this.canSave()}" @click="${this.handleSave}">
                    ${this.isSaving ? 'Saving...' : 'Save'}</button
                ><button class="button borderless" ?disabled="${this.isSaving}" @click="${this.handleCancel}">Cancel</button>
            </div>
        `;
    }

    render() {
        const quickFact = this.editQuickFact || this.quickFact;

        const actions = this.renderActions();

        return html`
            <div class="form" @keydown="${(e) => e.stopPropagation()}">
                <input
                    placeholder="Title"
                    .value="${quickFact?.title || ''}"
                    @keyup="${this.handleTitleChange}"
                />
                <div>
                    <app-guide-editor
                        value="${quickFact?.bodyMarkdown || ''}"
                        @change="${this.handleBodyChange}"
                    ></app-guide-editor>
                </div>
            </div>
            ${actions}
        `;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-guide-edit-quick-fact': any;
        }
    }
}
