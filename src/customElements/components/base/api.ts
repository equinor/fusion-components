import { IFusionContext, ApiClients } from '@equinor/fusion';

/** @TODO */
export const infoApi = {
    get context(): IFusionContext {
        return window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;
    },
    getClient<T extends keyof ApiClients>(client: T): ApiClients[T] {
        return this.context.http.apiClients[client];
    }
}