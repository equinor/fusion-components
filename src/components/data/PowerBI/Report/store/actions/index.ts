import { ActionType } from 'typesafe-actions';

import { HttpClientRequestFailedError } from '@equinor/fusion';
import { ActionError } from '@equinor/fusion/lib/epic';

import embedInfoActions from './embed-info';
import accessTokenActions from './access';
import contextAccessActions from './context';

export const actions = {
  ...embedInfoActions,
  ...accessTokenActions,
  ...contextAccessActions
};

export type ApiError = ActionError<HttpClientRequestFailedError<any>>;

export type Actions = ActionType<typeof actions>;
