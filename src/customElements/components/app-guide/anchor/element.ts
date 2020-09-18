import { ApplicationGuidanceMessage, ApplicationGuidanceAnchorRect } from '../types';
import { fusionElement, LitElement, property } from '../../base';

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
const getElemetsBounds = (elements: Element[]) => {
    const rects = elements.map((child) => child.getBoundingClientRect());
    const top = Math.min(...rects.map((r) => r.top));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    const left = Math.min(...rects.map((r) => r.left));
    const right = Math.max(...rects.map((r) => r.right));

    return {
        top, bottom, left, right,
        get width() { return this.right - this.left },
        get height() { return this.bottom - this.top }
    }
}

/**
 * @TODO this element is constantly updating client rect...
 */
@fusionElement('fusion-app-guide-anchor')
export class AppGuideAnchorElement extends LitElement implements AppGuideAnchorElementProps {

    @property()
    id: string;

    @property()
    scope?: string;

    @property({ type: Boolean })
    snug: boolean = false;

    createRenderRoot(){
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('message', this.handleMessage, false);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        const message: ApplicationGuidanceMessage = {
            type: 'application-guidance-anchor-unmounted',
            anchorId: this.id,
        };

        window.postMessage(message, window.location.origin);
        window.removeEventListener('message', this.handleMessage);
    }

    updated() {
        this.calculateRects();
    }

    private handleMessage = (e: MessageEvent) => {
        const data = e.data as ApplicationGuidanceMessage;
        if (!data.type || e.origin !== window.location.origin) {
            return;
        }

        switch (data.type) {
            case 'application-guidance-anchor-activated':
                const event = new CustomEvent<QuickFactToggleEventData>('toggle', {
                    detail: {
                        anchorId: this.id,
                        isActive: data.anchorId === this.id,
                    },
                });
                this.dispatchEvent(event);
                break;
        }
    };

    private applySnugness(rect: ApplicationGuidanceAnchorRect) {
        if (this.snug) {
            return rect;
        }

        const snugnessFactor = 16;

        return {
            top: rect.top - snugnessFactor,
            left: rect.left - snugnessFactor,
            width: rect.width + (snugnessFactor * 2),
            height: rect.height + (snugnessFactor * 2),
        };
    }

    private currentRect: ApplicationGuidanceAnchorRect | null = null;
    private idleCallback: NodeJS.Timeout;
    private animationFrame: number;
    private calculateRects = () => {
        if (this.idleCallback) {
            window.cancelIdleCallback(this.idleCallback);
        }

        if (this.animationFrame) {
            window.cancelAnimationFrame(this.animationFrame);
        }

        this.idleCallback = window.requestIdleCallback(() => {

            const bounds = getElemetsBounds([...this.children]);
            
            const rect = this.applySnugness(bounds);

            if (
                !this.currentRect ||
                rect.top !== this.currentRect.top ||
                rect.left !== this.currentRect.left ||
                rect.width !== this.currentRect.width ||
                rect.height !== this.currentRect.height
            ) {
                this.currentRect = rect;
                const message: ApplicationGuidanceMessage = {
                    type: 'application-guide-anchor-rect',
                    rect,
                    anchorId: this.id,
                    scope: this.scope,
                };
                window.postMessage(message, window.location.origin);
            }

            this.animationFrame = window.requestAnimationFrame(this.calculateRects);
        });
    };    
}

declare global {
    interface HTMLElementTagNameMap {
        'fusion-app-guide-anchor': AppGuideAnchorElement
    }
}

export default AppGuideAnchorElement;
