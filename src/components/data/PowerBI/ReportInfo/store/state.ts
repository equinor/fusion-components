import { Report } from '@equinor/fusion/lib/http/apiClients/models/report/';
import { ApiError, Actions } from './actions';

export enum Status {
  LoadingReport,
  LoadingRequirements,
  LoadingDescription,
  LoadingAccessDescription,
}

export type State = {
  id: string,
  status: Array<Status>,
  initialized?: boolean,
  errors: Array<ApiError>,
  report?: Report,
  requirements?: string,
  description?: string,
  accessDescription?: string,
}

export const removeStatus = (state: State, status: Status) => state.status.filter(x => x !== status);
export const removeError = (state: State, action: Actions) => state.errors.filter(x => x.action.type !== action.type)