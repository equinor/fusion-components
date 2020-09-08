import { ApplicationGuidanceAnchorRect } from './anchor/anchor-bounds';

export { QuickFact } from '@equinor/fusion/lib/http/apiClients/models/info/QuickFact';


/** @TODO move me */
export type ApplicationGuidanceAnchor = {
    readonly id: string;
    readonly scope: string;
    bounds: () => ApplicationGuidanceAnchorRect,
}