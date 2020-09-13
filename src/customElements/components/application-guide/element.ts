import { LitElement, html, property, eventOptions } from "../base";

import { OverlayElementEventType, OverlayElementEvent } from '../overlay/events';

import { iconOpen } from './open.svg';
import { iconClose } from './close.svg';

import styles from './element.css';


export interface ApplicationGuideElementProps {
    scope?: string;
}

export class ApplicationGuideElement extends LitElement implements ApplicationGuideElementProps {
    static styles = styles;

    @property()
    scope?: string;

    @property({ type: Boolean, reflect: true })
    active: boolean = false;

    @property({ reflect: true })
    selected?: string;

    toggle() {
        this.active = !this.active;
        // @ts-ignore
        this.renderRoot.querySelector('#popover').style = null;
    }

    render() {
        const { scope, active } = this;
        const fabIcon = active ? iconClose : iconOpen;
        return html`
            <fusion-overlay 
                ?active=${active}
                .scope="${scope}"
                @overlay-selection=${this._handleSelectionChanged}
                @dragover=${e => e.preventDefault()}
            >
                <div id="popover" slot="content" draggable="true" @dragend=${this._handleDragEnd}  @dragstart=${this._handleDragStart}>
                    ${this.renderQuickFact()}
                </div>
                <slot></slot>
                <slot name="fab" @click=${(this.toggle)}>
                    <fusion-button id="fab" round raised size="large">
                        ${fabIcon}
                    </fusion-button>
                </slot>
            </fusion-overlay>
        `;
    }

    renderQuickFact() {
        const { active, selected, scope } = this;
        if (!active) {
            return '';
        }
        return html`
            <fusion-quick-fact
                .scope="${scope}"
                .anchor="${selected}"
            >
                <span slot="empty">Click on a highlighted area to view a Quickfact or to add a new</span>
            </fusion-quick-fact>
        `;
    }

    protected _handleSelectionChanged(e: OverlayElementEvent<OverlayElementEventType.selection>) {
        this.selected = e.detail.selected.id;
    }

    // @TODO

    protected _dragStart;

    @eventOptions({ capture: false })
    protected _handleDragStart(e: DragEvent) {
        const el = e.currentTarget as HTMLElement;
        this._dragStart = { dY: e.y, dX: e.x, eY: el.offsetTop, eX: el.offsetLeft };
        requestAnimationFrame(() => {
            el.style.bottom = 'auto';
            el.style.right = 'auto';
            el.style.opacity = '0';
        });
    }

    @eventOptions({ capture: false })
    protected _handleDragEnd(e: DragEvent) {
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;
        el.style.top = this._dragStart.eY + (e.y - this._dragStart.dY) + 'px';
        el.style.left = this._dragStart.eX + (e.x - this._dragStart.dX) + 'px';
        // el.style.bottom = window.innerHeight - (e.clientY + el.clientHeight) + 'px';
        // el.style.right = window.innerWidth - (e.clientX + el.clientWidth) + 'px';
        el.style.opacity = null;

    }
}

export default ApplicationGuideElement