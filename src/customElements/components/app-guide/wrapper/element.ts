import { fusionElement, svg, LitElement, property, css, html, directives } from '../../base';
import {
    ApplicationGuidanceMessage,
    ApplicationGuidanceAnchorRect,
    ApplicationGuidanceQuickFact,
    QuickFactEvent,
    ApplicationGuidanceAnchor,
    ApplicationGuidanceScopeIsolation,
    ApplicationGuidanceScope,
} from '../types';
import ApplicationGuidanceApi from '../api';

// elements required
import '../popover';
import '../fab';
import './placeholder';

const createOverlayMask = (rect: ApplicationGuidanceAnchorRect) => svg`
    <rect
        x="${rect.left}px"
        y="${rect.top}px"
        width="${rect.width}px"
        height="${rect.height}px"
        rx="4px"
        fill="black"
    ></rect>
`;

const createOverlay = (mask: string|any) => svg`
    <svg width="100%" height="100%">
        <defs>
            <mask id="Mask" width="100vw" height="100vh" x="0" y="0">
                <rect x="0px" y="0px" width="100vw" height="100vh" fill="white"></rect>
                ${mask}
            </mask>
        </defs>
        <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            mask="url(#Mask)"
            fill="rgba(0, 0, 0, .5)"
            filter="blur(5px)"
        ></rect>
    </svg>
`;

export interface AppGuideWrapperElementProps {
    appId: string;
    scope?: string;
    isolation?: ApplicationGuidanceScopeIsolation
};

@fusionElement('fusion-app-guide-wrapper')
export class AppGuideWrapperElement extends LitElement implements AppGuideWrapperElementProps {
    @property()
    scope?: string;

    @property()
    isolation: ApplicationGuidanceScopeIsolation = 'none';

    @property({ type: Array, attribute: false })
    scopes: ApplicationGuidanceScope[] = [];

    @property({ type: Array, attribute: false })
    anchors: ApplicationGuidanceAnchor[] = [];

    @property({ type: String, attribute: false })
    activeAnchorId: string | null = null;

    @property({ type: Boolean, attribute: false })
    isActive: boolean = false;

    @property({ type: Array, attribute: false })
    quickFacts: ApplicationGuidanceQuickFact[] = [];

    @property({ type: Boolean, attribute: false })
    private isFetchingActiveQuickFact: boolean = false;

    @property({ type: String, attribute: 'appid' })
    appId: string;

    private api: ApplicationGuidanceApi;

    static get styles() {
        return css`
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99999999999999;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            }

            .overlay.active {
                opacity: 1;
                pointer-events: all;
            }

            .anchors {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
            }
        `;
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('scope') || changedProperties.has('scopes')) {
            this.api = new ApplicationGuidanceApi(this.appId);
        }

        if (changedProperties.has('scope') || changedProperties.has('scopes')) {
            this.fetchQuickFacts(this.getScopePath());
        }

        if (changedProperties.has('activeAnchorId') && this.activeAnchorId) {
            this.fetchUpdatedQuickFact(this.getScopePath(), this.activeAnchorId);
        }

        if (!this.isActive && changedProperties.has('isActive')) {
            this.scopes = [];
        }
    }

    connectedCallback(){
        super.connectedCallback();
        window.addEventListener('message', this.handleMessage);
    }

    disconnectedCallback() {
        window.removeEventListener('message', this.handleMessage);
    }

    private async fetchQuickFacts(scope: string) {
        const quickFacts = await this.api.getQuickFactsAsync(scope);
        quickFacts.forEach(this.addOrUpdateQuickFact);
    }

    private async fetchUpdatedQuickFact(scope, quickFactId) {
        this.isFetchingActiveQuickFact = true;

        const start = Date.now();
        let quickFact: ApplicationGuidanceQuickFact | null = null;

        try {
            quickFact = await this.api.getQuickFactAsync(scope, quickFactId);
        } finally {
            const end = Date.now();
            const duration = end - start;
            const threshold = 300;
            if (duration > threshold) {
                this.addOrUpdateQuickFact(quickFact);
            } else {
                setTimeout(() => {
                    this.addOrUpdateQuickFact(quickFact);
                }, threshold - duration);
            }
        }
    }

    private addOrUpdateQuickFact = (quickFact: ApplicationGuidanceQuickFact | null) => {
        if (!quickFact) {
            this.isFetchingActiveQuickFact = false;
            return;
        }

        if (this.quickFacts.some((qf) => qf.anchor === quickFact.anchor)) {
            this.quickFacts = this.quickFacts.map((qf) =>
                qf.anchor === quickFact.anchor ? quickFact : qf
            );
        } else {
            this.quickFacts = [...this.quickFacts, quickFact];
        }

        this.isFetchingActiveQuickFact = false;
    };

    private handleMessage = (e: MessageEvent) => {
        const data = e.data as ApplicationGuidanceMessage;
        if (!data.type || e.origin !== window.location.origin) {
            return;
        }

        switch (data.type) {
            case 'application-guide-anchor-rect':
                const existing = this.anchors.some((a) => a.id === data.anchorId);
                if (existing) {
                    this.anchors = this.anchors.map((a) =>
                        a.id === data.anchorId
                            ? {
                                ...a,
                                rect: data.rect,
                                scope: data.scope,
                            }
                            : a
                    );
                } else {
                    this.anchors = [
                        ...this.anchors,
                        {
                            id: data.anchorId,
                            scope: data.scope,
                            rect: data.rect,
                        },
                    ];
                }
                break;

            case 'application-guidance-anchor-unmounted':
                this.anchors = this.anchors.filter((a) => a.id !== data.anchorId);
                break;

            case 'application-guidance-anchor-activated':
                if (data.anchorId === this.activeAnchorId) {
                    this.activeAnchorId = null;
                } else {
                    this.activeAnchorId = data.anchorId;
                }
                break;

            case 'application-guidance-active':
                this.isActive = data.isActive;
                this.activeAnchorId = null;
                break;

            case 'application-guidance-scope':
                const scopeExists = this.scopes.find((scope) => scope.id === data.scope.id);
                if (data.isActive && !scopeExists) {
                    this.scopes = [...this.scopes, data.scope];
                } else if (!data.isActive && scopeExists) {
                    this.scopes = this.scopes.filter((scope) => scope.id !== data.scope.id);
                }
                break;
        }
    };

    private handleQuickFactUpdated = async (e: QuickFactEvent) => {
        const {
            detail: { quickFact },
        } = e;
        if (this.quickFacts.some((qf) => qf.anchor === quickFact.anchor)) {
            this.quickFacts = this.quickFacts.map((qf) =>
                qf.anchor === quickFact.anchor ? quickFact : qf
            );
        } else {
            this.quickFacts = [...this.quickFacts, quickFact];
        }
    };

    private toggle = () => {
        const message: ApplicationGuidanceMessage = {
            type: 'application-guidance-active',
            isActive: !this.isActive,
        };

        window.postMessage(message, window.location.origin);
    };

    private getActiveScopes() {
        if (!this.scopes.length) {
            return [{ id: this.scope, isolation: 'none' }];
        }

        const lastScope = this.scopes[this.scopes.length - 1];
        const globalScopes = this.scopes.filter(
            (scope) => scope.isolation === 'global' && scope !== lastScope
        );

        const isolatedScopes = this.scopes.filter((scope) => scope.isolation === 'isolated');
        if (!isolatedScopes.length) {
            return [...globalScopes, lastScope];
        }

        const lastIndexOfIsolatedScope = isolatedScopes
            .map(this.scopes.indexOf)
            .reduce((lastIndex, currentIndex) => Math.max(lastIndex, currentIndex), 0);

        return this.scopes.slice(lastIndexOfIsolatedScope);
    }

    private getScopePath() {
        return [this.scope, ...this.scopes.map((s) => s.id)].join('|');
    }

    private getAnchorsInScope = () => {
        const activeScopes = this.getActiveScopes();
        if (!activeScopes) {
            return [];
        }

        return this.anchors.filter((a) => activeScopes.some((scope) => scope.id === a.scope));
    };

    private getRectsInScope = () => {
        return this.getAnchorsInScope().map((a) => a.rect);
    };

    render() {
        return html`
            <slot></slot>
            ${this.renderOverlay()}
            <fusion-app-guide-popover
                ?active="${this.isActive}"
                ?is-fetching-active-quick-fact="${this.isFetchingActiveQuickFact}"
                scope="${this.getScopePath()}"
                anchor="${this.activeAnchorId}"
                .quickFacts="${this.quickFacts}"
                .api="${this.api}"
                @quick-fact-updated="${this.handleQuickFactUpdated}"
            ></fusion-app-guide-popover>
            <fusion-app-guide-fab ?activated="${this.isActive}" @click=${this.toggle}></fusion-app-guide-fab>
        `;
    }

    protected renderOverlay(){
        const rectsHtml = this.getRectsInScope().map(createOverlayMask);
        const classes = directives.classMap({
            overlay: true,
            active: this.isActive
        });
        return html`
            <div class="${classes}">
                ${createOverlay(rectsHtml)}
                <div class="anchors">
                    ${this.isActive ? this.renderPlaceholders() : ''}
                </div>
            </div>
        `;
    }

    protected renderPlaceholders() {
        return directives.repeat(this.getAnchorsInScope(), anchor => anchor.id, anchor => html`
            <fusion-app-guide-placeholder
                id="${anchor.id}"
                ?active="${anchor.id === this.activeAnchorId}"
                .rect="${anchor.rect}"
            ></fusion-app-guide-placeholder>
        `);
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-wrapper': AppGuideWrapperElement;
    }
}
