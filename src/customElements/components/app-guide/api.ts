import { IFusionContext } from '@equinor/fusion';

/** @TODO */
import InfoClient from '@equinor/fusion/lib/http/apiClients/InfoClient';

export const infoApi = {

    get context(): IFusionContext {
        return window['74b1613f-f22a-451b-a5c3-1c9391e91e68'] as IFusionContext;
    },

    // @todo
    get client(): InfoClient {
        return (this.context as IFusionContext).http.apiClients.info;
    }
}