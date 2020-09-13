import { LitElement, html, property, PropertyValues, directives } from "../base";

/** required elements */
import './placeholder';
import './scrim';

import styles from './element.css';

/** @TODO */
import { OverlayAnchor, OverlayAnchorConnectEvent } from './anchor';
import { OverlayElementEventType, OverlayElementEventDetail, OverlayElementEvent } from './events';

export interface OverlayElementProps {
    scope?: string;
    active?: boolean;
    selected?: string;
}

export class OverlayElement extends LitElement implements OverlayElementProps {
    static styles = styles;

    @property()
    scope?: string;

    @property({ type: Boolean, reflect: true })
    active: boolean = false;

    @property({ reflect: true })
    selected?: string;

    // === internal props === // 
    @property({ type: Array, attribute: false })
    anchors: Record<string, OverlayAnchor> = {};

    get scopedAnchors(): OverlayAnchor[] {
        return Object.values(this.anchors).filter(anchor => anchor.scope === this.scope);
    }

    get selectedAnchor(): OverlayAnchor {
        return this.anchors[this.selected];
    }

    /**
     * Listen for anchor connect requests
     * Listen for resize for adjusting anchor bounds
     */
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener(OverlayAnchorConnectEvent.eventName, this._handleAnchorConnect);
        window.addEventListener("resize", this._handleResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(OverlayAnchorConnectEvent.eventName, this._handleAnchorConnect);
        window.removeEventListener("resize", this._handleResize);
    }

    render() {
        return html`
            <fusion-overlay-scrim ?active=${this.active} .anchors=${this.scopedAnchors}>
                ${this.renderPlaceholders()}
                <slot name="content"></slot>
            </fusion-overlay-scrim>
            <slot></slot>
        `;
    }

    renderPlaceholders() {
        return directives.repeat(this.scopedAnchors, ({ id }) => id, anchor => this.renderPlaceholder(anchor));
    }

    renderPlaceholder(anchor: OverlayAnchor) {
        return html`
            <fusion-overlay-placeholder
                id="${anchor.id}"
                @click=${this._handlePlaceholderClick}
                ?active="${anchor.id === this.selected}"
                .rect="${anchor.bounds()}"
                slot="placeholders"
            ></fusion-overlay-placeholder>
        `;
    }

    updated(props: PropertyValues) {
        super.update(props);
        props.has('active') && this._dispatchEvent(this.active
            ? OverlayElementEventType.activated
            : OverlayElementEventType.deactivated
        );
        props.has('scope') && this._dispatchEvent(OverlayElementEventType.scope);
        props.has('selected') && this._dispatchEvent(OverlayElementEventType.selection);
    }

    protected _dispatchEvent(type: OverlayElementEventType, init?: CustomEventInit<OverlayElementEventDetail>) {
        const { scope, active, selectedAnchor: selected } = this;
        const detail = { ...init?.detail, scope, active, selected }
        const event = new OverlayElementEvent(type, { ...init, detail });
        this.dispatchEvent(event);
        return event;
    }

    protected _handleResize = () => {
        this.active && this.requestUpdate('scopedAnchors');
    }

    protected _handleAnchorConnect({ detail }: OverlayAnchorConnectEvent) {
        const { disconnectedCallback, ...anchor } = detail;
        !this.anchors[anchor.id] && disconnectedCallback(() => {
            delete this.anchors[anchor.id];
            this.requestUpdate('anchors');
        });
        this.anchors = { ...this.anchors, [anchor.id]: anchor };
    }

    protected _handlePlaceholderClick(e: Event) {
        const { currentTarget } = e;
        this.selected = (currentTarget as Element).id;
    }
}

export default OverlayElement;