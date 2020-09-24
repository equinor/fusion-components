import { IFusionContext, ApiClients } from '@equinor/fusion';

const globalEquinorFusionContextKey = '74b1613f-f22a-451b-a5c3-1c9391e91e68';

declare global {
    interface Window { clientId: string; }
}

/** 
 * @todo @odinr
 * this should be located somewhere else and better document
 * this also requires changes to the fusion api.
 * @WIP
*/
export const infoApi = {
    get context(): IFusionContext {
        return window[globalEquinorFusionContextKey] as IFusionContext;
    },
    getClient<T extends keyof ApiClients>(client: T): ApiClients[T] {
        return this.context.http.apiClients[client];
    }
}