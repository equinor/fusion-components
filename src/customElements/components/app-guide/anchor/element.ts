import { fusionElement, LitElement, property } from '../../base';
import { AppGuideAnchorConnectEvent } from './events';
import { ApplicationGuidanceAnchorRect } from './anchor-bounds';

export type QuickFactToggleEventData = {
    anchorId: string;
    isActive: boolean;
};

export interface AppGuideAnchorElementProps {
    id: string;
    scope?: string;
    snug?: boolean;
};

/** @TODO move me to a util? */
const getElementsBounds = (elements: Element[]) => {
    const rects = elements.map((child) => child.getBoundingClientRect());
    return new ApplicationGuidanceAnchorRect(
        Math.min(...rects.map((r) => r.top)),
        Math.max(...rects.map((r) => r.right)),
        Math.max(...rects.map((r) => r.bottom)),
        Math.min(...rects.map((r) => r.left)),
    );
}

/**
 * element for marking anchor in application guidance
 */
@fusionElement('fusion-app-guide-anchor')
export class AppGuideAnchorElement extends LitElement implements AppGuideAnchorElementProps {
    /**
     * id/tag of the element
     */
    @property()
    id: string;

    /**
     * the scope which this anchor should appear in
     */
    @property()
    scope?: string;

    /**
     * apply padding to container of anchor
     */
    @property({ type: Boolean })
    snug: boolean = false;

    /**
     * subscriber collection of this element
     */
    protected _disconnectedCallbacks: VoidFunction[] = [];

    /**
     * calculated bounds for the element and children.
     * applies padding if not snug
     */
    get anchorBounds(): ApplicationGuidanceAnchorRect {
        const bounds = getElementsBounds([...this.children]);
        !this.snug && bounds.applyPadding(16);
        return bounds;
    }

    /**
     * @override this element does not need a shadow dom
     */
    createRenderRoot() {
        return this;
    }

    /**
     * @override add default styling and notify observers
     */
    connectedCallback() {
        super.connectedCallback();
        (this.renderRoot as AppGuideAnchorElement).style.display = "contents";

        this._disconnectedCallbacks = [];
        this.dispatchEvent(new AppGuideAnchorConnectEvent({
            detail: {
                id: this.id,
                scope: this.scope,
                bounds: () => this.anchorBounds,
                disconnectedCallback: cb => this._disconnectedCallbacks.push(cb),
            },
            bubbles: true,
            composed: true,
        }));
    }
    
    /**
     * @override callback all observers when removed from dom
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this._disconnectedCallbacks.forEach(cb => cb());
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-anchor': AppGuideAnchorElement
    }
}

export default AppGuideAnchorElement;
