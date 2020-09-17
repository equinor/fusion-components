import { LitElement, html, property, PropertyValues, directives } from "../base";

/** required elements */
import './placeholder';
import './scrim';

import styles from './element.css';

/** @TODO */
import { OverlayAnchor, OverlayAnchorConnectEvent } from './anchor';
import { OverlayEventType, OverlayEventDetail, OverlayEvent } from './events';

export type OverLayScope = Record<string, string[]>

export interface OverlayElementProps {
    scope?: OverLayScope;
    active?: boolean;
    selected?: string;
}

export class OverlayElement extends LitElement implements OverlayElementProps {
    static styles = styles;

    @property({ type: Object })
    scope: OverLayScope;

    @property({ type: Boolean, reflect: true })
    active: boolean = false;

    @property({ reflect: true })
    selected?: string;

    // === internal props === // 
    @property({ type: Array, attribute: false })
    anchors: Record<string, OverlayAnchor> = {};

    get scopedAnchors(): OverlayAnchor[] {
        const { scope } = this;
        const anchors = Object.values(this.anchors);
        const hasScope = !!scope && !!Object.keys(scope).length;
        return hasScope ? anchors.filter(
            (anchor) => {
                const scopeAnchors = scope[anchor.scope];
                return scopeAnchors && (!scopeAnchors.length || scopeAnchors.includes(anchor.anchor))
            }
        ) : anchors;
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
        return directives.repeat(this.scopedAnchors, ({ anchor: id }) => id, anchor => this.renderPlaceholder(anchor));
    }

    renderPlaceholder(anchor: OverlayAnchor) {
        return html`
            <fusion-overlay-placeholder
                id="${anchor.anchor}"
                @click=${this._handlePlaceholderClick}
                ?active="${anchor.anchor === this.selected}"
                .rect="${anchor.bounds()}"
                slot="placeholders"
            ></fusion-overlay-placeholder>
        `;
    }

    updated(props: PropertyValues) {
        super.update(props);
        props.has('active') && this._dispatchEvent(this.active
            ? OverlayEventType.activated
            : OverlayEventType.deactivated
        );
        props.has('scope') && this._dispatchEvent(OverlayEventType.scope);
        props.has('selected') && this._dispatchEvent(OverlayEventType.selection);
        props.has('anchors') && this._dispatchEvent(OverlayEventType.anchor);
    }

    protected _dispatchEvent(type: OverlayEventType, init?: CustomEventInit<OverlayEventDetail>) {
        const { scope, active, selectedAnchor: selected } = this;
        const detail = { ...init?.detail, scope, active, selected }
        const event = new OverlayEvent(type, { ...init, detail });
        this.dispatchEvent(event);
        return event;
    }

    protected _handleResize = () => {
        this.active && this.requestUpdate('scopedAnchors');
    }

    protected _handleAnchorConnect({ detail }: OverlayAnchorConnectEvent) {
        const { disconnectedCallback, ...anchor } = detail;
        !this.anchors[anchor.anchor] && disconnectedCallback(() => {
            delete this.anchors[anchor.anchor];
            this.requestUpdate('anchors');
        });
        this.anchors = { ...this.anchors, [anchor.anchor]: anchor };
    }

    protected _handlePlaceholderClick(e: Event) {
        const { currentTarget } = e;
        this.selected = (currentTarget as Element).id;
    }
}

export default OverlayElement;