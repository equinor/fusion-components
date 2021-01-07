import { EpicReducer, combineEpics } from '@equinor/fusion/lib/epic';

import { State } from './state';
import { Actions, actions } from './actions';
import { epics, Dependencies } from './epics';
import { reducer } from './reducer';

export const epic = combineEpics<Actions, Actions, State>(...Object.values(epics));

export class Store extends EpicReducer<State, Actions> {
  initialize() {
    this.dispatch(actions.initialize.request(this.value.id));
    return () => this.dispatch(actions.initialize.cancel());
  }
}

export const createStore = (id: string, dependencies: Dependencies): Store => {
  const initial: State = { id, errors: [], status: [] };
  return new Store(reducer, epic, initial, dependencies);
}

export default Store;