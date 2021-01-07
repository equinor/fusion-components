import { map } from 'rxjs/operators';

import { TelemetryLogger, TelemetryObserver } from '@equinor/fusion';

import { Store } from '../store';

import trackActions from './track-actions';

const createContext = (store: Store) =>
  store.state$.pipe(
    map((x) => ({
      id: x.id,
      type: x.embedInfo?.embedType,
      name: x.embedInfo?.name,
      workspace: x.embedInfo?.groupId,
    }))
  );

export class PowerBITelemetryObserver extends TelemetryObserver {
  constructor(store: Store, logger: TelemetryLogger) {
    super('@PowerBI', createContext(store), logger);
    this._subscription.add(trackActions(store.action$).subscribe(this));
  }
}

export default PowerBITelemetryObserver;