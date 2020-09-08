import { fusionElement, LitElement, property, css, html, directives } from '../../base';

import { ApplicationGuidanceAnchor } from '../types';
import { AppGuideAnchorConnectEvent } from '../anchor/events';

import { createOverlay } from './overlay';

/** required elements */
import '../popover';
import '../fab';
import './placeholder';

export interface AppGuideWrapperElementProps {
    scope?: string;
};

@fusionElement('fusion-app-guide-wrapper')
export class AppGuideWrapperElement extends LitElement implements AppGuideWrapperElementProps {

    /** @TODO move to own file */
    static get styles() {
        return css`
            #overlay {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 99999999999999;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            }

            #overlay.active {
                opacity: 1;
                pointer-events: all;
            }
        `;
    }

    @property()
    scope?: string;

    @property({ type: Boolean, reflect: true })
    active: boolean = false;

    @property({ reflect: true })
    selected?: string;

    // === internal props === // 
    @property({ type: Array, attribute: false })
    protected _anchors: Record<string, ApplicationGuidanceAnchor> = {};

    get anchors(): ApplicationGuidanceAnchor[] {
        return Object.values(this._anchors).filter(anchor => anchor.scope === this.scope);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('app-guide-anchor', this._handleAnchorConnect);
        window.addEventListener("resize", this._handleResize);
    }

    disconnectedCallback() {
        this.removeEventListener('app-guide-anchor', this._handleAnchorConnect);
        window.removeEventListener("resize", this._handleResize);
    }

    protected _handleAnchorConnect({ detail }: AppGuideAnchorConnectEvent) {
        const { disconnectedCallback, ...anchor } = detail;
        !this._anchors[anchor.id] && disconnectedCallback(() => {
            delete this._anchors[anchor.id];
            this.requestUpdate('anchors');
        })
        this._anchors = { ...this._anchors, [anchor.id]: anchor };
    }

    protected _handlePlaceholderClick(e: Event) {
        const { currentTarget } = e;
        this.selected = (currentTarget as Element).id;
    }

    protected _handleResize = () => {
        this.active && this.requestUpdate();
    }

    protected _toggle = () => {
        this.active = !this.active;
    };

    render() {
        const { active, selected, scope } = this;
        return html`
            ${this.renderOverlay()}
            <slot></slot>
            <fusion-app-guide-popover
                ?active="${active}"
                .anchor="${selected}"
                .scope="${scope}"
            ></fusion-app-guide-popover>
            <slot name="fab">
                <fusion-app-guide-fab ?activated="${this.active}" @click=${this._toggle}></fusion-app-guide-fab>
            </slot>
        `;
    }

    protected renderOverlay() {
        const { active, selected, anchors } = this;
        const classes = directives.classMap({ active });
        const rects = anchors.map(anchor => ({
            id: anchor.id,
            rect: anchor.bounds()
        }));
        return html`
            <div id="overlay" class="${classes}">
                ${createOverlay(rects)} 
                ${directives.repeat(rects, ({ id }) => id, anchor => html`
                    <fusion-app-guide-placeholder
                        id="${anchor.id}"
                        @click=${this._handlePlaceholderClick}
                        ?active="${anchor.id === selected}"
                        .rect="${anchor.rect}"
                    ></fusion-app-guide-placeholder>
                `)}
            </div>
        `;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-wrapper': AppGuideWrapperElement;
    }
}
