import { fusionElement, LitElement, property, html } from '../../../base';

import ApplicationGuidanceApi from '../../api';

import '../editor';

import { ApplicationGuidanceQuickFact, QuickFactEvent } from '../../types';

import styles from './element.css';

export interface AppGuideQuickFactViewElementProps {
    scope: string;
    quickFact: ApplicationGuidanceQuickFact;
    api: ApplicationGuidanceApi;
};

@fusionElement('fusion-app-guide-quick-fact-edit')
export class AppGuideQuickFactViewElement extends LitElement implements AppGuideQuickFactViewElementProps {
    static styles = styles;

    @property({ type: String })
    scope: string;

    @property({ type: Object, attribute: false })
    quickFact: ApplicationGuidanceQuickFact;
    
    @property({ type: Object, attribute: false })
    api: ApplicationGuidanceApi;

    @property({ type: Object, attribute: false })
    protected editQuickFact: ApplicationGuidanceQuickFact | null;

    @property({ type: Boolean, attribute: false })
    private isSaving: boolean = false;

    firstUpdated() {
        if (!this.quickFact.title) {
            this.shadowRoot.querySelector('input')?.focus();
        }
    }

    private handleTitleChange = (e: InputEvent) => {
        const quickFact = this.editQuickFact || this.quickFact;
        const input = e.target as HTMLInputElement;
        this.editQuickFact = {
            ...quickFact,
            title: input.value,
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
                    <fusion-app-guide-editor
                        value="${quickFact?.bodyMarkdown || ''}"
                        @change="${this.handleBodyChange}"
                    ></fusion-app-guide-editor>
                    <label>Please write in English</label>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-quick-fact-edit': AppGuideQuickFactViewElement;
    }
}

export default AppGuideQuickFactViewElement
