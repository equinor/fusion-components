import { customElement, LitElement, html, property } from 'lit-element';
import { ApplicationGuidanceScopeIsolation, ApplicationGuidanceMessage } from '../types';

@customElement('app-guide-scope')
export default class ApplicationGuidanceScopeElement extends LitElement {
    @property({ type: String, attribute: 'scope' })
    scope: string = '';

    @property({ type: String, attribute: 'isolation' })
    isolation: ApplicationGuidanceScopeIsolation = 'none';

    @property({ type: Boolean, attribute: 'active' })
    isActive: boolean = false;

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('isActive')) {
            const message: ApplicationGuidanceMessage = {
                type: 'application-guidance-scope',
                scope: {
                    id: this.scope,
                    isolation: this.isolation,
                },
                isActive: this.isActive,
            };

            window.postMessage(message, window.location.origin);
        }
    }

    render() {
        return html`<slot></slot>`;
    }
}

export type ApplicationGuidanceScopeProps = React.PropsWithChildren<{
    scope: string;
    isolation?: ApplicationGuidanceScopeIsolation;
    active?: boolean;
}>;

declare global {
    interface HTMLElementTagNameMap {
        'app-guide-scope': ApplicationGuidanceScopeElement;
    }

    namespace JSX {
        interface ReactHTML {
            'app-guide-scope': React.DetailedHTMLFactory<
                ApplicationGuidanceScopeProps,
                ApplicationGuidanceScopeElement
            >;
        }
        interface IntrinsicElements {
            'app-guide-scope': React.DetailedHTMLProps<
                ApplicationGuidanceScopeProps,
                ApplicationGuidanceScopeElement
            >;
        }
    }
}
