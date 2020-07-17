import { LitElement, customElement, html, css, property } from 'lit-element';
import { ApplicationGuidanceMessage, ApplicationGuidanceAnchorRect } from '../types';
import React from 'react';

@customElement('app-guide-anchor')
export default class ApplicationGuidanceAnchor extends LitElement {
    static get styles() {
        return css`
            .anchor {
                display: content;
                overflow: visible;
            }
        `;
    }

    @property({ type: String, attribute: 'id' })
    id: string;

    @property({ type: String, attribute: 'scope' })
    scope: string | null = null;

    @property({ type: Boolean, attribute: 'snug-fit' })
    snugFit: boolean = false;

    constructor() {
        super();
        window.addEventListener('message', this.handleMessage);
    }

    disconnectedCallback() {
        const message: ApplicationGuidanceMessage = {
            type: 'application-guidance-anchor-unmounted',
            anchorId: this.id,
        };

        window.postMessage(message, window.location.origin);
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

            // case 'application-guidance-active':
            //     this.isActive = data.isActive;
            //     this.activeAnchorId = null;
            //     break;
        }
    };

    private applySnugness(rect: ApplicationGuidanceAnchorRect) {
        if(this.snugFit) {
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
            const rects = [...this.children].map((child) => child.getBoundingClientRect());

            const top = Math.min(...rects.map((r) => r.top));
            const bottom = Math.max(...rects.map((r) => r.bottom));
            const left = Math.min(...rects.map((r) => r.left));
            const right = Math.max(...rects.map((r) => r.right));
            const rect = this.applySnugness({
                top,
                left,
                width: right - left,
                height: bottom - top,
            });

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

    render() {
        return html` <slot></slot> `;
    }
}

export type ApplicationGuidanceAnchorProps = React.PropsWithChildren<{
    id: string;
    scope?: string;
    'snug-fit'?: boolean;
}>;

export type QuickFactToggleEventData = {
    anchorId: string;
    isActive: boolean;
};

export const useOnAnchorToggle = (callback: (isActive: boolean) => void) => {
    const ref = React.useRef<ApplicationGuidanceAnchor>(null);

    const handleOnToggle = React.useCallback(
        (e: CustomEvent<QuickFactToggleEventData>) => {
            callback(e.detail.isActive);
        },
        [callback]
    );

    React.useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('toggle', handleOnToggle);

            return () => ref.current.removeEventListener('toggle', handleOnToggle);
        }
    }, [ref.current]);

    return ref;
};

declare global {
    interface HTMLElementTagNameMap {
        'app-guide-anchor': ApplicationGuidanceAnchor;
    }

    namespace JSX {
        interface ReactHTML {
            'app-guide-anchor': React.DetailedHTMLFactory<
                ApplicationGuidanceAnchorProps,
                ApplicationGuidanceAnchor
            >;
        }
        interface IntrinsicElements {
            'app-guide-anchor': React.DetailedHTMLProps<
                ApplicationGuidanceAnchorProps,
                ApplicationGuidanceAnchor
            >;
        }
    }
}
