import { LitElement, property, html } from '../../base';

import styles from './element.css';
import { ApiClients } from '@equinor/fusion';
// @TODO @odinr
import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';

export interface QuickFactEditElementProps {
    quickFact?: Partial<QuickFact>;
};

/**
 * element to show editor for a quick fact
 */
export class QuickFactEditElement extends LitElement implements QuickFactEditElementProps {
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
    public saving?: boolean;

    @property({ attribute: false })
    api?: ApiClients['info'];

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
        try {
            this.saving = true;
            const { collectionPath, ...data } = this.editQuickFact;
            const res = await this.api.updateQuickFact(collectionPath, data as QuickFact);
            this.dispatchEvent(new CustomEvent('update', {
                detail: res.data
            }));
        } catch (err) {
            console.error(err);
        } finally {
            this.saving = false;
        }
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
            <div id="toolbar">
                <fusion-button ?disabled="${this.saving}" @click="${this.handleCancel}" outlined>
                    Cancel
                </fusion-button>
                <fusion-button class="button" ?disabled="${!this.canSave()}" @click="${this.handleSave}">
                    ${this.saving ? 'Saving...' : 'Save'}
                </fusion-button>
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
                    <fusion-markdown-editor
                        .value="${quickFact?.bodyMarkdown}"
                        @change="${this.handleBodyChange}"
                    ></fusion-markdown-editor>
                    <label>Please write in English</label>
                </div>
            </div>
        `;
    }
}

export default QuickFactEditElement
