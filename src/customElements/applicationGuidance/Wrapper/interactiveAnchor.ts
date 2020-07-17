import * as React from 'react';
import { LitElement, html, customElement, property, css } from 'lit-element';
import { ApplicationGuidanceAnchorRect, ApplicationGuidanceMessage } from '../types';
import { cssVariables } from '../styles';

export type ApplicationGuidanceInteractiveAnchorProps = {
    id: string;
    rect: ApplicationGuidanceAnchorRect;
};

@customElement('app-guide-interactive-anchor')
export default class ApplicationGuidanceInteractiveAnchor extends LitElement {
    @property({ type: Object })
    rect: ApplicationGuidanceAnchorRect;

    @property({ type: Boolean, attribute: 'active' })
    isActive: boolean;

    static get styles() {
        return [
            cssVariables,
            css`
                .anchor {
                    position: fixed;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: box-shadow 0.2s, border-color 0.2s;
                    border: 2px solid var(--color-primary);
                    margin: -2px 0 0 -2px;
                }

                .anchor.active {
                    border-color: var(--color-highlight);
                }
            `,
        ];
    }

    private handleClick = (e: MouseEvent) => {
        e.stopPropagation();

        const message: ApplicationGuidanceMessage = {
            type: 'application-guidance-anchor-activated',
            anchorId: this.id,
        };

        window.postMessage(message, window.location.origin);
    };

    render() {
        return html`
            <div
                @click=${this.handleClick}
                class="anchor ${this.isActive ? 'active' : ''}"
                style="width: ${this.rect.width}px; height: ${this.rect.height}px; top: ${this.rect
                    .top}px; left: ${this.rect.left}px; "
            ></div>
        `;
    }
}

type ApplicationGuidanceInteractiveAnchorHTMLAttributes = ApplicationGuidanceInteractiveAnchorProps &
    React.HTMLAttributes<ApplicationGuidanceInteractiveAnchor>;

declare global {
    interface HTMLElementTagNameMap {
        'fusion-person-photo': ApplicationGuidanceInteractiveAnchor;
    }

    namespace JSX {
        interface ReactHTML {
            'app-guide-interactive-anchor': React.DetailedHTMLFactory<
                ApplicationGuidanceInteractiveAnchorHTMLAttributes,
                ApplicationGuidanceInteractiveAnchor
            >;
        }
        interface IntrinsicElements {
            'app-guide-interactive-anchor': React.DetailedHTMLProps<
                ApplicationGuidanceInteractiveAnchorHTMLAttributes,
                ApplicationGuidanceInteractiveAnchor
            >;
        }
    }
}
