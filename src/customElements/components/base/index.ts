import { LitElement, html } from 'lit-element';
import { classMap } from '../../directives';

import { IFusionContext, ResourceCollections } from '@equinor/fusion';
import FusionResourceCollection from '@equinor/fusion/lib/http/resourceCollections/FusionResourceCollection';

const globalEquinorFusionContextKey = '74b1613f-f22a-451b-a5c3-1c9391e91e68';

export abstract class FusionElement extends LitElement {

    get containerClass(): Record<string, string | boolean | number> {
        return { FusionElement: true };
    }

    get fusionContext(): IFusionContext {
        return window[globalEquinorFusionContextKey];
    }

    get fusionResources(): ResourceCollections {
        return this.fusionContext.http.resourceCollections;
    }

    public render(): unknown {
        return html`
            <div id="container" class="${classMap(this.containerClass)}">
                ${this.renderContainer()}
            </div>`;
    }

    protected abstract renderContainer(): unknown;
};

export { fusionElement } from '../../decorators';
export * from 'lit-element';

export default FusionElement;
