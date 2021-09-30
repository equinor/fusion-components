import { createAsyncAction, ActionType } from 'typesafe-actions';

import { HttpClientRequestFailedError } from '@equinor/fusion';
import { EmbedInfo } from '@equinor/fusion/lib/http/apiClients/models/report';
import { ActionError } from '@equinor/fusion/lib/epic';

export type FetchEmbedInfoAction = ActionType<typeof fetchEmbedInfo>;

export const fetchEmbedInfo = createAsyncAction(
  '@PBI/FETCH_REPORT_EMBED_INFO_REQUEST',
  '@PBI/FETCH_REPORT_EMBED_INFO_SUCCESS',
  '@PBI/FETCH_REPORT_EMBED_INFO_FAILURE',
  '@PBI/FETCH_REPORT_EMBED_INFO_CANCEL'
)<string, EmbedInfo, ActionError<HttpClientRequestFailedError<any>>, string | void>();

export default { fetchEmbedInfo };