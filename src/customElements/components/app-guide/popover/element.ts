import { fusionElement, LitElement, property, html } from '../../base';

import { ApplicationGuidanceQuickFact, QuickFactEvent } from '../types';

import ApplicationGuidanceApi from '../api';

import styles from './element.css';

import iconSettings from './settings.svg';

// imported elements
import '../quick-fact';

type ViewMode = 'view' | 'edit';

const createEmptyQuickFact = (id: string, scope: string): ApplicationGuidanceQuickFact => ({
    anchor: id,
    title: '',
    bodyMarkdown: '',
    contentUrl: '',
    created: new Date(),
    createdBy: { azureUniqueId: '', name: '', mail: '' },
    path: '',
    slug: '',
    collectionPath: scope,
});



export interface AppGuidePopoverProps {
    active?: boolean;
    scope: string;
}

@fusionElement('fusion-app-guide-popover')
export class AppGuidePopover extends LitElement {
    static styles = styles;

    @property({ type: Boolean })
    active?: boolean;

    @property()
    scope: string;

    /**
     * active anchor id
     */
    @property()
    anchor?: string;

    @property({ type: Array })
    quickFacts: ApplicationGuidanceQuickFact[] = [];

    
    @property({ type: Object })
    api: ApplicationGuidanceApi;
    
    @property({ type: Boolean, attribute: 'is-fetching-active-quick-fact' })
    isFetchingActiveQuickFact: boolean;
    

    @property({ type: String, attribute: false })
    viewMode: ViewMode = 'view';

    updated(changedProperties: Map<string, any>) {
        if (
            changedProperties.has('activeAnchorId') &&
            this.anchor !== changedProperties.get('activeAnchorId')
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
        if (!this.anchor) {
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
            this.quickFacts.find((quickFact) => quickFact.anchor === this.anchor) || null;

        if (this.viewMode === 'edit' && this.anchor) {
            return html`
                <fusion-app-guide-quick-fact-edit
                    .quickFact="${activeQuickFact ||
                createEmptyQuickFact(this.anchor, this.scope)}"
                    .api="${this.api}"
                    scope="${this.scope}"
                    @quick-fact-updated="${this.handleQuickFactUpdated}"
                    @cancel="${this.handleEditCancel}"
                ></fusion-app-guide-quick-fact-edit>
            `;
        } else if (this.anchor) {
            return html`
                <fusion-app-guide-quick-fact-view
                    .quickFact="${activeQuickFact}"
                    .showSkeleton="${this.isFetchingActiveQuickFact}"
                    @edit="${this.handleEditClick}"
                ></fusion-app-guide-quick-fact-view>
            `;
        }

        return html`<div class="content">
            Click on a highlighted area to view a Quickfact or to add a new
        </div>`;
    }

    private renderToolbar() {
        return html`
            <div class="toolbar">
                <button>${iconSettings}</button>
            </div>
        `;
    }

    render() {
        return html`
            <div class="popover ${this.active ? 'active' : ''}">
                ${this.renderHeader()} 
                ${this.renderContent()} 
                ${this.renderToolbar()}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-popover': AppGuidePopover;
    }
}

export default AppGuidePopover;
