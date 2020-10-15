import { LitElement, html, property, PropertyValues, directives } from "../base";

/** required elements */
import './placeholder';

import styles from './element.css';

/** @TODO */
import { AnchorDOMRect, AnchorRect, OverlayAnchor, OverlayAnchorConnectEvent } from './anchor';
import { OverlayEventType, OverlayEventDetail, OverlayEvent } from './events';
import overlay from './overlay.svg';

export type OverLayScope = Record<string, string[]>

export interface OverlayElementProps {
    scope?: OverLayScope;
    active?: boolean;
    fixed?: boolean;
    selected?: string;
}

export class OverlayElement extends LitElement implements OverlayElementProps {
    static styles = styles;

    @property({ type: Object, reflect: false })
    scope: OverLayScope;

    @property({ type: Boolean, reflect: true })
    active?: boolean;

    @property({ type: Boolean, reflect: true })
    fixed?: boolean;

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
        this._dispatchEvent(OverlayEventType.connected);
        this.addEventListener(OverlayAnchorConnectEvent.eventName, this._handleAnchorConnect);
        window.addEventListener("resize", this._handleResize, false);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._dispatchEvent(OverlayEventType.disconnected);
        this.removeEventListener(OverlayAnchorConnectEvent.eventName, this._handleAnchorConnect);
        window.removeEventListener("resize", this._handleResize);
    }

    render() {
        const { active, fixed } = this;
        const clientBounds = this.getBoundingClientRect();
        const relativeRect = (r: AnchorRect) => new AnchorDOMRect(
            fixed ? r.x : r.x - clientBounds.x,
            fixed ? r.y : r.y - clientBounds.y,
            r.width,
            r.height
        );
        const rects = this.scopedAnchors.map(el => ({ id: el.anchor, rect: relativeRect(el.bounds()) }));
        console.log(rects);
        const placeholders = directives.repeat(rects, r => r.id, r => this.renderPlaceholder(r));
        const overlaySize = {
            height: `${clientBounds.height}px`,
            width: `${clientBounds.width}px`,
        }
        const classes = directives.classMap({ active, fixed });
        const styles = directives.styleMap(overlaySize);

        return html`
            <slot></slot>
            <div id="overlay" class="${classes}" style="${styles}">
                ${overlay(rects, overlaySize)}
                ${placeholders}
            </div>
        `;
    }

    renderPlaceholder(anchor: { id: string, rect: AnchorRect }) {
        return html`
            <fusion-overlay-placeholder
                id="${anchor.id}"
                @click=${this._handlePlaceholderClick}
                ?active="${anchor.id === this.selected}"
                .rect="${anchor.rect}"
                slot="placeholders"
            ></fusion-overlay-placeholder>
        `;
    }

    updated(props: PropertyValues) {
        super.update(props);

        if (props.has('active')) {
            this._dispatchEvent(this.active
                ? OverlayEventType.activated
                : OverlayEventType.deactivated
            );
            // request update of bounds after display, anchors may jump
            setTimeout(() => this.requestUpdate('scopedAnchors'), 1000);
        }

        if (props.has('selected')) {
            const anchor = this.anchors[this.selected];
            anchor?.selected && anchor.selected();
            this._dispatchEvent(OverlayEventType.selection);
        }

        props.has('scope') && this._dispatchEvent(OverlayEventType.scope);
        props.has('anchors') && this._dispatchEvent(OverlayEventType.anchor);
    }

    protected _dispatchEvent(type: OverlayEventType, init?: CustomEventInit<OverlayEventDetail>) {
        const { scope, active, selectedAnchor: selected } = this;
        const detail = { ...init?.detail, scope, active, selected }
        const event = new OverlayEvent(type, { ...init, detail, composed: true, bubbles: true });
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