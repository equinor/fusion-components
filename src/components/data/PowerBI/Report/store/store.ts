import { EpicReducer, ActionPayload } from '@equinor/fusion/lib/epic';

import { State } from './state';
import { Actions, actions } from './actions';

type CheckAccess = Pick<
    ActionPayload<typeof actions.checkContextAccess.request>,
    'externalId' | 'type'
> & { silent?: boolean };

export class Store extends EpicReducer<State, Actions> {
    set contextAccess(value: boolean) {
        this.dispatch(actions.setContextAccess(value));
    }

    requestEmbedInfo(): VoidFunction {
        this.dispatch(actions.fetchEmbedInfo.request(this.value.id));
        return () => this.dispatch(actions.fetchEmbedInfo.cancel());
    }

    requestAccessToken(silent?: boolean): VoidFunction {
        this.dispatch(
            actions.fetchAccessToken.request({ reportId: this.value.id, silent: !!silent })
        );
        return () => this.dispatch(actions.fetchAccessToken.cancel());
    }

    checkContextAccess(args: CheckAccess): VoidFunction {
        this.dispatch(actions.checkContextAccess.request({ reportId: this.value.id, ...args }));
        return () => this.dispatch(actions.checkContextAccess.cancel());
    }

    reset(): void {
        this.dispatch(actions.reset());
    }
}

export default Store;
