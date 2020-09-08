import { fusionElement, LitElement, property, html } from '../../../base';

import '../editor';

import { QuickFact } from '../../types';

import styles from './element.css';

export interface AppGuideQuickFactViewElementProps {
    quickFact?: Partial<QuickFact>;
};

/**
 * element to show editor for a quick fact
 */
@fusionElement('fusion-app-guide-quick-fact-edit')
export class AppGuideQuickFactViewElement extends LitElement implements AppGuideQuickFactViewElementProps {
    static styles = styles;

    /**
     * quick fact
     */
    @property({ type: Object, attribute: false })
    public quickFact: Partial<QuickFact>;

    /**
     * modified quick fact
     */
    @property({ type: Object, attribute: false })
    protected editQuickFact: Partial<QuickFact> | null;

    /** @TODO make better */
    @property({ type: Boolean, attribute: false })
    public saving: boolean = false;

    /**
     * @override focus input on first render
     */
    firstUpdated() {
        if (!this.quickFact.title) {
            this.shadowRoot.querySelector('input')?.focus();
        }
    }

    /**
     * @override reset modified quick fact when source quick fact change
     */
    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('quickFact')) {
            this.editQuickFact = null;
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
        this.dispatchEvent(new CustomEvent('update', {
            detail: this.editQuickFact
        }));
    };

    private handleCancel = () => {
        const event = new CustomEvent('cancel');
        this.dispatchEvent(event);
    };

    private canSave = () => {
        return (
            !this.saving &&
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
                    ?disabled="${this.saving}"
                    @click="${this.handleCancel}"
                >
                    Cancel
                </button>
                <button class="button" ?disabled="${!this.canSave()}" @click="${this.handleSave}">
                    ${this.saving ? 'Saving...' : 'Save'}
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
