import { LitElement, customElement, property, html, css } from 'lit-element';
import { ApplicationGuidanceQuickFact, QuickFactEvent } from '../types';
import { ChangeEvent } from 'react';
import ApplicationGuidanceApi from '../api';
import '../Editor';
import { buttonStyle, cssVariables, toolbarHeaderStyle } from '../styles';

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
            toolbarHeaderStyle,
            css`
                .form {
                    padding: calc(var(--grid-unit) * 2);
                }

                input {
                    background: var(--color-black-alt4);
                    padding: var(--grid-unit);
                    border: none;
                    border-bottom: 1px solid var(--color-black-alt3);
                    border-radius: var(--border-radius) var(--border-radius) 0 0;
                    margin-bottom: calc(var(--grid-unit) * 2);
                    color: var(--color-primary);
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box;
                }

                input:focus {
                    outline: none;
                    border-color: var(--color-contrast);
                }

                label {
                    font-size: 12px;
                    line-height: 16px;
                    color: #6f6f6f;
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
            <div class="toolbar-header">
                <button
                    class="button border"
                    ?disabled="${this.isSaving}"
                    @click="${this.handleCancel}"
                >
                    Cancel
                </button>
                <button class="button" ?disabled="${!this.canSave()}" @click="${this.handleSave}">
                    ${this.isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        `;
    }

    render() {
        const quickFact = this.editQuickFact || this.quickFact;

        const actions = this.renderActions();

        return html`
            ${actions}
            <div class="form" @keydown="${(e) => e.stopPropagation()}">
                <label>Title</label>
                <input
                    placeholder="Title"
                    .value="${quickFact?.title || ''}"
                    @keyup="${this.handleTitleChange}"
                />
                <div>
                    <label>Description</label>
                    <app-guide-editor
                        value="${quickFact?.bodyMarkdown || ''}"
                        @change="${this.handleBodyChange}"
                    ></app-guide-editor>
                    <label>Please write in English</label>
                </div>
            </div>
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
