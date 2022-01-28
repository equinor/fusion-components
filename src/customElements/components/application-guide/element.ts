import { LitElement, html, property, eventOptions, PropertyValues, query } from '../base';

import { OverlayEvent, OverlayEventType, OverlayElement } from '../overlay';
import { QuickFactEvent, QuickFactEventType } from '../quick-fact';
import {
    ApplicationGuideEvent,
    ApplicationGuideEventType,
    ApplicationGuideEventDetail,
} from './events';

import styles from './element.css';

export interface ApplicationGuideElementProps {
    active?: boolean;
}

/**
 * Element that contains overlays and displays quick fact box
 */
export class ApplicationGuideElement extends LitElement implements ApplicationGuideElementProps {
    static styles = styles;

    /**
     * if active the overlays are activated
     */
    @property({ type: Boolean, reflect: true })
    active = false;

    /**
     * selected anchor from overlay
     */
    @property({ type: Object })
    selected?: { scope: string; anchor: string };

    /**
     * Placeholder for popover (info box)
     */
    @query('#popover')
    popover!: HTMLDivElement;

    /**
     * Collection of connected overlays
     */
    protected _overlays: OverlayElement[] = [];

    /**
     * Drag start position
     * dY and dX = position of drag start (pointer position)
     * eY and eX = position of element on drag start
     */
    protected _dragStart: { dY: number; dX: number; eY: number; eX: number };

    constructor() {
        super();
        this.handleOverlayEvent = this.handleOverlayEvent.bind(this);
    }

    /**
     * When connected to DOM start observing window for overlay events (connect and disconnect)
     * Observe selection changed for registered overlays when connected
     */
    connectedCallback() {
        super.connectedCallback();

        // listen for overlays that connects or disconnects
        window.addEventListener(OverlayEventType.connected, this.handleOverlayEvent);
        window.addEventListener(OverlayEventType.disconnected, this.handleOverlayEvent);

        // listen for selection change of overlays
        this._overlays.forEach((overlay) =>
            overlay.addEventListener(OverlayEventType.selection, this.handleOverlayEvent)
        );
    }

    /**
     * Stop observing connection, disconnections and selection changes of overlays
     */
    disconnectedCallback() {
        super.disconnectedCallback();

        // stop observing connections/disconnections of overlays
        window.removeEventListener(OverlayEventType.connected, this.handleOverlayEvent);
        window.removeEventListener(OverlayEventType.disconnected, this.handleOverlayEvent);

        // stop observing change of selection on overlays
        this._overlays.forEach((overlay) =>
            overlay.removeEventListener(OverlayEventType.selection, this.handleOverlayEvent)
        );
    }

    /**
     * Toggle active status of element
     */
    toggle() {
        this.active = !this.active;
        this.popover.removeAttribute('style');
    }

    /**
     * Adds an overlay to the component.
     * Observes provided overlays changes to selection
     */
    addOverlay(el: OverlayElement) {
        // start observing selection changes of overlay
        el.addEventListener(OverlayEventType.selection, this.handleOverlayEvent);

        // show overlay if component is active
        el.active = this.active;

        // add overlay to collection of overlays
        this._overlays.push(el);
    }

    /**
     * Remove overlay from component
     */
    removeOverlay(overlay: OverlayElement) {
        overlay.removeEventListener(OverlayEventType.selection, this.handleOverlayEvent);

        // update collection of overlays
        this._overlays = this._overlays.filter((el) => el !== overlay);
    }

    /**
     * Change selected item for component
     * Clear selection for all other connected overlays
     */
    setSelected(overlay: OverlayElement, item: { scope: string; anchor: string }): void {
        this._overlays.filter((el) => el !== overlay).forEach((el) => (el.selected = undefined));
        this.selected = item;
    }

    /** Clear QuickFact after deactivating/toggling */
    clearSelected(): void {
        this._overlays.forEach((el) => (el.selected = undefined));
        this.selected = undefined;
    }

    handleOverlayEvent(evt: OverlayEvent<any>): void {
        switch (evt.type) {
            case OverlayEventType.connected:
                this.addOverlay(evt.target as OverlayElement);
                break;
            case OverlayEventType.disconnected:
                this.addOverlay(evt.target as OverlayElement);
                break;
            case OverlayEventType.selection:
                if (evt.detail.selected) {
                    const { anchor, scope } = evt.detail.selected;
                    this.setSelected(evt.target as OverlayElement, { anchor, scope });
                }
                break;
        }
    }

    render() {
        return html`
            <slot @dragover=${(e) => e.preventDefault()}></slot>
            <div
                id="popover"
                slot="content"
                draggable="true"
                @dragend=${this._handleDragEnd}
                @dragstart=${this._handleDragStart}
            >
                ${this.renderQuickFact()}
            </div>
        `;
    }

    renderQuickFact() {
        const { active, selected } = this;
        if (!active) {
            return '';
        }

        const { scope, anchor } = selected || {};
        return html`
            <fusion-quick-fact
                .scope="${scope}"
                .anchor="${anchor}"
                @quick-fact-show=${this._handleQuickFactShow}
            >
                <span slot="empty"
                    >Click on a highlighted area to view a Quickfact or to add a new</span
                >
            </fusion-quick-fact>
        `;
    }

    protected updated(props: PropertyValues) {
        super.update(props);
        if (props.has('active')) {
            this._overlays.forEach((el) => (el.active = this.active));
            this.active
                ? ApplicationGuideEventType.activated
                : ApplicationGuideEventType.deactivated;
        }
        props.has('scope') && this._dispatchEvent(ApplicationGuideEventType.scope);
        props.has('selected') && this._dispatchEvent(ApplicationGuideEventType.selection);
    }

    protected _dispatchEvent(
        type: ApplicationGuideEventType,
        init?: CustomEventInit<ApplicationGuideEventDetail>
    ) {
        const { active, selected } = this;
        const detail: ApplicationGuideEventDetail = {
            active,
            selected,
            ...init?.detail,
        };
        const event = new ApplicationGuideEvent(type, { ...init, detail });
        this.dispatchEvent(event);
        return event;
    }

    @eventOptions({ capture: false })
    protected _handleQuickFactShow(e: QuickFactEvent<QuickFactEventType.show>) {
        const { anchor, scope, info } = e.detail;
        const detail: ApplicationGuideEventDetail = {
            selected: { anchor, scope },
            info,
        };
        this._dispatchEvent(ApplicationGuideEventType.show, { detail });
    }

    @eventOptions({ capture: false })
    protected _handleDragStart(e: DragEvent) {
        const el = e.currentTarget as HTMLElement;

        // mark start of drag
        this._dragStart = { dY: e.y, dX: e.x, eY: el.offsetTop, eX: el.offsetLeft };

        // hides original element in next frame, else clone will not show
        requestAnimationFrame(() => (el.style.opacity = '0'));
    }

    @eventOptions({ capture: false })
    protected _handleDragEnd(e: DragEvent) {
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;

        // calculate new location of info box
        el.style.top = this._dragStart.eY + (e.y - this._dragStart.dY) + 'px';
        el.style.left = this._dragStart.eX + (e.x - this._dragStart.dX) + 'px';

        // remove static offset
        el.style.bottom = 'auto';
        el.style.right = 'auto';

        // show element
        el.style.opacity = null;
    }
}

export default ApplicationGuideElement;
