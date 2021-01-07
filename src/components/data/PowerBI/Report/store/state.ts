import { AccessToken, EmbedInfo } from '@equinor/fusion/lib/http/apiClients/models/report/';
import { Actions, ApiError } from './actions';

export enum Status {
  LoadingEmbedInfo,
  AcquiringAccessToken,
  AccessCheck,
}

export type State = {
  id: string,
  status: Array<Status>,
  errors: Array<ApiError>,
  embedInfo?: EmbedInfo['embedConfig'],
  token?: AccessToken,
  hasContextAccess?: boolean,
}

export const removeStatus = (state: State, status: Status) => state.status.filter(x => x !== status);
export const removeError = (state: State, action: Actions) => state.errors.filter(x => x.action.type !== action.type)