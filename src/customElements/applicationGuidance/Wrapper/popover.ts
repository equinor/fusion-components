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
    createdBy: { azureUniqueId: '', name: '', mail: '' },
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

    @property({ type: Boolean, attribute: 'is-fetching-active-quick-fact' })
    isFetchingActiveQuickFact: boolean;

    static get styles() {
        return [
            cssVariables,
            buttonStyle,
            css`
                .popover {
                    position: fixed;
                    right: calc(var(--grid-unit) * 4);
                    padding: 0;
                    background: var(--color-background);
                    border-radius: var(--border-radius);
                    border: 2px solid var(--color-primary);
                    z-index: 99999999999999999999;
                    width: calc(var(--grid-unit) * 38);
                    opacity: 0;
                    bottom: -100%;
                    transition: all 0.2s;
                    color: var(--color-primary);
                    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12),
                        0px 2px 4px rgba(0, 0, 0, 0.14);
                }

                .popover.active {
                    bottom: 88px;
                    opacity: 1;
                }

                .header {
                    padding: 0 calc(var(--grid-unit) * 1) calc(var(--grid-unit) * 1);
                    margin: calc(var(--grid-unit) * -2) calc(var(--grid-unit) * -3)
                        calc(var(--grid-unit) * 3);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }

                .content {
                    padding: calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3)
                        calc(var(--grid-unit) * 3) calc(var(--grid-unit) * 3);
                }

                .toolbar {
                    background-color: var(--color-primary);
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    padding: var(--grid-unit);
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: calc(var(--grid-unit) * 2);
                    height: calc(var(--grid-unit) * 4);
                    color: white;
                }

                .toolbar button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    cursor: pointer;
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
                    ?is-fetching-active-quick-fact="${this.isFetchingActiveQuickFact}"
                    @edit="${this.handleEditClick}"
                ></app-guide-view-quick-fact>
            `;
        }

        return html`<div class="content">
            Click on a highlighted area to view a Quickfact or to add a new
        </div>`;
    }

    private renderToolbar() {
        return html`
            <div class="toolbar">
                <button>
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.1174 12.4701C20.1174 12.8101 20.0874 13.1301 20.0474 13.4501L22.1574 15.1001C22.3474 15.2501 22.3974 15.5201 22.2774 15.7401L20.2774 19.2001C20.1874 19.3601 20.0174 19.4501 19.8474 19.4501C19.7874 19.4501 19.7274 19.4401 19.6674 19.4201L17.1774 18.4201C16.6574 18.8101 16.0974 19.1501 15.4874 19.4001L15.1074 22.0501C15.0774 22.2901 14.8674 22.4701 14.6174 22.4701H10.6174C10.3674 22.4701 10.1574 22.2901 10.1274 22.0501L9.74739 19.4001C9.13739 19.1501 8.57739 18.8201 8.05739 18.4201L5.56739 19.4201C5.51739 19.4401 5.45739 19.4501 5.39739 19.4501C5.21739 19.4501 5.04739 19.3601 4.95739 19.2001L2.95739 15.7401C2.83739 15.5201 2.88739 15.2501 3.07739 15.1001L5.18739 13.4501C5.14739 13.1301 5.11739 12.8001 5.11739 12.4701C5.11739 12.1401 5.14739 11.8101 5.18739 11.4901L3.07739 9.84009C2.88739 9.69009 2.82739 9.42009 2.95739 9.20009L4.95739 5.74009C5.04739 5.58009 5.21739 5.49009 5.38739 5.49009C5.44739 5.49009 5.50739 5.50009 5.56739 5.52009L8.05739 6.52009C8.57739 6.13009 9.13739 5.79009 9.74739 5.54009L10.1274 2.89009C10.1574 2.65009 10.3674 2.47009 10.6174 2.47009H14.6174C14.8674 2.47009 15.0774 2.65009 15.1074 2.89009L15.4874 5.54009C16.0974 5.79009 16.6574 6.12009 17.1774 6.52009L19.6674 5.52009C19.7174 5.50009 19.7774 5.49009 19.8374 5.49009C20.0174 5.49009 20.1874 5.58009 20.2774 5.74009L22.2774 9.20009C22.3974 9.42009 22.3474 9.69009 22.1574 9.84009L20.0474 11.4901C20.0874 11.8101 20.1174 12.1301 20.1174 12.4701ZM18.1174 12.4701C18.1174 12.2601 18.1074 12.0501 18.0674 11.7401L17.9274 10.6101L18.8174 9.91009L19.8874 9.06009L19.1874 7.85009L17.9174 8.36009L16.8574 8.79009L15.9474 8.09009C15.5474 7.79009 15.1474 7.56009 14.7174 7.38009L13.6574 6.95009L13.4974 5.82009L13.3074 4.47009H11.9174L11.7174 5.82009L11.5574 6.95009L10.4974 7.38009C10.0874 7.55009 9.67739 7.79009 9.24739 8.11009L8.34739 8.79009L7.30739 8.37009L6.03739 7.86009L5.33739 9.07009L6.41739 9.91009L7.30739 10.6101L7.16739 11.7401C7.13739 12.0401 7.11739 12.2701 7.11739 12.4701C7.11739 12.6701 7.13739 12.9001 7.16739 13.2101L7.30739 14.3401L6.41739 15.0401L5.33739 15.8801L6.03739 17.0901L7.30739 16.5801L8.36739 16.1501L9.27739 16.8501C9.67739 17.1501 10.0774 17.3801 10.5074 17.5601L11.5674 17.9901L11.7274 19.1201L11.9174 20.4701H13.3174L13.5174 19.1201L13.6774 17.9901L14.7374 17.5601C15.1474 17.3901 15.5574 17.1501 15.9874 16.8301L16.8874 16.1501L17.9274 16.5701L19.1974 17.0801L19.8974 15.8701L18.8174 15.0301L17.9274 14.3301L18.0674 13.2001C18.0974 12.9001 18.1174 12.6801 18.1174 12.4701ZM12.6174 8.47009C10.4074 8.47009 8.61739 10.2601 8.61739 12.4701C8.61739 14.6801 10.4074 16.4701 12.6174 16.4701C14.8274 16.4701 16.6174 14.6801 16.6174 12.4701C16.6174 10.2601 14.8274 8.47009 12.6174 8.47009ZM10.6174 12.4701C10.6174 13.5701 11.5174 14.4701 12.6174 14.4701C13.7174 14.4701 14.6174 13.5701 14.6174 12.4701C14.6174 11.3701 13.7174 10.4701 12.6174 10.4701C11.5174 10.4701 10.6174 11.3701 10.6174 12.4701Z"
                            fill="#D5EAF4"
                        />
                    </svg>
                </button>
            </div>
        `;
    }

    private renderSettings() {}

    render() {
        const content = this.renderContent();
        const header = this.renderHeader();
        const toolbar = this.renderToolbar();

        return html`
            <div class="popover ${this.isActive ? 'active' : ''}">
                ${header} ${content} ${toolbar}
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