import { LitElement } from 'lit-element';
import { IFusionContext } from '@equinor/fusion';

const globalEquinorFusionContextKey = '74b1613f-f22a-451b-a5c3-1c9391e91e68';

export abstract class FusionElement extends LitElement {
    get fusionContext(): IFusionContext {
        return window[globalEquinorFusionContextKey];
    }
};

export * from 'lit-element';