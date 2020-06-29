import { LitElement, customElement, property, html, css } from 'lit-element';
import { ApplicationGuidanceQuickFact, QuickFactEvent } from '../types';
import './viewQuickFact';
import './editQuickFact';
import { buttonStyle, cssVariables } from '../styles';
import ApplicationGuidanceApi from '../api';

type ViewMode = 'view' | 'edit';

const createEmptyQuickFact = (id, scope: string): ApplicationGuidanceQuickFact => ({
    anchor: id,
    title: '',
    bodyMarkdown: '',
    contentUrl: '',
    created: new Date(),
    createdBy: { id: '' },
    path: '',
    slug: '',
    collectionPath: scope,
});

@customElement('app-guide-popover')
export default class ApplicationGuidancePopover extends LitElement {
    @property({ type: Boolean, attribute: 'active' })
    isActive: boolean;

    @property({ type: String, attribute: 'scope' })
    scope: string;

    @property({ type: String, attribute: 'active-anchor-id' })
    activeAnchorId: string | null;

    @property({ type: Array })
    quickFacts: ApplicationGuidanceQuickFact[] = [];

    @property({ type: String, attribute: false })
    viewMode: ViewMode = 'view';

    @property({ type: Object })
    api: ApplicationGuidanceApi;

    static get styles() {
        return [
            cssVariables,
            buttonStyle,
            css`
                .popover {
                    position: fixed;
                    right: calc(var(--grid-unit) * 4);
                    padding: calc(var(--grid-unit) * 3);
                    background: var(--color-primary);
                    border-radius: var(--border-radius);
                    z-index: 99999999999999999999;
                    width: 263px;
                    opacity: 0;
                    bottom: -100%;
                    transition: all 0.2s;
                    color: white;
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12),
                        0px 2px 4px rgba(0, 0, 0, 0.14);
                }

                .popover.active {
                    bottom: 88px;
                    opacity: 1;
                }

                .header {
                    padding: 0 calc(var(--grid-unit) * 1) calc(var(--grid-unit) * 1);
                    margin: calc(var(--grid-unit) * -2) calc(var(--grid-unit) * -3) calc(var(--grid-unit) * 3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
            `,
        ];
    }

    updated(changedProperties: Map<string, any>) {
        if (
            changedProperties.has('activeAnchorId') &&
            this.activeAnchorId !== changedProperties.get('activeAnchorId')
        ) {
            this.enterViewMode();
        }
    }

    private handleEditClick = () => {
        this.enterEditMode();
    };

    private handleEditCancel = () => {
        this.enterViewMode();
    };

    private handleQuickFactUpdated = (e: QuickFactEvent) => {
        const event = new QuickFactEvent('quick-fact-updated', e.detail.quickFact);
        this.dispatchEvent(event);
        this.enterViewMode();
    };

    private enterEditMode() {
        if (!this.activeAnchorId) {
            return;
        }

        this.viewMode = 'edit';
    }

    private enterViewMode() {
        this.viewMode = 'view';
    }

    private renderHeader() {
        if (this.scope.indexOf('|') === -1) {
            return '';
        }

        return html`
            <header class="header">
                <button class="button">Back</button>
            </header>
        `;
    }

    private renderContent() {
        const activeQuickFact =
            this.quickFacts.find((quickFact) => quickFact.anchor === this.activeAnchorId) || null;

        if (this.viewMode === 'edit' && this.activeAnchorId) {
            return html`
                <app-guide-edit-quick-fact
                    .quickFact="${activeQuickFact ||
                    createEmptyQuickFact(this.activeAnchorId, this.scope)}"
                    .api="${this.api}"
                    scope="${this.scope}"
                    @quick-fact-updated="${this.handleQuickFactUpdated}"
                    @cancel="${this.handleEditCancel}"
                ></app-guide-edit-quick-fact>
            `;
        } else if (this.activeAnchorId) {
            return html`
                <app-guide-view-quick-fact
                    .quickFact="${activeQuickFact}"
                    @edit="${this.handleEditClick}"
                ></app-guide-view-quick-fact>
            `;
        }

        return html`Click on one of the items to see quick facts about it`;
    }

    render() {
        const content = this.renderContent();
        const header = this.renderHeader();

        return html`
            <div class="popover ${this.isActive ? 'active' : ''}">
                ${header} ${content}
            </div>
        `;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-guide-popover': any;
        }
    }
}
