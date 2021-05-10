import { ApiClients } from '@equinor/fusion';
import { Store } from './store';
import { reducer } from './reducers';
import epics from './epics/bookmarks';
import { State } from './state';
export const createStore = (clients: ApiClients): Store => {
    const initial: State = { errors: [], status: [], bookmarks: [] };
    return new Store(reducer, epics, initial, { clients });
};

export default createStore;
