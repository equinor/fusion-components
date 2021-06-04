import { LitElement, property } from '../../base';
import { OverlayAnchorConnectEvent } from './events';
import { AnchorDOMRect, AnchorRect } from './anchor-rect';

export type OverlayAnchor = {
    anchor: string;
    scope: string;
    bounds: () => AnchorRect;
    selected?: () => void;
};

export interface OverlayAnchorElementProps extends OverlayAnchor {
    snug?: boolean;
}

/**
 * element for marking anchor in application guidance
 */
export class OverlayAnchorElement extends LitElement implements OverlayAnchorElementProps {
    /**
     * id/tag of the element
     */
    @property({ type: String })
    anchor: string;

    /**
     * the scope which this anchor should appear in
     */
    @property({ type: String })
    scope: string;

    /**
     * apply padding to container of anchor
     */
    @property({ type: Boolean })
    snug?: boolean;

    /**
     * subscriber collection of this element
     */
    protected _disconnectedCallbacks: VoidFunction[] = [];

    /**
     * calculated bounds for the element and children.
     * applies padding if not snug
     */
    bounds(): AnchorRect {
        return AnchorDOMRect.fromUnbound(this, !this.snug && 16);
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

        const style = (this.renderRoot as OverlayAnchorElement).style;
        !style.display && (style.display = 'contents');

        this._disconnectedCallbacks = [];

        requestAnimationFrame(() => {
            const { anchor, scope, bounds, _disconnectedCallbacks } = this;
            const event = new OverlayAnchorConnectEvent({
                detail: {
                    anchor,
                    scope,
                    bounds: bounds.bind(this),
                    selected: () => this.dispatchEvent(new CustomEvent('selected')),
                    disconnectedCallback: _disconnectedCallbacks.push.bind(this),
                },
                bubbles: true,
                composed: true,
                cancelable: false,
            });
            this.dispatchEvent(event);
        });
    }

    /**
     * @override callback all observers when removed from dom
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this._disconnectedCallbacks.forEach((cb) => cb());
    }
}

export default OverlayAnchorElement;
