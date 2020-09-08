import { fusionElement, LitElement, property, html, directives } from '../../base';


import { infoApi } from '../api';

import styles from './element.css';

import iconSettings from './settings.svg';

import '../quick-fact';

/** @TODO - fix export in api */
import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';

type ViewMode = 'view' | 'edit';


export interface AppGuidePopoverProps {
    active?: boolean;
    scope: string;
}

/**
 * element for displaying a quick fact
 */
@fusionElement('fusion-app-guide-popover')
export class AppGuidePopover extends LitElement {
    static styles = styles;

    /**
     * popover active
     */
    @property({ type: Boolean })
    active?: boolean;

    /**
     * scope of quick fact
     */
    @property({ type: String })
    scope?: string;

    /**
     * active anchor id
     */
    @property()
    anchor?: string;

    /**
     * display mode of quick fact
     */
    @property({ attribute: false })
    viewMode: ViewMode = 'view';

    @property({ attribute: false })
    quickFact?: QuickFact;

    @property({ attribute: false })
    fetching?: boolean;

    @property({ attribute: false })
    saving?: boolean;


    public async fetchQuickFact() {
        this.quickFact = await this._fetchQuickFact();
    }

    /**
     * fetch quick fact from server
     */
    protected async _fetchQuickFact(): Promise<QuickFact | null> {
        const { scope, anchor } = this;
        if (!scope) throw Error('fetchQuickFact: missing scope');
        if (!anchor) throw Error('fetchQuickFact: missing entity');

        try {
            this.fetching = true;
            const quickFact = await infoApi.client.getQuickFact(scope, anchor);
            return quickFact.data;
        } catch (err) {
            if (err.response?.status === 404) {
                return undefined;
            }
            console.error(err);
            throw Error('Failed to fetch quick fact');
        } finally {
            this.fetching = false;
        }
    }

    /**
     * @override listen for changes of scope, anchor and quick fact
     * @param changedProperties - changed properties
     */
    updated(changedProperties: Map<string, any>) {
        /**
         * clear and load quick fact if scope or anchor change
         */
        if (changedProperties.has('scope') || changedProperties.has('anchor')) {
            this.quickFact = null;
            this.scope && this.anchor && this.fetchQuickFact();
        }

        /**
         * change to view mode when quick fact has changed
         */
        if (changedProperties.has('quickFact')) {
            this.enterViewMode();
        }
    }

    private handleSave = async (e: CustomEvent<QuickFact>) => {
        try {
            this.saving = true;
            const { collectionPath, ...data } = e.detail;
            const res = await infoApi.client.updateQuickFact(collectionPath, data as QuickFact);
            this.quickFact = res.data;
            this.enterViewMode();
        } catch (err) {
            console.error(err);
        } finally {
            this.saving = false;
        }
    };

    private handleEditClick = () => {
        this.enterEditMode();
    };

    private handleEditCancel = () => {
        this.enterViewMode();
    };

    private enterEditMode() {
        this.viewMode = this.anchor ? 'edit' : 'view';
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

        const { quickFact, anchor } = this;

        if (this.viewMode === 'edit' && this.anchor) {
            return html`
                <fusion-app-guide-quick-fact-edit
                    .quickFact="${quickFact || { anchor, collectionPath: this.scope }}"
                    .scope="${this.scope}"
                    .saving="${this.saving}"
                    @update=${this.handleSave}
                    @cancel="${this.handleEditCancel}"
                ></fusion-app-guide-quick-fact-edit>
            `;
        } else if (this.anchor) {
            return html`
                <fusion-app-guide-quick-fact-view
                    .quickFact="${quickFact}"
                    .showSkeleton="${this.fetching}"
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
                <!-- ${this.renderHeader()}  -->
                ${this.renderContent()} 
                <!-- ${this.renderToolbar()} -->
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
