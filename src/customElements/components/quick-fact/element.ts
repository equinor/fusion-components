import { LitElement, property, html } from '../base';


import { infoApi } from '../base/api';

import styles from './element.css';

/** @TODO - fix export in api */
import { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';
import iconCreate from './create.svg';
import iconEdit from './edit.svg';
import { QuickFactEventType, QuickFactEventDetail, QuickFactEvent } from './events';

export type ViewMode = 'view' | 'edit';

export interface QuickFactElementProps {
    scope?: string;
    anchor?: string;
}

/**
 * element for displaying a quick fact
 */
export class QuickFactElement extends LitElement {
    static styles = styles;

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
    view: ViewMode = 'view';

    @property({ attribute: false })
    quickFact?: QuickFact;

    @property({ attribute: false })
    fetching?: boolean;

    get client() {
        return infoApi.getClient('info');
    }


    public async fetchQuickFact() {
        const event = this._dispatchEvent(QuickFactEventType.fetch, { cancelable: true });
        if (!event.defaultPrevented) {
            this.quickFact = await this._fetchQuickFact();
            this._dispatchEvent(QuickFactEventType.fetched);
        }
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
            const quickFact = await this.client.getQuickFact(scope, anchor);
            return quickFact.data;
        } catch (err) {
            if (err.response?.status === 404) {
                return undefined;
            }
            if (err.response?.status === 401) {
                return undefined;
            }

            switch (err.response?.status) {
                case 404: return undefined;
                /** @todo handle not allowed */
                case 401:
                    console.warn('not authorized!', err);
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
            if (!!this.scope && !!this.anchor) {
                this.fetchQuickFact();
                this._dispatchEvent(QuickFactEventType.show);
            }
            this.enterViewMode();
        }

        /**
         * change to view mode when quick fact has changed
         */
        if (changedProperties.has('quickFact')) {
            this.enterViewMode();
        }
    }

    private handleSave = async (e: CustomEvent<QuickFact>) => {
        this._dispatchEvent(this.quickFact ? QuickFactEventType.updated : QuickFactEventType.created);
        this.quickFact = e.detail;
    };

    private handleEditClick = () => {
        this.enterEditMode();
    };

    private handleEditCancel = () => {
        this.enterViewMode();
    };

    private enterEditMode() {
        this.view = this.anchor ? 'edit' : 'view';
    }

    private enterViewMode() {
        this.view = 'view';
    }

    private renderContent() {

        const { quickFact, anchor, fetching, scope } = this;

        if (!anchor) {
            return html`<slot name="empty"></slot>`;
        }


        if (this.view === 'edit') {
            return html`
                <fusion-quick-fact-edit
                    .quickFact=${quickFact || { anchor, collectionPath: this.scope }}
                    .scope=${scope}
                    .api=${this.client}
                    @update=${this.handleSave}
                    @cancel="${this.handleEditCancel}"
                ></fusion-quick-fact-edit>
            `;
        }

        if (fetching) {
            return html`<fusion-quick-fact-skeleton></fusion-quick-fact-skeleton>`;
        }

        if (!quickFact) {
            return this.renderMissingQuickFact();
        }

        return html`
            <fusion-quick-fact-view
                .quickFact="${quickFact}"
                .showSkeleton="${this.fetching}"
            >
                <fusion-button slot="toolbar" @click="${this.handleEditClick}">
                    ${iconEdit}
                </fusion-button>
            </fusion-quick-fact-view>
        `;
    }

    renderMissingQuickFact() {
        return html`
            <div id="not-found">
                <header>
                    <span>There's no quick fact for this element.</span>
                </header>
                <fusion-button id="btn-create" @click="${this.handleEditClick}" fullwidth>
                    <span slot="icon">${iconCreate}</span>
                    Create new
                </fusion-button>
                </button>
                <p>Anyone can create and edit Quickfacts</p>
            </div>
        `;
    }

    render() {
        return html`
            <div>
                <div id="content">
                    ${this.renderContent()} 
                </div>
            </div>
        `;
    }


    protected _dispatchEvent(type: QuickFactEventType, init?: CustomEventInit<QuickFactEventDetail>) {
        const { scope, anchor, view, quickFact } = this;
        const detail = { ...init?.detail, scope, anchor, quickFact, view }
        const event = new QuickFactEvent(type, { ...init, detail });
        this.dispatchEvent(event);
        return event;
    }
}

export default QuickFactElement;
